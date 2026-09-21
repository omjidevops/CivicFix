// ============================================================================
// CIVICFIX — DAY 43: LOCATION PICKER COMPONENT (LocationPicker.jsx)
// Technologies: React + Leaflet + OpenStreetMap
//
// Features:
// 1. Interactive Leaflet map container rendered on OSM tiles
// 2. Click anywhere on map to drop or reposition grievance marker
// 3. Optional "Use My Location" via HTML5 Geolocation API (graceful fallback)
// 4. Live visual readout of Latitude & Longitude
// 5. Clean teardown on unmount to prevent React 18 double-mount memory leaks
// ============================================================================

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// SVG map pin icon (Retina-sharp, zero external asset 404 risk, matches CivicFix brand teal)
const civicPinIcon = L.divIcon({
  className: 'civic-map-marker-pin',
  html: `
    <div style="position: relative; width: 34px; height: 42px; transform: translate(-50%, -100%);">
      <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 0C7.61 0 0 7.61 0 17C0 27.5 17 42 17 42C17 42 34 27.5 34 17C34 7.61 26.39 0 17 0Z" fill="#0f766e" stroke="#ffffff" stroke-width="2"/>
        <circle cx="17" cy="17" r="6" fill="#ffffff"/>
      </svg>
    </div>
  `,
  iconSize: [34, 42],
  iconAnchor: [17, 42],
  popupAnchor: [0, -42]
});

function LocationPicker({ latitude, longitude, onLocationSelect }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const [geoLoading, setGeoLoading] = useState(false);
  const [geoStatus, setGeoStatus] = useState(null);

  // Default coordinate center (Bengaluru municipal center: 12.9716° N, 77.5946° E)
  const defaultCenter = [12.9716, 77.5946];
  const defaultZoom = 13;

  // Helper: place or update the marker on the map
  const updateMarker = (lat, lng, panTo = false) => {
    if (!mapInstanceRef.current) return;

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      const marker = L.marker([lat, lng], {
        icon: civicPinIcon,
        draggable: true
      }).addTo(mapInstanceRef.current);

      // Allow dragging the marker directly
      marker.on('dragend', (event) => {
        const position = event.target.getLatLng();
        const rLat = parseFloat(position.lat.toFixed(6));
        const rLng = parseFloat(position.lng.toFixed(6));
        onLocationSelect({ latitude: rLat, longitude: rLng });
      });

      markerRef.current = marker;
    }

    markerRef.current.bindPopup(
      `<strong>Grievance Location</strong><br/>Lat: ${lat}<br/>Lng: ${lng}`
    ).openPopup();

    if (panTo) {
      mapInstanceRef.current.setView([lat, lng], 15, { animate: true });
    }
  };

  // Helper: remove marker and clear coordinates
  const handleClearLocation = () => {
    if (markerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
      markerRef.current = null;
    }
    setGeoStatus(null);
    onLocationSelect({ latitude: null, longitude: null });
  };

  // Initialize Leaflet Map on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Avoid double-initialization in React 18 StrictMode
    if (mapInstanceRef.current) return;

    const initialPos = (latitude && longitude)
      ? [parseFloat(latitude), parseFloat(longitude)]
      : defaultCenter;

    const map = L.map(mapContainerRef.current, {
      center: initialPos,
      zoom: (latitude && longitude) ? 15 : defaultZoom,
      scrollWheelZoom: true
    });

    // Add free OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Click on map to drop or move marker
    map.on('click', (e) => {
      const clickedLat = parseFloat(e.latlng.lat.toFixed(6));
      const clickedLng = parseFloat(e.latlng.lng.toFixed(6));
      setGeoStatus(null);
      updateMarker(clickedLat, clickedLng, false);
      onLocationSelect({ latitude: clickedLat, longitude: clickedLng });
    });

    mapInstanceRef.current = map;

    // If initial coordinates exist, place marker
    if (latitude && longitude) {
      updateMarker(parseFloat(latitude), parseFloat(longitude), true);
    }

    // Leaflet needs an invalidateSize() after initial render to avoid grey tile gaps
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Sync external prop changes into the map marker
  useEffect(() => {
    if (latitude && longitude && mapInstanceRef.current) {
      updateMarker(parseFloat(latitude), parseFloat(longitude), false);
    }
  }, [latitude, longitude]);

  // Handle "Use My Location" via HTML5 Geolocation API
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus({
        type: 'error',
        message: 'Geolocation is not supported by your browser. Please click directly on the map to pin location.'
      });
      return;
    }

    setGeoLoading(true);
    setGeoStatus(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = parseFloat(position.coords.latitude.toFixed(6));
        const userLng = parseFloat(position.coords.longitude.toFixed(6));

        setGeoLoading(false);
        setGeoStatus({
          type: 'success',
          message: 'Location detected successfully from browser GPS!'
        });

        updateMarker(userLat, userLng, true);
        onLocationSelect({ latitude: userLat, longitude: userLng });
      },
      (error) => {
        setGeoLoading(false);
        let errorMsg = 'Could not retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission was denied. You can still pinpoint the issue by clicking anywhere on the map.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Location information is unavailable. Please click on the map manually.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Location request timed out. Please click on the map manually.';
        }

        setGeoStatus({
          type: 'warning',
          message: errorMsg
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const hasCoordinates = latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined;

  return (
    <div className="location-picker-wrapper">
      {/* Map Action Toolbar */}
      <div className="map-toolbar">
        <div className="map-toolbar-info">
          <span className="map-toolbar-title">📍 Interactive Issue Location Map</span>
          <span className="map-toolbar-hint">Click anywhere on the map or drag the pin to set the exact civic spot</span>
        </div>

        <div className="map-toolbar-actions">
          <button
            type="button"
            className="btn-my-location"
            onClick={handleUseMyLocation}
            disabled={geoLoading}
            title="Detect current device coordinates"
          >
            {geoLoading ? "🛰️ Detecting..." : "🎯 Use My Location"}
          </button>

          {hasCoordinates && (
            <button
              type="button"
              className="btn-clear-pin"
              onClick={handleClearLocation}
              title="Remove pinned location"
            >
              ✕ Clear Pin
            </button>
          )}
        </div>
      </div>

      {/* Geolocation feedback banner if triggered */}
      {geoStatus && (
        <div className={`map-geo-alert ${geoStatus.type}`}>
          {geoStatus.type === 'success' ? '✓ ' : 'ℹ️ '}
          {geoStatus.message}
        </div>
      )}

      {/* Real Interactive Leaflet Container */}
      <div
        ref={mapContainerRef}
        className="leaflet-map-box"
        style={{
          width: '100%',
          height: '320px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          zIndex: 1
        }}
      />

      {/* Coordinate Readout Bar */}
      <div className="map-coordinates-bar">
        {hasCoordinates ? (
          <div className="coords-display active">
            <span className="coords-tag">Pinned Coordinates:</span>
            <span className="coord-pill">
              <strong>Lat:</strong> {latitude}°
            </span>
            <span className="coord-pill">
              <strong>Lng:</strong> {longitude}°
            </span>
            <span className="coords-status">✓ Geotag Attached</span>
          </div>
        ) : (
          <div className="coords-display inactive">
            <span className="coords-placeholder">
              ⚪ No pin placed yet. Click on the map to geotag your report (or use the button above).
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationPicker;

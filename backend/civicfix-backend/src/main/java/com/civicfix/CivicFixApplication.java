package com.civicfix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ============================================================================
 * CIVICFIX — DAY 30: SPRING BOOT APPLICATION ENTRY POINT
 * Package: com.civicfix
 * Class: CivicFixApplication
 *
 * Annotations:
 * @SpringBootApplication -> Meta-annotation combining:
 *   1. @Configuration: Tags the class as a source of bean definitions.
 *   2. @EnableAutoConfiguration: Tells Spring Boot to start adding beans based
 *      on classpath settings (e.g., auto-configuring embedded Tomcat server).
 *   3. @ComponentScan: Automatically scans and discovers components,
 *      controllers, and services in package 'com.civicfix' and sub-packages.
 * ============================================================================
 */
@SpringBootApplication
public class CivicFixApplication {

    public static void main(String[] args) {
        // Launches the Spring context, initializes beans, and starts embedded Tomcat on port 8080
        SpringApplication.run(CivicFixApplication.class, args);
    }
}

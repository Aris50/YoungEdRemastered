package com.youngedremastered.youngedremastered;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.metrics.web.tomcat.TomcatMetricsAutoConfiguration; // Add this import
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication(exclude = {
		SystemMetricsAutoConfiguration.class,
		TomcatMetricsAutoConfiguration.class 
})
@EnableCaching
public class YoungedremasteredApplication {
	public static void main(String[] args) {
		SpringApplication.run(YoungedremasteredApplication.class, args);
	}

}
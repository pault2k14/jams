package com.pbt.jams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Original architecture example
// https://developer.okta.com/blog/2022/06/17/simple-crud-react-and-spring-boot#add-authentication-with-okta
// View frontend with http://localhost:8080
// Run both frontend and backend ./mvnw spring-boot:run -Pprod
// Run just backend  ./mvnw spring-boot:run
// Run just frontend npm start
@SpringBootApplication
public class JamsApplication {

	public static void main(String[] args) {
		SpringApplication.run(JamsApplication.class, args);
	}

}

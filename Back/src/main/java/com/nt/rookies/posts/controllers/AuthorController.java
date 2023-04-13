package com.nt.rookies.posts.controllers;

import java.util.List;
import java.util.Objects;

import com.nt.rookies.posts.dtos.Author;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nt.rookies.posts.services.AuthorService;

@RestController
@RequestMapping("authors")
@CrossOrigin(origins = "*")
public class AuthorController {
	private AuthorService service;
	public AuthorController(AuthorService service) {
		this.service = Objects.requireNonNull(service);
	}
	
	@GetMapping
	public ResponseEntity<List<Author>> getAll() {
		return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
	}
	
	@GetMapping("/username/{username}")
	public ResponseEntity<Author> getByUsername(@PathVariable String username) {
		return new ResponseEntity<>(service.getUsername(username), HttpStatus.OK);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<Author> getByEmail(@PathVariable String email) {
		return new ResponseEntity<>(service.getByEmail(email), HttpStatus.OK);
	}
}

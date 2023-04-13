package com.nt.rookies.posts.controllers;

import com.nt.rookies.posts.dtos.Post;
import com.nt.rookies.posts.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("posts")
@CrossOrigin(origins = "*")
public class PostController {
  private PostService service;
  public PostController(PostService service) {
    this.service = Objects.requireNonNull(service);
  }

  @GetMapping
  public ResponseEntity<List<Post>> getAll(@RequestParam(required = false) String title) {
	  try {
		  List<Post> posts = new ArrayList<Post>();
		  if(title==null) {
			  service.getAll().forEach(posts::add);
		  }else {
			  service.searchTitle(title).forEach(posts::add);;
		  }
		  
		  if(posts.isEmpty()) {
			  return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		  }
		  return new ResponseEntity<>(posts, HttpStatus.OK);
	  }catch(Exception ex) {
		  return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

  @GetMapping("/{id}")
  public ResponseEntity<Post> getById(@PathVariable Integer id) {
    return new ResponseEntity<>(service.getId(id), HttpStatus.OK);
  }

//  @PostMapping
//  public ResponseEntity<Post> save(@RequestBody @Valid Post post) {
//    return new ResponseEntity<>(service.save(post), HttpStatus.OK);
//  }
  
  @PostMapping
  public ResponseEntity<Post> createPost(@RequestBody Post post, @RequestParam String username) {
	  return new ResponseEntity<>(service.create(post, username), HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Post> update(@RequestBody Post post, @PathVariable Integer id) {
	  return new ResponseEntity<>(service.update(post, id), HttpStatus.OK);
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable Integer id) {
	  service.delete(id);
	  return new ResponseEntity<>("Post deleted", HttpStatus.OK);
  }
}

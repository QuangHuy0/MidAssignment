package com.nt.rookies.posts.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nt.rookies.posts.dtos.Post;
import com.nt.rookies.posts.entities.AuthorEntity;
import com.nt.rookies.posts.entities.PostEntity;
import com.nt.rookies.posts.exceptions.BadRequestException;
import com.nt.rookies.posts.exceptions.NotFoundException;
import com.nt.rookies.posts.mappers.AuthorMapper;
import com.nt.rookies.posts.mappers.PostMapper;
import com.nt.rookies.posts.repositories.AuthorRepository;
import com.nt.rookies.posts.repositories.PostRepository;

@Service
public class PostService {
  private PostRepository repository;
  private AuthorRepository authorRepository;

  public PostService(PostRepository repository, AuthorRepository authorRepository) {

    this.repository = Objects.requireNonNull(repository);
    this.authorRepository = Objects.requireNonNull(authorRepository);
  }

  public List<Post> getAll() {

    return PostMapper.toDtoList(this.repository.findAll());
  }

  public Post getId(Integer id) {
    return PostMapper.toDto( repository.findById(id).orElseThrow(() -> new NotFoundException("Post Id : " + id + " Not Found")));
  }


  public Post create(Post post, String username) {
    try {
    	AuthorEntity authorEntity = authorRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("User :"+username+"Not Found"));
    	
    	post.setAuthor(AuthorMapper.toDto(authorEntity));
    	post.setCreatedAt(LocalDateTime.now());
    	
      return PostMapper.toDto( repository.save(PostMapper.toEntity(post)));
    } catch (NullPointerException e) {
      throw Objects.nonNull(e.getMessage()) ? new BadRequestException(e.getMessage()) : new BadRequestException(e);
    }
  }
  
  public Post update(Post post, Integer id) {
	  PostEntity postEntity = this.repository.findById(id)
			  .orElseThrow(() -> new NotFoundException("Post: " + id + " Not Found"));
	  postEntity.setTitle(post.getTitle());
	  postEntity.setDescription(post.getDescription());
	  postEntity.setContent(post.getContent());
	  try {
		  return PostMapper.toDto(repository.save(postEntity));
	  }catch(NullPointerException e) {
		  throw Objects.nonNull(e.getMessage())  ? new BadRequestException(e.getMessage()) : new BadRequestException(e);
	  }
  }
  
  public void delete(Integer id) {
	  PostEntity postEntity = this.repository.findById(id)
			  .orElseThrow(() -> new NotFoundException("Post: " + id + " Not Found"));
	  this.repository.delete(postEntity);
  }
  
  
  public List<Post> searchTitle(String title) {
	  return PostMapper.toDtoList( repository.searchTitle(title));
  }

  
}

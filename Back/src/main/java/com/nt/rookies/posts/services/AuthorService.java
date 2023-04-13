package com.nt.rookies.posts.services;

import com.nt.rookies.posts.dtos.Author;
import com.nt.rookies.posts.exceptions.NotFoundException;
import com.nt.rookies.posts.mappers.AuthorMapper;
import com.nt.rookies.posts.repositories.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AuthorService {
    private AuthorRepository repository;

    public AuthorService(AuthorRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    public List<Author> getAll() {
        return AuthorMapper.toDtoList(this.repository.findAll());
    }
    
    public Author getUsername(String username) {
    	return AuthorMapper.toDto( this.repository.findByUsername(username)
    			.orElseThrow(() -> new NotFoundException("Author username: " + username + "Not found")));
    }
    
    public Author getByEmail(String email) {
    	return AuthorMapper.toDto(this.repository.findByEmail(email)
    			.orElseThrow(() -> new NotFoundException("Author email: " + email + "Not found")));
    			
    }


}

package com.nt.rookies.posts.repositories;

import com.nt.rookies.posts.entities.AuthorEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<AuthorEntity, String> {
	@Query("SELECT a FROM AuthorEntity a WHERE username = ?1")
	Optional<AuthorEntity> findByUsername(String username);
	
	@Query("SELECT a FROM AuthorEntity a WHERE email = ?1")
	Optional<AuthorEntity> findByEmail(String email);
	
}

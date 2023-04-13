package com.nt.rookies.posts.repositories;

import com.nt.rookies.posts.entities.PostEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends JpaRepository<PostEntity, Integer> {
	
	@Query("SELECT p FROM PostEntity p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', ?1, '%'))" +
			"OR LOWER(p.description) LIKE LOWER(CONCAT('%', ?1, '%'))")
	
	List<PostEntity> searchTitle(String title);
}

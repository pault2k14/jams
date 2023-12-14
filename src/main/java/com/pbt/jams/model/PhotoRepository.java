package com.pbt.jams.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    Photo findByDescription(String description);
    List<Photo> findAllByUserId(String id);
}

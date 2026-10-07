package com.pavan.smarttaskmanagement.repository;

import com.pavan.smarttaskmanagement.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

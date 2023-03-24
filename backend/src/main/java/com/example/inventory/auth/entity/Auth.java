package com.example.inventory.auth.entity;

import com.example.inventory.common.entity.BaseEntity;
import com.example.inventory.common.enums.JoinType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Auth implements Persistable<String> {

    @Id
    private String id;
    private String password;
    private String name;

    private LocalDate birth;
    private String gender;

    private JoinType type;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @Transient
    private boolean isNew = false;

    @Override
    public String getId() {
        return id;
    }
    @Override
    public boolean isNew() {
        return isNew;
    }



}

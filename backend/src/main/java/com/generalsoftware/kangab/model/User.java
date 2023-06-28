package com.generalsoftware.kangab.model;

import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User extends BaseModel {

    @Serial
    private static final long serialVersionUID = -467324267912994552L;

    @NaturalId(mutable = true)
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @NotNull
    private String password;

    @Column(name = "DISPLAY_NAME")
    private String displayName;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "USING_2FA")
    private boolean using2FA;

    private String secret;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

}

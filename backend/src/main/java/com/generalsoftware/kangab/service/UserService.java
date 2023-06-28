package com.generalsoftware.kangab.service;

import java.util.List;

import com.generalsoftware.kangab.dto.SignUpDto;
import com.generalsoftware.kangab.dto.UserUpdateDto;
import com.generalsoftware.kangab.exception.UserAlreadyExistAuthenticationException;
import com.generalsoftware.kangab.model.User;

public interface UserService {

    User registerNewUser(SignUpDto signUpRequest) throws UserAlreadyExistAuthenticationException;

    List<User> findAllUsers();

    User findUserById(Long id);

    User findUserByEmail(String email);

    User updateUser(UserUpdateDto data);

    void deleteUser(Long id);
}

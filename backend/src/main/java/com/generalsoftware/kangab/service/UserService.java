package com.generalsoftware.kangab.service;

import java.util.List;

import com.generalsoftware.kangab.exception.ResourceAlreadyExistException;
import com.generalsoftware.kangab.model.User;

public interface UserService {

    User registerNewUser(User signUpRequest) throws ResourceAlreadyExistException;

    List<User> findAllUsers();

    User findUserById(Long id);

    User findUserByEmail(String email);

    User updateUser(User data);

    void deleteUser(Long id);
}

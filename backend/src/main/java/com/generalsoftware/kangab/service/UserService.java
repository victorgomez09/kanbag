package com.generalsoftware.kangab.service;

import com.generalsoftware.kangab.dto.SignUpDto;
import com.generalsoftware.kangab.exception.UserAlreadyExistAuthenticationException;
import com.generalsoftware.kangab.model.User;

public interface UserService {
    User findUserByEmail(String email);

    User registerNewUser(SignUpDto signUpRequest) throws UserAlreadyExistAuthenticationException;
}

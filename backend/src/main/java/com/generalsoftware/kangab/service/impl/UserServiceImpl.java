package com.generalsoftware.kangab.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.generalsoftware.kangab.dto.SignUpDto;
import com.generalsoftware.kangab.dto.UserUpdateDto;
import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.exception.UserAlreadyExistAuthenticationException;
import com.generalsoftware.kangab.model.User;
import com.generalsoftware.kangab.repository.UserRepository;
import com.generalsoftware.kangab.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(value = "transactionManager")
    public User registerNewUser(final SignUpDto signUpRequest) throws UserAlreadyExistAuthenticationException {
        if (userRepository.existsByEmailIgnoreCase(signUpRequest.getEmail())) {
            throw new UserAlreadyExistAuthenticationException(
                    "User with email id " + signUpRequest.getEmail() + " already exist");
        }
        User user = buildUser(signUpRequest);
        user = userRepository.save(user);
        userRepository.flush();

        return user;
    }

    private User buildUser(final SignUpDto signUpRequest) {
        User user = new User();
        user.setDisplayName(signUpRequest.getDisplayName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEnabled(true);
        return user;
    }

    @Override
    public List<User> findAllUsers() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllUsers'");
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    @Override
    public User findUserByEmail(final String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }

    @Override
    public User updateUser(UserUpdateDto data) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    public void deleteUser(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }

}

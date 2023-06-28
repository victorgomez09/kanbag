package com.generalsoftware.kangab.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.generalsoftware.kangab.exception.ResourceNotFoundException;
import com.generalsoftware.kangab.exception.ResourceAlreadyExistException;
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
    public User registerNewUser(User user) throws ResourceAlreadyExistException {
        if (userRepository.existsByEmailIgnoreCase(user.getEmail())) {
            throw new ResourceAlreadyExistException("User", "email", user.getEmail());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        userRepository.flush();

        return user;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
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
    public User updateUser(User data) {
        User user = userRepository.findById(data.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", data.getId()));

        return userRepository.save(user.toBuilder().email(data.getEmail()).displayName(data.getDisplayName())
                .password(data.getPassword()).build());
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        userRepository.delete(user);
    }

}

package com.generalsoftware.kangab.service;

import com.generalsoftware.kangab.model.User;

public interface AuthService {

    String signin(User user);

    void signup(User user);

}

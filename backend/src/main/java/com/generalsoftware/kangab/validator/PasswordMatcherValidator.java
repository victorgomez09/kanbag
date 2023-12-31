package com.generalsoftware.kangab.validator;

import com.generalsoftware.kangab.annotation.PasswordMatcher;
import com.generalsoftware.kangab.dto.SignUpDto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatcherValidator implements ConstraintValidator<PasswordMatcher, SignUpDto> {

    @Override
    public boolean isValid(final SignUpDto user, final ConstraintValidatorContext context) {
        return user.getPassword().equals(user.getMatchingPassword());
    }

}

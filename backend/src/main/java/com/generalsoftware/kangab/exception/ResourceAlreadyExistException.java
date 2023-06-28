package com.generalsoftware.kangab.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceAlreadyExistException extends AuthenticationException {

    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public ResourceAlreadyExistException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s with %s : '%s' already exists", resourceName, fieldName, fieldValue));

        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public Object getFieldValue() {
        return fieldValue;
    }

}
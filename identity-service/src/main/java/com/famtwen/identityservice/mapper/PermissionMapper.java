package com.famtwen.identityservice.mapper;

import org.mapstruct.Mapper;

import com.famtwen.identityservice.dto.request.PermissionRequest;
import com.famtwen.identityservice.dto.response.PermissionResponse;
import com.famtwen.identityservice.entity.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}

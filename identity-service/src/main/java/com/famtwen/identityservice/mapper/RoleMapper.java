package com.famtwen.identityservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.famtwen.identityservice.dto.request.RoleRequest;
import com.famtwen.identityservice.dto.response.RoleResponse;
import com.famtwen.identityservice.entity.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}

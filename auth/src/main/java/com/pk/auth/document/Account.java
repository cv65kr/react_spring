package com.pk.auth.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.UUID;

@Document
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class Account implements UserDetails {

    @Id
    private UUID uuid;

    private String username;

    private String password;

    private boolean isEnabled = true;

    @Override
    public List<GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}

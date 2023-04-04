package com.example.inventory.security;

import com.example.inventory.auth.entity.Auth;
import com.example.inventory.auth.repository.AuthRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private AuthRepository repository;

    public UserDetailServiceImpl(AuthRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Auth auth = repository.findById(username).orElseThrow();
        CustomUserDetails detail = new CustomUserDetails(auth.getId(), auth.getName(), auth.getPassword());
        return detail;
    }
}

package com.pk.auth.controller;

import com.pk.auth.dto.AccountDTO;
import com.pk.auth.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping(path = "/sign-up", produces = "application/json")
    public ResponseEntity signUp(@Valid @RequestBody AccountDTO account) {
        return new ResponseEntity(
                accountService.signUp(account) ? HttpStatus.CREATED : HttpStatus.CONFLICT
        );
    }

    @GetMapping("/me")
    public Principal user(Principal user) {
        return user;
    }
}

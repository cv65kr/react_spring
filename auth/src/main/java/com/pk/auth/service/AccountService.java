package com.pk.auth.service;

import com.pk.auth.document.Account;
import com.pk.auth.dto.AccountDTO;

import java.util.Optional;
import java.util.UUID;

public interface AccountService {

    boolean signUp(AccountDTO account);

    Optional<Account> findAccount(UUID uuid);

    Optional<Account> findAccountByUsername(String username);
}

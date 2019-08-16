package com.pk.auth.service;

import com.pk.auth.document.Account;
import com.pk.auth.dto.AccountDTO;
import com.pk.auth.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public boolean signUp(AccountDTO account) {

        if (findAccountByUsername(account.getEmail()).isPresent()) {
            log.info("Username {} exists", account.getEmail());
            return false;
        }

        Account model = Account
                .builder()
                .uuid(UUID.randomUUID())
                .username(account.getEmail())
                .password(new BCryptPasswordEncoder().encode(account.getPassword()))
                .isEnabled(true)
                .build();

        accountRepository.save(model);

        return true;
    }

    public Optional<Account> findAccount(UUID uuid) {
        return accountRepository.findById(uuid);
    }

    public Optional<Account> findAccountByUsername(String username) {
        return accountRepository.findAccountByUsername(username);
    }

}

package com.example.backend.controller;

import com.example.backend.service.CacheService;
import com.example.backend.service.CacheService.CachedDbCountResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cache")
public class CacheController {

    private final CacheService cacheService;

    public CacheController(CacheService cacheService) {
        this.cacheService = cacheService;
    }

    @GetMapping("/db-count")
    public CachedDbCountResponse getCachedDbCount() {
        return cacheService.getCachedDbCount();
    }

    @DeleteMapping("/db-count")
    public String deleteDbCountCache() {
        cacheService.evictDbCountCache();
        return "dbCount cache deleted";
    }
}

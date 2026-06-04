package com.example.wmspart1.repository;

import com.example.wmspart1.domain.FieldDefinition;
import com.example.wmspart1.domain.RuleDefinition;
import com.example.wmspart1.domain.ScreenDefinition;
import com.example.wmspart1.domain.StatusDefinition;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AnalysisRepository {

    private final JdbcTemplate jdbcTemplate;

    public AnalysisRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ScreenDefinition> findAllScreens() {
        String sql = """
                SELECT id, screen_id, screen_name, user_type, url, main_feature,
                       controller_name, service_name, repository_name, table_name
                FROM screen_definitions
                ORDER BY id
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new ScreenDefinition(
                rs.getLong("id"),
                rs.getString("screen_id"),
                rs.getString("screen_name"),
                rs.getString("user_type"),
                rs.getString("url"),
                rs.getString("main_feature"),
                rs.getString("controller_name"),
                rs.getString("service_name"),
                rs.getString("repository_name"),
                rs.getString("table_name")
        ));
    }

    public List<FieldDefinition> findAllFields() {
        String sql = """
                SELECT id, screen_id, field_type, field_name, field_label,
                       data_type, required, validation_rule, target_object
                FROM field_definitions
                ORDER BY screen_id, id
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new FieldDefinition(
                rs.getLong("id"),
                rs.getString("screen_id"),
                rs.getString("field_type"),
                rs.getString("field_name"),
                rs.getString("field_label"),
                rs.getString("data_type"),
                rs.getBoolean("required"),
                rs.getString("validation_rule"),
                rs.getString("target_object")
        ));
    }

    public List<StatusDefinition> findAllStatuses() {
        String sql = """
                SELECT id, business_area, status_code, status_label, description
                FROM status_definitions
                ORDER BY business_area, id
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new StatusDefinition(
                rs.getLong("id"),
                rs.getString("business_area"),
                rs.getString("status_code"),
                rs.getString("status_label"),
                rs.getString("description")
        ));
    }

    public List<RuleDefinition> findAllRules() {
        String sql = """
                SELECT id, business_area, rule_name, rule_description, service_target
                FROM rule_definitions
                ORDER BY business_area, id
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new RuleDefinition(
                rs.getLong("id"),
                rs.getString("business_area"),
                rs.getString("rule_name"),
                rs.getString("rule_description"),
                rs.getString("service_target")
        ));
    }
}
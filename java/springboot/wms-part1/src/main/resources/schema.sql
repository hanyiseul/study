DROP TABLE IF EXISTS rule_definitions;
DROP TABLE IF EXISTS field_definitions;
DROP TABLE IF EXISTS status_definitions;
DROP TABLE IF EXISTS screen_definitions;

CREATE TABLE screen_definitions (
                                    id BIGINT NOT NULL AUTO_INCREMENT,
                                    screen_id VARCHAR(30) NOT NULL,
                                    screen_name VARCHAR(100) NOT NULL,
                                    user_type VARCHAR(30) NOT NULL,
                                    url VARCHAR(200) NOT NULL,
                                    main_feature VARCHAR(300) NOT NULL,
                                    controller_name VARCHAR(100) NOT NULL,
                                    service_name VARCHAR(100) NOT NULL,
                                    repository_name VARCHAR(100) NOT NULL,
                                    table_name VARCHAR(100) NOT NULL,
                                    PRIMARY KEY (id)
);

CREATE TABLE field_definitions (
                                   id BIGINT NOT NULL AUTO_INCREMENT,
                                   screen_id VARCHAR(30) NOT NULL,
                                   field_type VARCHAR(30) NOT NULL,
                                   field_name VARCHAR(100) NOT NULL,
                                   field_label VARCHAR(100) NOT NULL,
                                   data_type VARCHAR(50) NOT NULL,
                                   required BOOLEAN NOT NULL,
                                   validation_rule VARCHAR(300) NULL,
                                   target_object VARCHAR(100) NOT NULL,
                                   PRIMARY KEY (id)
);

CREATE TABLE status_definitions (
                                    id BIGINT NOT NULL AUTO_INCREMENT,
                                    business_area VARCHAR(50) NOT NULL,
                                    status_code VARCHAR(50) NOT NULL,
                                    status_label VARCHAR(50) NOT NULL,
                                    description VARCHAR(300) NOT NULL,
                                    PRIMARY KEY (id)
);

CREATE TABLE rule_definitions (
                                  id BIGINT NOT NULL AUTO_INCREMENT,
                                  business_area VARCHAR(50) NOT NULL,
                                  rule_name VARCHAR(100) NOT NULL,
                                  rule_description VARCHAR(500) NOT NULL,
                                  service_target VARCHAR(100) NOT NULL,
                                  PRIMARY KEY (id)
);
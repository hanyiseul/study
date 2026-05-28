// DTO : 계층 간 데이터를 가볍고 안전하게 주고받기 위해 사용하는 객체
package com.example.crud.dto;

public class MemberForm {

    private String name;
    private String email;

    public MemberForm() {
    }

    public MemberForm(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
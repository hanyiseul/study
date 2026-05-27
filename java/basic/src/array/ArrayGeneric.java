package array;
import java.util.ArrayList; // 자바 내장 ArrayList 사용

public class ArrayGeneric {
    public static void main(String[] args) {
        // 제네릭 : 어떤 타입을 사용할지 미리 지정하는 문법
        // 이 리스트에는 Member만 저장 가능
        ArrayList<Member> members = new ArrayList<>(); // ArrayList 생성 (Member 타입만 저장 가능)

        // 리스트에 데이터 추가
        members.add(new Member("홍길동", 30));
        members.add(new Member("김영희", 25));
        members.add(new Member("이철수", 28));

        // for-each 문 (for(자료형 변수명 : 리스트))
        for (Member member : members) {
            member.printInfo();
        }
    }
}

class Member {
    private String name;
    private int age;

    public Member(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void printInfo() {
        System.out.println(name + " / " + age);
    }
}
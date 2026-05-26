package controlLoop;

public class controlLoop {
    public static void main(String[] args) {
        String studentName = "김자바";
        int score = 87;
        String grade;

        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else {
            grade = "D";
        }

        System.out.println("학생명: " + studentName);
        System.out.println("점수: " + score);
        System.out.println("등급: " + grade);

        if (score >= 70) {
            System.out.println("결과: 합격");
        } else {
            System.out.println("결과: 불합격");
        }
    }
}

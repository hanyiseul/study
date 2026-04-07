/**
 * 15.1 기본 구조 설명
 */

// Welcome이라는 이름의 함수형 컴포넌트를 정의합니다.
// React 컴포넌트 이름은 반드시 대문자로 시작해야 합니다.
function Welcome() {
  // return 키워드 뒤에 화면에 그려질 UI(JSX)를 작성합니다.
  return (
    // HTML처럼 보이지만 JavaScript의 확장 문법인 JSX입니다.
    <h1>안녕하세요</h1>
  );
}

// 이 파일을 다른 파일(예: App.js)에서 불러와서 사용할 수 있도록 내보냅니다.
export default Welcome;
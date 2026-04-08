import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

/**
 * 코드 실행 순서
 * 
 * 01. App 함수 실행
 * 02. text = ""
 * 03. todos = []
 * 04. 첫 화면 렌더링
 * 05. 첫번째 useEffect 실행
 * 06. localStorage 에서 todo_data 읽기
 * 07. 저장값이 있으면 복원, 없으면 기본 데이터 setTodos
 * 08. 상태 변경
 * 09. App 함수 다시 실행
 * 10. todos를 기준으로 TodoList 출력
 * 11. 두번째 useEffect 실행
 * 12. 현재 todos를 localStorage에 저장
 * 
 */

function App() { // 화면을 구성하는 함수
  const [text, setText] = useState(''); // 입력값을 담을 변수
  const [todos, setTodos] = useState([]); // todo를 저장할 변수

  useEffect(function () {
    const savedTodos = localStorage.getItem('todo_data'); // 참조 변수 - 로컬스토리지에서 데이터 가져오기

    if (savedTodos) { //만약 로컬스토리지에 저장된 데이터가 있다면
      setTodos(JSON.parse(savedTodos)); // 저장된 데이터를 setTodos에 저장
    } else { // 없다면 아래 기본 셋팅값 저장
      setTodos([
        { id: 1, title: 'React 복습하기', done: false },
        { id: 2, title: '컴포넌트 연습하기', done: true }
      ]);
    }
  }, []); // cleanup: 컴포넌트 생성시 한번만 실행

  useEffect(function () { // todo가 입력될때마다 로컬스토리지에 저장
    localStorage.setItem('todo_data', JSON.stringify(todos));
  }, [todos]); // todo가 바뀔때마다 실행

  function addTodo() { // todo 추가 함수
    if (text.trim() === '') { // 입력값 여부 체크
      return; // 입력값이 없다면 함수 중단
    }

    const newTodo = { // 새로운 todo를 저장할 변수
      id: Date.now(),
      title: text,
      done: false
    };

    setTodos([...todos, newTodo]); // 기존 todo배열 뒤에 새 todo 저장
    setText(''); // input value값 초기화
  }

  function toggleTodo(id) { // todo 완료 여부 체크 함수
    const newTodos = todos.map(function (todo) { // todos를 map으로 배열 순회하여
      if (todo.id === id) { // todo.id와 id값이 일치하는지 확인하고
        return { ...todo, done: !todo.done }; // done 반대 상태로 배열 복사하여 반환 (토글)
      }
      return todo; // todo.id와 id값 불일치시 그대로 반환
    });

    setTodos(newTodos);
  }

  function removeTodo(id) { // 선택한 todo 삭제 함수
    const newTodos = todos.filter(function (todo) {
      return todo.id !== id; // 선택한 todo.id와 순회하는 id값이 일치하지 않는 경우만 반환
    });

    setTodos(newTodos);
  }

  const remainCount = todos.filter(function (todo) {
    return todo.done === false; // done 상태가 false인 것만 골라서 새 배열로 반환해
  }).length; // 반환한 배열의 개수를 변수에 담음

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>Todo List</h1>
      <p style={styles.desc}>남은 할 일: {remainCount}개</p>

      <TodoForm
        text={text} // TodoForm에 text 변수 전달
        setText={setText} // TodoForm에 setText(상태변경값) 변수 전달
        addTodo={addTodo} // TodoForm에 addTodo(상태변경값) 변수 전달
      />

      <TodoList
        todos={todos} // TodoList에 todos 변수 전달
        toggleTodo={toggleTodo} // TodoList에 toggleTodo 함수 전달
        removeTodo={removeTodo} // TodoList에 removeTodo 함수 전달
      />
    </div>
  );
}

const styles = {
  wrap: {
    width: '500px',
    margin: '40px auto',
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#fafafa'
  },
  title: {
    marginBottom: '10px'
  },
  desc: {
    marginBottom: '20px',
    color: '#555'
  }
};

export default App;
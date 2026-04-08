function TodoList(props) { // Todo list를 구성하는 함수
  return (
    <div>
      {props.todos.map(function (todo) { // 부모에서 전달받은 todos 배열 순회
        return (
          // map으로 순회하면 key값 넣어주기 필수
          // key: 항목마다 구분해주기 위한 값
          <div key={todo.id} style={styles.item}> 
            <div style={styles.leftBox}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={function () {
                  // check 여부는 todo.done으로 하고,
                  // input 상태 변경은 부모에서 전달받은 toggleTodo 함수로 함
                  props.toggleTodo(todo.id);
                }}
              />

              <span
                style={{
                  ...styles.text,
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? '#999' : '#222'
                }}
              >
                {todo.title}
              </span>
            </div>

            <button
              onClick={function () {
                // 삭제 버튼 클릭시 부모에서 전달받은 removeTodo 함수로 삭제
                props.removeTodo(todo.id);
              }}
              style={styles.deleteButton}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #eee'
  },
  leftBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  text: {
    fontSize: '16px'
  },
  deleteButton: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#d93025',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default TodoList;
function TodoForm(props) { // todo 입력을 구성하는 함수
  return (
    <div style={styles.formBox}>
      <input
        type="text"
        value={props.text} // 부모에서 props로 text요소를 전달받음
        onChange={function (e) { // 이벤트 발생할 경우 
          props.setText(e.target.value); // 부모에서 props로 e.target.value 값으로 변견된 setText 값 전달 받음
        }}
        placeholder="할 일을 입력하세요"
        style={styles.input}
      />
      <button onClick={props.addTodo} style={styles.button}>
        추가
      </button>
    </div>
  );
}

const styles = {
  formBox: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  button: {
    padding: '10px 14px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#222',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default TodoForm;
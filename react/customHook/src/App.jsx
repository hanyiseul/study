import { useState } from 'react';

// useToggle 예제
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue(prev => !prev);
  }

  return [value, toggle];
}

// useInput 예제
function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  return [value, onChange, setValue];
}

function App() {
  const [isOpen, toggle] = useToggle(false);
  const [name, onChangeName] = useInput('');

  return (
    <>
      <div>
        <button onClick={toggle}>토글</button>
        {isOpen && <p>내용 표시</p>}
      </div>
      <div>
        <input value={name} onChange={onChangeName} />
        <p>{name}</p>
      </div>
    </>
  );
}

export default App;
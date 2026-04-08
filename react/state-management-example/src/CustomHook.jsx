import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue(prev => !prev);
  }

  return [value, toggle];
}

function CustomHook() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>토글</button>
      {isOpen && <p>내용 표시</p>}
    </div>
  );
}

export default CustomHook;
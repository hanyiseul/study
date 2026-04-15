import { useState } from 'react';

function UserForm({ onAdd, isPending }) {
  const [name, setName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onAdd(trimmedName);
    setName('');
  }

  return (
    <form onSubmit={handleSubmit} className="form-row">
      <input
        className="input-box"
        type="text"
        value={name}
        onChange={function (e) {
          setName(e.target.value);
        }}
        placeholder="추가할 사용자 이름 입력"
      />
      <button type="submit" className="action-button" disabled={isPending}>
        사용자 추가
      </button>
    </form>
  );
}

export default UserForm;
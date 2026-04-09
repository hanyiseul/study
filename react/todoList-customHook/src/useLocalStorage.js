import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState([]);

  useEffect(function () {
    const saved = localStorage.getItem(key);

    if (saved) {
      setValue(JSON.parse(saved));
    } else {
      setValue(initialValue);
    }
  }, []);

  useEffect(function () {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
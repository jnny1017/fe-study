import { useState } from 'react';
import Button from './components/Button';

export default function TodoForm({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='todo'>
        <input
          type='text'
          id='todo'
          value={value}
          placeholder='할 일을 입력해주세요'
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </label>
      <Button type='submit' text='추가' />
    </form>
  );
}

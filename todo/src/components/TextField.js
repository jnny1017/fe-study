import { useState } from 'react';

export default function TextField({ id, placeholder = '' }) {
  const [value, setValue] = useState('');

  return (
    <label htmlFor={id}>
      <input
        type='text'
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </label>
  );
}

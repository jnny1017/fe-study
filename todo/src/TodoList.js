import { useState } from 'react';

import Button from './components/Button';

export default function TodoList({ todos, onEdit, onDelete }) {
  const [newValue, setNewValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleUpdate = (id) => {
    onEdit(id, newValue);
    setSelectedIndex(-1);
  };

  const handleEdit = (id) => {
    setSelectedIndex(id);
    setNewValue('');
  };

  return (
    <ul>
      {todos.map(({ todo, id }) => {
        return (
          <li key={id}>
            {selectedIndex === id ? (
              <>
                <input
                  value={newValue}
                  onChange={(event) => setNewValue(event.target.value)}
                />
                <Button text='확인' onClick={() => handleUpdate(id)} />
              </>
            ) : (
              <>
                {todo}
                <Button text='수정' onClick={() => handleEdit(id)} />
              </>
            )}
            <Button text='삭제' onClick={() => onDelete(id)} />
          </li>
        );
      })}
    </ul>
  );
}

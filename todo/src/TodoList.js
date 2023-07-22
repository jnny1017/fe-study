import Button from './components/Button';
import Checkbox from './components/Checkbox';

export default function TodoList({ todos, onStatus, onDelete }) {
  return (
    <ul>
      {todos.map(({ value }, index) => {
        return (
          <li
            key={index}
            style={
              todos[index].status
                ? { textDecoration: 'line-through' }
                : { textDecoration: 'none' }
            }
          >
            <Checkbox id={`status_${index}`} onChange={() => onStatus(index)}>
              {todos[index].status ? '완료' : ''}
              {value}
              <Button text='삭제' onClick={() => onDelete(index)} />
            </Checkbox>
          </li>
        );
      })}
    </ul>
  );
}

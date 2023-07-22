import Button from './components/Button';
import TextField from './components/TextField';

export default function TodoInput({ value, onChange, onAddTodo }) {
  return (
    <div>
      <TextField
        id='todo'
        value={value}
        placeholder='할 일을 입력해주세요'
        onChange={onChange}
      />
      <Button text='추가' onClick={onAddTodo} />
    </div>
  );
}

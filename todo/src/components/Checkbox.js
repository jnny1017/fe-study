export default function TodoList({ id, children, onChange }) {
  return (
    <label htmlFor={id}>
      <input type='checkbox' id={id} onChange={onChange} />
      {children}
    </label>
  );
}

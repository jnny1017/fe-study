export default function TextField({ id, value, placeholder, onChange }) {
  return (
    <label htmlFor={id}>
      <input
        type='text'
        id={id}
        value={value || ''}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}

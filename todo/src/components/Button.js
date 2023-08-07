export default function Button({ type = 'text', text, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
}

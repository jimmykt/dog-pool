import "./SignUpInput.scss";

export default function SignUpInput({ type, id, placeholder, onChange }) {
  return (
    <div className="SignUpInput">
      <input
        className="SignUpInput__input"
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

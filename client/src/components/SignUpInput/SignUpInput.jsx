import "./SignUpInput.scss";

export default function SignUpInput({ type, id, placeholder }) {
  return (
    <div className="SignUpInput">
      <input
        className="SignUpInput__input"
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

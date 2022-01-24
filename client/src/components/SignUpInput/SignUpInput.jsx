import "./SignUpInput.scss";
/**
 * Returns
 *
 * @param {text} label .
 * @param {text} buttonstyle possible values "secondary" or "delete". Do not include for default (primary);
 * @param {text} id neccessary for name and id attributes.
 * @param {text} value adds a default value for input button.
 * @param {text} placeholder adds placeholder for an input text field.
 * @param {text} className add styles using your component follow BEM.
 * @param {import} icon add icon to the right of the input field. If left empty will not be included in render.
 * @param {function()} onClick adds a function callback to the input onClick
 * @param {function()} onChange adds a function callback to the input onChange
 * @param {boolean} disabled i.e. disabled={selected === "inStock" ? true : false}
 * @param {boolean} isInvalidEntry true if entry is not valid;
 * @returns
 *  */

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

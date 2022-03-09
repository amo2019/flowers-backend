import style from "../../styles/FormInput.module.css";

const FormInput = ({ handleChange, label, ...props }) => (
  <div className={style.groupContainer}>
    <input className={style.formInputContainer} onChange={handleChange} {...props} />
    {label ? (
      <label className={style.formInputLabel}>
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
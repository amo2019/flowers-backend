import style from "../../styles/CustomButton.module.css";

const CustomButton = ({ children, ...props }) => (
  <button className={style.customButton} {...props}>{children}</button>
);

export default CustomButton;
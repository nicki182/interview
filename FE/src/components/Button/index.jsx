import "./style.css";
const Button = ({ children, ...props }) => (
  <button className="button-style" {...props}>
    {children}
  </button>
);
export default Button;

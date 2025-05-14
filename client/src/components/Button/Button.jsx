import React from "react";
import module from "./_button.scss";

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={module.button}>
      {children}
    </button>
  );
};

export default Button;

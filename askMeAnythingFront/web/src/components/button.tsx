import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="bg-orange-400 text-orange-950 px-3 py-1.5 font-medium text-sm gap-1.5 flex items-center rounded-lg hover:bg-orange-500"
    >
      {children}
    </button>
  );
};

export default Button;

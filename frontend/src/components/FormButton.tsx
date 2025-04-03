import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

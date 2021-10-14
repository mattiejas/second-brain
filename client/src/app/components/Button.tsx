import cn from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
  text,
  className,
  ...props
}) => (
  <button className={cn("bg-purple-600 text-white font-bold rounded-lg w-full py-2 hover:bg-purple-800", className)} {...props}>
    {text}
  </button>
);

export default Button;

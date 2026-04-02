import clsx from "clsx";
import Logo from "../assets/icons/Logo";

interface LogoWithTextProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: 20,
  md: 24,
  lg: 32,
};

const LogoWithText = ({ size = "md", className = "" }: LogoWithTextProps) => {
  return (
    <div className={clsx("flex items-center", className)}>
      <Logo size={SIZES[size]} />
      <h1 className="text-xl font-bold text-foreground">Teamflow</h1>
    </div>
  );
};

export default LogoWithText;

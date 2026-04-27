import Logo from "@/shared/assets/icons/Logo";
import { Link } from "react-router";

const Header = () => {
  return (
    <Link
      to={"/"}
      className="w-full flex items-center py-12 px-12 md:px-16 lg:px-20"
    >
      <Logo size={28} />
      <h1 className="font-bold text-foreground">TeamFlow</h1>
    </Link>
  );
};

export default Header;

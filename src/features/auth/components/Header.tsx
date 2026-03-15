import Logo from "../../../assets/icons/Logo";

const Header = () => {
  return (
    <div className="w-full flex items-center py-12 px-12 md:px-16 lg:px-20">
      <Logo size={28} />
      <h1 className="font-bold text-foreground">TeamFlow</h1>
    </div>
  );
};

export default Header;

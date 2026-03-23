import Logo from "@/assets/icons/Logo";

const HeaderWithLogo = ({ description }: { description: string }) => {
  return (
    <>
      <Logo size={60} />
      <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>
      <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
        {description}
      </p>
    </>
  );
};

export default HeaderWithLogo;

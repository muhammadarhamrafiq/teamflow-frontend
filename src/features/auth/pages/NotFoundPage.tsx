import Logo from "@/shared/assets/icons/Logo";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <>
      <Logo size={60} />
      <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>

      <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
        Welcome back to teamflow. To complete you email update process click the
        button below.
        <Link
          className="w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
          to={"/"}
        >
          Go Back To Home
        </Link>
      </p>
    </>
  );
};

export default NotFoundPage;

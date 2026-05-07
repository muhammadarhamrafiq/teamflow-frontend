import { useAuthStore } from "@/app/providers/user";
import Logo from "@/shared/assets/icons/Logo";
import { Link } from "react-router";

const NotFoundPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-full min-h-auto mt-25 flex flex-col items-center justify-center">
      <Logo size={60} />
      <h1 className="text-4xl font-bold text-foreground">Teamflow</h1>

      <p className="w-80 mt-4 text-sm text-center text-secondary-foreground">
        Welcome to teamflow.It looks like the page you are search for does not
        exits
        <Link
          className="flex items-center justify-center text-secondary-foreground border rounded-md border-secondary-foreground w-80 mt-2 h-10 text-md cursor-pointer hover:scale-98 focus:scale-98 focus:bg-primary/80"
          to={user ? "/dashboard" : "/"}
        >
          Go To {user ? "dashboard" : "Home"}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;

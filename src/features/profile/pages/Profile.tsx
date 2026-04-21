import { useAuthStore } from "@/app/providers/user";
import Avatar from "@/shared/components/Avatar";
import {
  Edit03Icon,
  InputTextIcon,
  LogoutIcon,
  MailIcon,
  ResetPasswordIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { logout } from "../utils/apis";

const Profile = () => {
  const { user, logout: authLogout } = useAuthStore.getState();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    authLogout();
    localStorage.removeItem("user");
    toast.success("Logged Out Successfull");
    navigate("/account/login");
  };

  return (
    <div className="w-80 mx-auto mt-10">
      <h3 className="w-full font-extrabold mb-2">Hey {user.name}!</h3>
      <div className="relative">
        <Avatar avatar={user.avatarUrl ?? ""} size="xl" iconVariant="USER" />
        <Link
          to="/profile/update-avatar"
          className="absolute bottom-3 right-22 px-2 py-2 bg-foreground rounded-full text-background"
        >
          <HugeiconsIcon icon={Edit03Icon} />
        </Link>
      </div>
      <ul className="mt-8">
        <li className="border-b border-t">
          <Link
            to="/profile/update-name"
            className="flex py-2 gap-2 cursor-pointer"
          >
            <HugeiconsIcon icon={InputTextIcon} />
            Change Name
          </Link>
        </li>
        <li className="border-b">
          <Link
            to="/profile/update-email"
            className="flex py-2 gap-2 cursor-pointer"
          >
            <HugeiconsIcon icon={MailIcon} />
            Update Email
          </Link>
        </li>
        <li className="border-b">
          <Link
            to="/profile/reset-password"
            className="flex py-2 gap-2 cursor-pointer"
          >
            <HugeiconsIcon icon={ResetPasswordIcon} />
            Reset Password
          </Link>
        </li>
        <li
          className="flex py-2 gap-2 text-destructive border-b cursor-pointer"
          onClick={handleLogout}
        >
          <HugeiconsIcon icon={LogoutIcon} />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Profile;

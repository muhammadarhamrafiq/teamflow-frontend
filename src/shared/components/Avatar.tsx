import { Building, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  avatar: string | null;
  size?: AvatarSize;
  iconVariant: "USER" | "ORG";
}

const Avatar = ({ avatar, iconVariant, size = "md" }: AvatarProps) => {
  return (
    <div
      className={clsx(
        "border rounded-full flex items-center justify-center overflow-hidden shrink-0",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-16 h-16",
        size === "lg" && "w-32 h-32",
        size === "xl" && "w-64 h-64",
      )}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={"loding logo"}
          className="w-full h-full object-cover"
        />
      ) : (
        <HugeiconsIcon
          icon={iconVariant === "ORG" ? Building : User}
          size={
            size === "sm"
              ? "16"
              : size === "md"
                ? "20"
                : size === "lg"
                  ? "24"
                  : "28"
          }
        />
      )}
    </div>
  );
};

export default Avatar;

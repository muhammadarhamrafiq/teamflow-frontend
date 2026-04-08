import { Building, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  avatar: string | null;
  size?: AvatarSize;
  iconVariant: "USER" | "ORG";
  className?: string;
}

const Avatar = ({
  avatar,
  iconVariant,
  size = "md",
  className,
}: AvatarProps) => {
  return (
    <div
      className={clsx(
        "border rounded-full flex items-center justify-center overflow-hidden shrink-0",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-10 h-10",
        size === "lg" && "w-24 h-24",
        size === "xl" && "w-64 h-64",
        className,
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

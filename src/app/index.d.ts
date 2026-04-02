export interface InputFieldProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
}

type USER_ROLE = "MEMBER" | "ADMIN" | "OWNER";

type OrgWithRoleAndDesc = Organization & {
  myRole: USER_ROLE;
  description: string | null;
};

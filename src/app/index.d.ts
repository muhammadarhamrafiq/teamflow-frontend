export interface InputFieldProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
}

type USER_ROLE = "MEMBER" | "ADMIN" | "OWNER";
export type OrgWithRole = Organization & { myRole: USER_ROLE };

export type OrgWithRoleAndDesc = Organization & {
  myRole: USER_ROLE;
  description: string | null;
};

export type OrgWithKPIs = OrgWithRoleAndDesc & {
  projectsSummary: {
    totalProjects: number;
    overDueProjects: number;
    inProgressProjects: number;
    completedProjects: number;
  };
};

export interface Membership {
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: USER_ROLE;
  joinedSince: Date;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

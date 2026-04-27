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
type PROJECT_STATUS =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED";

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

export interface Paginated {
  limit?: number;
  page?: number;
}

export interface PaginatedWithSearch {
  limit?: number;
  search?: string;
  page?: number;
}

export interface Invitation {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  invitedSince: Date;
  role: USER_ROLE;
}

type Candidate = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  invitationStatus: {
    isMember: boolean;
    invited: boolean;
  };
};

interface ProjectInput {
  name: string;
  description: string;
  dueDate?: Date;
}

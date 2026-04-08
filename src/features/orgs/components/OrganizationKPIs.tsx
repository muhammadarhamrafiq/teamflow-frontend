import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface OrganizationKPIsProps {
  kpis: {
    totalProjects: number;
    overDueProjects: number;
    inProgressProjects: number;
    completedProjects: number;
  };
}

type KPIKey = keyof OrganizationKPIsProps["kpis"];

const KPI_CONFIG: Record<KPIKey, { label: string; description: string }> = {
  totalProjects: {
    label: "Total Projects",
    description: "All projects",
  },
  overDueProjects: {
    label: "Overdue",
    description: "Past deadline",
  },
  inProgressProjects: {
    label: "In Progress",
    description: "Currently active",
  },
  completedProjects: {
    label: "Completed",
    description: "Finished tasks",
  },
};

const OrganizationKPIs = ({ kpis }: OrganizationKPIsProps) => {
  const entries = Object.entries(kpis) as [KPIKey, number][];
  return (
    <div className="mx-4 md:mx-8 grid grid-cols-2 gap-2 mt-1 md:gap-4 md:mt-2 lg:grid-cols-4">
      {entries.map(([key, value]) => (
        <Card key={key} className="w-full">
          <CardHeader>
            <CardDescription>{KPI_CONFIG[key].description}</CardDescription>
            <CardTitle>{KPI_CONFIG[key].label}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default OrganizationKPIs;

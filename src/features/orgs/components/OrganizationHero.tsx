import Avatar from "@/shared/components/Avatar";
import InlineEditField from "@/shared/components/InlineEditField";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useOrganizationContext } from "../context/organizationContext";
import { useUpdateOrganization } from "../hooks/useOrganization";
import OrganizationKPIs from "./OrganizationKPIs";

type InputErrors = {
  name?: string;
  description?: string;
};

const OrganizationHero = () => {
  const organization = useOrganizationContext();

  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState<InputErrors>({});
  const navigate = useNavigate();

  const updateMutation = useUpdateOrganization();

  async function handleUpdate({
    name,
    description,
  }: {
    name?: string;
    description?: string;
  }) {
    setLoading(true);
    const errors = validate(name, description);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setInputErrors(errors);
      return;
    }

    setInputErrors({});

    const res = await updateMutation.mutateAsync({
      id: organization.id,
      name,
      description,
    });
    if (!res.success || !res.data) {
      setLoading(false);
      toast.error(res.error || "Something went wrong");
      return;
    }

    setLoading(false);
    navigate(`/orgs/${res.data.organization.slug}`);
  }

  return (
    <>
      <div className="pb-12">
        <Avatar
          className="float-left mr-4"
          avatar={organization.logoUrl}
          size="lg"
          iconVariant="ORG"
        />

        <div className="flex justify-between">
          <div>
            <InlineEditField
              className="text-3xl font-bold leading-tight tracking-tight"
              value={organization.name}
              onSave={(value) => handleUpdate({ name: value })}
              disabled={organization.myRole === "OWNER" ? loading : true}
              error={inputErrors.name}
            />
          </div>
        </div>

        <InlineEditField
          className="max-w-160 text-muted-foreground"
          value={organization.description || "No Description Available"}
          onSave={(value) => handleUpdate({ description: value })}
          variant="TEXTAREA"
          error={inputErrors.description}
        />
      </div>
      <OrganizationKPIs kpis={organization.projectsSummary} />
    </>
  );
};

function validate(name?: string, description?: string) {
  const errors: InputErrors = {};

  if (name && (name.trim().length < 3 || name.trim().length > 50))
    errors.name = "Name should must contain 3 to 50 characters";

  if (
    description &&
    description.length > 0 &&
    (description.length < 10 || description.length > 500)
  )
    errors.description = "description should contain 10 to 500 characters";

  return errors;
}

export default OrganizationHero;

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import StaticPageLayout from "../components/StaticPageLayout";

const sections = [
  {
    title: "Use of Service",
    body: "Teamflow provides collaboration tools for teams to plan, execute, and deliver work. You agree to use the service in a lawful manner and in accordance with these terms.",
  },
  {
    title: "Accounts and Security",
    body: "You are responsible for safeguarding your login credentials and for activities that occur under your account. Notify us if you suspect unauthorized access.",
  },
  {
    title: "Content and Ownership",
    body: "You retain ownership of content you upload. By using Teamflow, you grant us the rights needed to host and display that content within your workspace.",
  },
  {
    title: "Billing and Plans",
    body: "Paid plans are billed in advance and renew automatically unless canceled. You can manage your subscription from your account settings.",
  },
  {
    title: "Termination",
    body: "We may suspend or terminate access if these terms are violated. You may cancel your account at any time.",
  },
  {
    title: "Contact",
    body: "Questions about these terms can be sent to support@teamflow.app. We will respond as soon as possible.",
  },
];

const TermsAndConditionsPage = () => {
  return (
    <StaticPageLayout
      title="Terms and Conditions"
      description="These terms outline how Teamflow is used, what you can expect from us, and what we expect from you."
    >
      <div className="grid gap-6">
        <Card className="bg-card/80">
          <CardHeader>
            <CardTitle>Effective Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              May 9, 2026. We may update these terms periodically, and any
              changes will be posted on this page.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {sections.map((section) => (
            <Card key={section.title} className="bg-card/80">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default TermsAndConditionsPage;

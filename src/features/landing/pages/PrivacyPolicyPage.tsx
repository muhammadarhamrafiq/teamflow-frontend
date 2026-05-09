import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import StaticPageLayout from "../components/StaticPageLayout";

const privacyTopics = [
  {
    title: "Information We Collect",
    body: "We collect account details, workspace preferences, and the content you add to your projects. We also log basic usage data to keep the service reliable.",
  },
  {
    title: "How We Use Data",
    body: "Your data is used to provide the product experience, improve performance, and deliver support. We do not sell your data.",
  },
  {
    title: "Sharing and Disclosure",
    body: "We only share data with trusted service providers who help run Teamflow, or when required by law.",
  },
  {
    title: "Security",
    body: "We use industry-standard safeguards to protect your information and restrict access to authorized personnel only.",
  },
  {
    title: "Retention",
    body: "We keep your information for as long as your account is active or as needed to provide the service.",
  },
  {
    title: "Your Choices",
    body: "You can update account details from your profile and request account deletion by contacting support.",
  },
];

const PrivacyPolicyPage = () => {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      description="We take privacy seriously and build Teamflow to keep your data protected and transparent."
    >
      <div className="grid gap-6">
        <Card className="bg-card/80">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This policy explains what information we collect, how we use it,
              and the choices you have. If you have questions, reach us at
              privacy@teamflow.app.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {privacyTopics.map((topic) => (
            <Card key={topic.title} className="bg-card/80">
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{topic.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default PrivacyPolicyPage;

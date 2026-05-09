import { useState, type FormEvent } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

import StaticPageLayout from "../components/StaticPageLayout";

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const submitContactForm = async (payload: ContactPayload) => {
  void payload;
  // TODO: Connect to Firebase and send payload.
  return Promise.resolve();
};

const ContactUsPage = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload: ContactPayload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    await submitContactForm(payload);
    event.currentTarget.reset();
    setStatus("sent");
  };

  return (
    <StaticPageLayout
      title="Contact Us"
      description="Tell us about your team and we will respond within 1-2 business days."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-card/80">
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label className="text-xs font-medium" htmlFor="name">
                  Full name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jordan Lee"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium" htmlFor="email">
                  Work email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jordan@teamflow.app"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium" htmlFor="company">
                  Company
                </label>
                <Input id="company" name="company" placeholder="Teamflow" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium" htmlFor="message">
                  How can we help?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Share a bit about your goals, timelines, or questions."
                  rows={5}
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send message"}
                </Button>
                {status === "sent" ? (
                  <span className="text-xs text-muted-foreground">
                    Thanks for reaching out. We will be in touch soon.
                  </span>
                ) : null}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle>Contact details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="text-foreground">Email</p>
                <p>hello@teamflow.app</p>
              </div>
              <div>
                <p className="text-foreground">Office hours</p>
                <p>Monday to Friday, 9:00 AM to 5:00 PM</p>
              </div>
              <div>
                <p className="text-foreground">Location</p>
                <p>Remote-first team, global coverage</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle>What happens next</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                <li>We review your message within one business day.</li>
                <li>We match you with a product specialist.</li>
                <li>We follow up with a tailored demo or resources.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default ContactUsPage;

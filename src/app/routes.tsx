import ContactUsPage from "@/features/landing/pages/ContactUsPage";
import PrivacyPolicyPage from "@/features/landing/pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "@/features/landing/pages/TermsAndConditionsPage";
import { OrganizationProvider } from "@/features/orgs/providers/organizationProvider";
import DashboardLayout from "@/shared/components/Layout/DashboardLayout";
import NotFoundPage from "@/shared/components/NotFoundPage";
import { createBrowserRouter } from "react-router";
import {
  Account,
  Dashboard,
  LandingPage,
  Organization,
  Profile,
  Project,
  Tasks,
} from "../features";
import ProtectedRoute from "./providers/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/account",
    element: <Account.Layout />,
    children: [
      { index: true, element: <NotFoundPage /> },
      { path: "register", element: <Account.SignUp /> },
      { path: "login", element: <Account.SignIn /> },
      { path: "reset-password", element: <Account.ForgotPassword /> },
      { path: "verify-email", element: <Account.VerifyEmail /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard.DashboardPage /> },
      {
        path: "orgs",
        element: <OrganizationProvider />,
        children: [
          { path: "add", element: <Organization.AddOrganization /> },
          {
            path: ":orgSlug",
            element: <Organization.OrganizationPage />,
          },
          {
            path: ":orgSlug/projects/:projSlug",
            element: <Project.ProjectPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
      { path: "/tasks/:taskId", element: <Tasks.TaskPage /> },
      {
        path: "profile",
        children: [
          { index: true, element: <Profile.Profile /> },
          { path: "update-avatar", element: <Profile.UpdateAvatar /> },
          { path: "update-name", element: <Profile.UpdateName /> },
          { path: "update-email", element: <Profile.UpdateEmail /> },
          { path: "reset-password", element: <Profile.ResetPassword /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
  { path: "/term-and-conditions", element: <TermsAndConditionsPage /> },
  { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { path: "/contact-us", element: <ContactUsPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;

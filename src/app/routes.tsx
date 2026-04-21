import DashboardLayout from "@/shared/components/Layout/DashboardLayout";
import { createBrowserRouter } from "react-router";
import { Account, LandingPage, Organization, Profile } from "../features";
import ProtectedRoute from "./providers/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/account",
    element: <Account.Layout />,
    children: [
      { path: "register", element: <Account.SignUp /> },
      { path: "login", element: <Account.SignIn /> },
      { path: "reset-password", element: <Account.ForgotPassword /> },
      { path: "verify-email", element: "Verify Email Page" },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <span>This is Dashboard</span> },
      {
        path: "orgs",
        children: [
          { path: "add", element: <Organization.AddOrganization /> },
          {
            path: ":organizationSlug",
            element: <Organization.OrganizationPage />,
          },
        ],
      },
      { path: "project", element: <span>Project Page</span> },
      { path: "task", element: <span>Task Page</span> },
      {
        path: "profile",
        children: [
          { index: true, element: <Profile.Profile /> },
          { path: "update-avatar", element: <Profile.UpdateAvatar /> },
          { path: "update-name", element: <Profile.UpdateName /> },
          { path: "update-email", element: <Profile.UpdateEmail /> },
          { path: "reset-password", element: <Profile.ResetPassword /> },
        ],
      },
    ],
  },
  { path: "/term-and-conditions", element: "Terms And Condition Page" },
  { path: "/privacy-policy", element: "Privacy Policy Page" },
  { path: "/contact-us", element: "Contact Us Page" },
]);

export default router;

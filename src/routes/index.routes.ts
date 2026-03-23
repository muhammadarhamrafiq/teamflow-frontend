import { createBrowserRouter } from "react-router";
import { Account } from "../features";

const router = createBrowserRouter([
  {
    path: "/",
    element: "Landing Page Not Developed",
  },
  {
    path: "/account",
    Component: Account.Layout,
    children: [
      {
        path: "register",
        Component: Account.SignUp,
      },
      {
        path: "login",
        Component: Account.SignIn,
      },
      {
        path: "forgot-password",
        Component: Account.ForgotPassword,
      },
      {
        path: "verify-email",
        element: "Verify Email Page",
      },
    ],
  },
  {
    path: "/dashboard",
    element: "Dashboard Page",
  },
  {
    path: "/term-and-conditions",
    element: "Terms And Condition Page",
  },
  {
    path: "/privacy-policy",
    element: "Privacy Policy Page",
  },
  {
    path: "/contact-us",
    element: "Contact Us Page",
  },
]);

export default router;

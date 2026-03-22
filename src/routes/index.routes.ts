import { createBrowserRouter } from "react-router";
import { SignIn, SignUp } from "../features";

const router = createBrowserRouter([
  {
    path: "/",
    element: "Landing Page Not Developed",
  },
  {
    path: "/sign-up",
    Component: SignUp,
  },
  {
    path: "/sign-in",
    Component: SignIn,
  },
  {
    path: "/forgot-password",
    element: "ForgotPassword Page",
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

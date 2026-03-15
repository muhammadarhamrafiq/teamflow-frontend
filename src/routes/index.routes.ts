import { createBrowserRouter } from "react-router";
import { SignUp } from "../features";

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
    element: "Sign In Page",
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

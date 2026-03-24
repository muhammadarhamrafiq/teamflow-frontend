import { createBrowserRouter } from "react-router";
import { Account } from "../features";

const router = createBrowserRouter([
  { path: "/", element: "Landing Page Not Developed" },
  {
    path: "/account",
    element: <Account.Layout />,
    children: [
      { path: "register", element: <Account.SignUp /> },
      { path: "login", element: <Account.SignIn /> },
      { path: "forgot-password", element: <Account.ForgotPassword /> },
      { path: "verify-email", element: "Verify Email Page" },
    ],
  },
  { path: "/dashboard", element: "Dashboard Page" },
  { path: "/term-and-conditions", element: "Terms And Condition Page" },
  { path: "/privacy-policy", element: "Privacy Policy Page" },
  { path: "/contact-us", element: "Contact Us Page" },
]);

export default router;

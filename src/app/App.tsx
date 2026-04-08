import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { useThemeStore } from "./providers/themeProvider";
import router from "./routes";

const App = () => {
  const queryClient = new QueryClient();
  const { setTheme } = useThemeStore();

  useEffect(() => {
    setTheme("system");
  }, [setTheme]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default App;

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;

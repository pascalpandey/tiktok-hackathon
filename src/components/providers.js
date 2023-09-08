"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Next13ProgressBar } from "next13-progressbar";
import { StateProvider, useStateValue } from "./disableProgressBarContext";
import { useState } from "react";
import { Context } from "./disableProgressBarContext";

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  const [hideBar, setHideBar] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={[hideBar, setHideBar]}>
        {!hideBar && (
          <Next13ProgressBar color="#FE2C55" options={{ showSpinner: false }} />
        )}
        {children}
      </Context.Provider>
    </QueryClientProvider>
  );
};

export default Providers;

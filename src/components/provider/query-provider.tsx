"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 100
      }
    }
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient
  }
}

export const QueryProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  );
}
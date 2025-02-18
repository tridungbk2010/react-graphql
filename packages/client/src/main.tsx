// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HolidayOffers from "./HolidayOffers.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <ApolloProvider client={client}>
    <HolidayOffers />
  </ApolloProvider>
);

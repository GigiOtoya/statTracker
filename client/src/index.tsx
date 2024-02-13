import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import { SquadBuilder } from "./components/SquadBuilder";
import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";

// const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable key");
// }

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/SignIn", element: <SignInPage /> },
      { path: "/SignUp", element: <SignUpPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

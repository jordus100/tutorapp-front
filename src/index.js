import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Register from "./forms/Register";
import Login from "./forms/Login";
import GlobalStateProvider from "./services/GlobalStateProvider";
import AddTutoringOffer from "./forms/AddTutoringOffer";
import OffersList from "./lists/OffersList";
import TutoringSignUp from "./forms/TutoringSignUp";
import StudentLessons from "./lists/StudentLessons";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/offers/post",
        element: <AddTutoringOffer />
    },
    {
        path: "/offers",
        element: <OffersList />
    },
    {
        path: "/offers/signup",
        element: <TutoringSignUp />
    },
    {
        path: "/lessons/student",
        element: <StudentLessons />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <GlobalStateProvider>
      <RouterProvider router={router} />
      </GlobalStateProvider>
  </React.StrictMode>
);

reportWebVitals();

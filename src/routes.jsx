import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import DayplanPage from "./pages/dashboard/dayplanPage";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        name: "sunday",
        path: "/SU/:type",
        element: <DayplanPage
          day="SU"/>,
      },
      {
        name: "monday",
        path: "/MO/:type",
        element: <DayplanPage
          day="MO"/>,
      },
      {
        name: "tuesday",
        path: "/TU/:type",
        element: <DayplanPage
          day="TU"/>,
      },
      {
        name: "wednesday",
        path: "/WE/:type",
        element: <DayplanPage
          day="WE"/>,
      },
      {
        name: "thursday",
        path: "/TH/:type",
        element: <DayplanPage
          day="TH"/>,
      },
      {
        name: "friday",
        path: "/FR/:type",
        element: <DayplanPage
          day="FR"/>,
      },
      {
        name: "saturday",
        path: "/SA/:type",
        element: <DayplanPage
          day="SA"/>,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

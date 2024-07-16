import DefaultLayout from "~/layouts/DefaultLayout";
import LoginPage from "~/pages/Login/LoginPage";
import LostPasswordPage from "~/pages/LostPassword/LostPasswordPage";
import HomePage from "~/pages/Home/HomePage";
import ProjectsPage from "~/pages/Projects/ProjectsPage";
import MyPage from "~/pages/MyPage/MyPage";
import SpentTime from "~/pages/SpentTime";

const publicRoutes = [
  { path: "/login", component: LoginPage, layout: DefaultLayout },
  { path: "/lost-password", component: LostPasswordPage, layout: DefaultLayout },
];
const privateRoutes = [
  { path: "/my-page", component: MyPage, layout: DefaultLayout },
  { path: "/my-page/add-time", component: SpentTime, layout: DefaultLayout },
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: "/projects", component: ProjectsPage, layout: DefaultLayout },
];
export { privateRoutes, publicRoutes };

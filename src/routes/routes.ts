import Home from "~/pages/home/HomePage";
import MyPage from "~/pages/myPage/MyPage";
import LoginPage from "~/pages/login/LoginPage";
import ProjectsPage from "~/pages/projects/ProjectsPage";
import DefaultLayout from "~/layouts/DefaultLayout";
import LostPasswordPage from "~/pages/lostPassword/LostPasswordPage";

const publicRoutes = [
  { path: "/login", component: LoginPage, layout: DefaultLayout },
  { path: "/lost-password", component: LostPasswordPage, layout: DefaultLayout },
];
const privateRoutes = [
  { path: "/my-page", component: MyPage, layout: DefaultLayout },
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/projects", component: ProjectsPage, layout: DefaultLayout },
];
export { privateRoutes, publicRoutes };

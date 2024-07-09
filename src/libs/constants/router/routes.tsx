import Home from "~/pages/home/HomePage";
import MyPage from "~/pages/myPage/MyPage";
import LoginPage from "~/pages/login/LoginPage";
import ProjectsPage from "~/pages/projects/ProjectsPage";

const publicRoutes = [{ path: "/login", component: LoginPage, publicLayout: true }];
const privateRoutes = [
  { path: "/my-page", component: MyPage, privateLayout: true },
  { path: "/", component: Home, privateLayout: true },
  { path: "/projects", component: ProjectsPage, privateLayout: true },
];
export { privateRoutes, publicRoutes };

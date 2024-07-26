import DefaultLayout from "~/layouts/DefaultLayout";
import LoginPage from "~/pages/Login/LoginPage";
import LostPasswordPage from "~/pages/LostPassword/LostPasswordPage";
import HomePage from "~/pages/Home/HomePage";
import ProjectsPage from "~/pages/Projects/ProjectsPage";
import MyPage from "~/pages/MyPage/MyPage";
import TimeEntryCreate from "~/pages/TimeEntryCreate";
import NotFound from "~/pages/NotFound";
import TimeEntry from "~/pages/TimeEntry";
import OverView from "~/pages/OverView";
import Activity from "~/pages/Activity";
import Roadmap from "~/pages/Roadmap";
import Issues from "~/pages/Issues";
import Gantt from "~/pages/Gantt";
import IssuesCreate from "~/pages/IssuesCreate";
import CalendarDetail from "~/pages/CalendarDetail";
import DocumentsPage from "~/pages/Documents";
import Wiki from "~/pages/Wiki";
import FilesPage from "~/pages/Files";
import Settings from "~/pages/Settings";

const publicRoutes = [
  { path: "/login", component: LoginPage, layout: DefaultLayout },
  { path: "/lost-password", component: LostPasswordPage, layout: DefaultLayout },
];
const privateRoutes = [
  { path: "/my-page", component: MyPage, layout: DefaultLayout },
  { path: "/time_entries/new", component: TimeEntryCreate, layout: DefaultLayout },
  { path: "/time_entries", component: TimeEntry, layout: DefaultLayout },
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: "/projects", component: ProjectsPage, layout: DefaultLayout },

  { path: "/projects/:id/overview", component: OverView, layout: DefaultLayout },
  { path: "/projects/:id/activity", component: Activity, layout: DefaultLayout },
  { path: "/projects/:id/roadmap", component: Roadmap, layout: DefaultLayout },
  { path: "/projects/:id/issues", component: Issues, layout: DefaultLayout },
  { path: "/projects/:id/issues/new", component: IssuesCreate, layout: DefaultLayout },
  { path: "/projects/:id/issues/gantt", component: Gantt, layout: DefaultLayout },
  { path: "/projects/:id/issues/calendar", component: CalendarDetail, layout: DefaultLayout },
  { path: "/projects/:id/documents", component: DocumentsPage, layout: DefaultLayout },
  { path: "/projects/:id/wiki", component: Wiki, layout: DefaultLayout },
  { path: "/projects/:id/files", component: FilesPage, layout: DefaultLayout },
  { path: "/projects/:id/settings", component: Settings, layout: DefaultLayout },
  { path: "*", component: NotFound },
];
export { privateRoutes, publicRoutes };

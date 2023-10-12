import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect } from "react";

import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import useUserStore, { fetchUserInfo } from "src/store/userStore";
import XzWebWatcher from "./point";

// new XzWebWatcher({
//   watchPerformance: true,
//   watchEvent: true,
//   watcherHeatmap: true,
//   requestUrl: "http://api.ricedog.top/api/point",
// });

export default function App() {
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const { isLogin, name } = useUserStore();

  if (!isLogin) {
    return <LoginPage />;
  }

  // console.log("🚀 ～ file: App.tsx:34 ～ App ～ process:", process);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<EditPage />} />
        <Route path="list" element={<ListPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

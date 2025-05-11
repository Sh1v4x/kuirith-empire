import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import MainLayout from "../layouts/MainLayout";
import Shop from "../pages/shop/Shop";
import Forum from "../pages/forum/Forum";

export default function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="forum" element={<Forum />} />
        </Route>
      </Routes>
    </Router>
  );
}

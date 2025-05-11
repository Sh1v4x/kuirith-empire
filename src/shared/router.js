import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import MainLayout from "../layouts/MainLayout";
import Shop from "../pages/shop/Shop";
import Forum from "../pages/forum/Forum";
export default function AppRoute() {
    return (_jsx(Router, { children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "shop", element: _jsx(Shop, {}) }), _jsx(Route, { path: "forum", element: _jsx(Forum, {}) })] }) }) }));
}

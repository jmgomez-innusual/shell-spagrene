/* istanbul ignore file */
import React from "react";
import NotFoundPage from "@amiga-fwk-web/components-application/not-found-page";
import { Route, Routes, Navigate } from "react-router-dom";
import UnauthorizedPage from "@amiga-fwk-web/components-application/unauthorized-page";
import HomePage from "@/pages/home/home";
import ProductsPage from "@/pages/products/products";
import WebpackBaseConfiguration from "@/pages/webpack-base-configuration/webpack-base-configuration";
import SetupSass from "@/pages/setup-sass/setup-sass";
import WorkshopRemote from "@/remotes/workshop-remote";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route key="not-found" path="*" element={<NotFoundPage />} />
      <Route key="default" path="/?" element={<Navigate to="/app/home/home" replace />} />
      <Route key="home" path="/app/home/home" element={<HomePage />} />
      <Route key="products" path="/app/products/list" element={<ProductsPage />} />
      <Route
        key="webpack-base-config"
        path="/app/config/webpack-base-configuration"
        element={<WebpackBaseConfiguration />}
      />
      <Route key="setup-sass" path="/app/config/setup-sass" element={<SetupSass />} />
      <Route
        key="pageFeatureA"
        path="/app/remote/block-edit"
        element={<WorkshopRemote id="blockedit" name="spagrene" microfrontend="BlockEdit" title="Block edit" />}
      />
      <Route key="unauthorized" path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
};

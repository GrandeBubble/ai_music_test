import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ProjectGallery from "./pages/project-gallery";
import GenreFusionLaboratory from "./pages/genre-fusion-laboratory";
import LearningHub from "./pages/learning-hub";
import HomePage from "./pages/home-page";
import AIVocalTuningStudio from "./pages/ai-vocal-tuning-studio";
import CommunityShowcase from "./pages/community-showcase";
import UserProfileSettings from "./pages/user-profile-settings";
import AIMusicCompositionWorkshop from "./pages/ai-music-composition-workshop";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/home-page", element: <HomePage /> },
    { path: "/project-gallery", element: <ProjectGallery /> },
    { path: "/genre-fusion-laboratory", element: <GenreFusionLaboratory /> },
    { path: "/learning-hub", element: <LearningHub /> },
    { path: "/ai-vocal-tuning-studio", element: <AIVocalTuningStudio /> },
    { path: "/community-showcase", element: <CommunityShowcase /> },
    { path: "/user-profile-settings", element: <UserProfileSettings /> },
    { path: "/ai-music-composition-workshop", element: <AIMusicCompositionWorkshop /> },
    { path: "*", element: <HomePage /> },
  ]);

  return element;
};

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <ProjectRoutes />
    </Router>
  );
};

export default Routes;
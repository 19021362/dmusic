// @mui icons
import ArtistPage from "pages/studio";
import HomePage from "pages/home";
import SonglistPage from "pages/marketplace";

const routes = [
  {
    type: "collapse",
    name: "Puchased Songs",
    key: "home",
    route: "/home",
    component: <HomePage />,
  },
  {
    type: "collapse",
    name: "Studio",
    key: "studio",
    route: "/studio",
    component: <ArtistPage />,
  },
  {
    type: "collapse",
    name: "Marketplace",
    key: "marketplace",
    route: "/marketplace",
    component: <SonglistPage />,
  },
];

export default routes;

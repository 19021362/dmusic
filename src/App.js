/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { useMaterialUIController, setMiniSidenav } from "context";

import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import routes from "routes";
import LoginPage from "pages/login";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, sidenavColor, transparentSidenav, whiteSidenav, darkMode } =
    controller;

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const disconnectWallet = async () => {
    navigate("/");
    setIsLogin(false);
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const changeAccount = async () => {
      window.ethereum.on("accountsChanged", async (accounts) => {
        console.log(accounts[0]);
        await disconnectWallet();
      });
    };

    if (!user) {
      navigate("/");
      setIsLogin(false);
    }

    changeAccount();
  }, [user]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {isLogin && (
        <>
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Material Dashboard 2"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              setUser={setUser}
              setIsLogin={setIsLogin}
            />
            <Configurator />
          </>
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </>
      )}
      {!isLogin && <LoginPage setIsLogin={setIsLogin} setUser={setUser} />}
    </ThemeProvider>
  );
}

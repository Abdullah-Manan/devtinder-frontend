import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "../utils/scroll";
import PageLoader from "../common/PageLoader";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const isLoading = authState.isLoading;
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location, isLoggedIn, isLoading]);

  if (isLoading) {
    return (
      <PageLoader
        size="large"
        color="success"
        text="Please wait..."
        showText={true}
      />
    );
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

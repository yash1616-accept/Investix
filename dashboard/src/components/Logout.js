import { useEffect } from "react";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

const Logout = () => {
  useEffect(() => {
    //  Delete the auth cookie
    document.cookie = "isAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //  Redirect to frontend login
    window.location.href = FRONTEND_URL;
  }, []);

  return null; // Nothing is rendered
};

export default Logout;

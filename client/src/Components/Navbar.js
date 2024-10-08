import { Link } from "react-router-dom"
import { useLogout } from "../Hooks/useLogout"
import { useAuthContext } from "../Hooks/useAuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useContext, useEffect } from "react";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { isLightTheme, dark, light } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const handelLogout = () => {
    logout();
  }


  // useEffect to dynamically change the body's background color
  useEffect(() => {
    document.body.style.backgroundColor = theme.body;  // Set background color
  }, [theme])


  return (
    <header style={{ background: theme.ui, color: theme.syntax }}>
      <div className="container">
        <Link to={"/"}>
          <h1 style={{ color: theme.syntax }}>Workout Application</h1>
        </Link>
        <nav>

          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handelLogout}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Sign Up</Link>
            </div>
          )}
          <ToggleTheme />
          {/* <button onClick={() => dispatch({ type: 'toggleTheme' })}>Toggle Theme</button> */}
        </nav>
      </div>
    </header>
  )
}

export default Navbar

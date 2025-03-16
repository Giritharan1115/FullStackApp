import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Event App
        </Link>
        <div>
          {user ? (
            <>
              <Link className="btn btn-light me-2" to="/events">
                Events
              </Link>
              <Link className="btn btn-warning me-2" to="/rsvp">
                RSVP
              </Link>
              {user.role === "Admin" && (
                <Link className="btn btn-info me-2" to="/admin">
                  Admin
                </Link>
              )}
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-success" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

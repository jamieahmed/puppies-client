import { Link } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      <header className="App-header">
        Puppies
        {user ? (
          <nav>
            <Link to="/">Puppies</Link>
            <Link to="/add">Add Puppy</Link>
            <Link to="" onClick={handleLogout}>
              Log Out
            </Link>
            <Link to="/changePassword">Change Password</Link>
          </nav>
        ) : (
          <nav>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
        )}
      </header>
    </>
  );
};

export default NavBar;

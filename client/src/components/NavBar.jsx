import Auth from '../utils/auth';

const NavBar = (props) => {
  const { loggedIn, setLoggedIn } = props;
  return (
    <div className="navbar bg-base-100 mb-4">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Algo Trading Simulator
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href={loggedIn ? '/history': '/login'}>History</a>
          </li>
          {loggedIn ? (
            <li>
              <a
                onClick={() => {
                  Auth.logout();
                  setLoggedIn(false);
                }}
              >
                Logout
              </a>
            </li>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default NavBar;

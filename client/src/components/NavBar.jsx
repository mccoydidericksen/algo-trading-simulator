const NavBar = () => {
  return (
<div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Algo Trading Simulator</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>History</a></li>
      <li><a>Logout</a></li>
    </ul>
  </div>
</div>
  );
};
export default NavBar;

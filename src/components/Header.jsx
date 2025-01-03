import { Link, NavLink } from 'react-router-dom';
const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Recipe Organiser
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-primary" to="/">
                Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-primary" to="/addrecipe">
                Add Recipe
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;

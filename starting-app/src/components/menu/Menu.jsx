import "./Menu.css";
import { Link } from "react-router-dom";

function Menu() {
  /*   const [count, setCount] = useState(0);
   */
  return (
    <>
      <section className="menu-container">
        <div className="menu-logo-container">
          <h2>
            <span>X</span><strong>sociaL</strong>
          </h2>
        </div>
        <div className="menu">
          <nav className="menu-navegador">
            <div>
              <i className="fa-solid fa-house"></i>
              <Link to="/">Home</Link>
            </div>

            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
              <a href="">Feed</a>
            </div>

            <div>
              <i className="fa-solid fa-user"></i>
              <Link to="/profile">Profile</Link>
            </div>

            <div>
              <i class="fa-solid fa-bell"></i>
              <Link to="/notifications">Notifications</Link>
            </div>

            <div>
              <i class="fa-solid fa-slot-machine"></i>
              <Link to="/notifications">Games</Link>
            </div>
          </nav>
          <nav className="menu-navegador">
            <div>
              <i class="fa-solid fa-gear"></i>
              <a href="">Settings</a>
            </div>
            <div className="">
              <i class="fa-solid fa-right-from-bracket"></i>
              <a href="">Logout</a>
            </div>
          </nav>

        </div>

      </section>
    </>
  );
}

export default Menu;

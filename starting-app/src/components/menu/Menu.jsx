import { useState } from "react";
import "./Menu.css";
import AppRoutes from "../../routes/AppRoutes";
import { Link } from "react-router-dom";

function Menu() {
  /*   const [count, setCount] = useState(0);
   */
  return (
    <>
      <section className="menu-container">
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
      </section>
    </>
  );
}

export default Menu;

import { useState, useEffect } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import UserCard from "../user-card/UserCard";
import { getUser } from "../../services/UserService";

function Menu() {
  const [user, setUser] = useState({ photo: "", username: "", realName: "" });
  const [userStatus, setUserStatus] = useState("online"); // online o dnd
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    { icon: "fa-solid fa-house", label: "Home", to: "/" },
    { icon: "fa-solid fa-magnifying-glass", label: "Feed", to: "/feed" },
    { icon: "fa-solid fa-user", label: "Profile", to: "/profile" },
    { icon: "fa-solid fa-bell", label: "Notifications", to: "/notifications" },
    { icon: "fa-solid fa-slot-machine", label: "Games", to: "/games" },
    { icon: "fa-solid fa-gear", label: "Settings", to: "/settings" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response.status === "success") {
          console.log(response);
          setUser({
            photo: response.user.photo,
            username: response.user.username,
            realName: response.account_details.full_name || "Nombre Real",
          });
        } else {
          console.error("User not found:", response.message);
          setUser({ photo: "", username: "Usuario", realName: "Nombre Real" });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser({ photo: "", username: "Usuario", realName: "Nombre Real" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <section className="menu-container">
      <div className="menu-logo-container">
        <Link to="/">
          <h2>
            <span>X</span>sociaL
          </h2>
        </Link>
      </div>
      <div className="menu">
        <nav className="menu-navegador">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <i className={item.icon}></i>
              <Link to={item.to}>{item.label}</Link>
            </div>
          ))}
        </nav>
      </div>
      <UserCard
        user={user}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
        isLoading={isLoading}
      />
    </section>
  );
}

export default Menu;
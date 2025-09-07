import { useState, useEffect } from "react";
import "./Following.css";
import { followingUsers } from "../../services/UserService";
import confirmFollow from "./confirmFollowing/confirmFollow";
import { useSnackbar } from "notistack";
import { followUser } from "../../services/FollowService";
import Skeleton from "@mui/material/Skeleton";

function Following() {
  const [users, setUsers] = useState([]);
  const [followModal, setFollowModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchFollowingUsers();
  }, []);

  async function fetchFollowingUsers() {
    try {
      const response = await followingUsers();
      console.log(response);
      if (!Array.isArray(response.data)) {
        throw new Error("Error en la respuesta del servidor");
      }
      setUsers(response.data);
    } catch (e) {
      console.error(e); // para depuración
      enqueueSnackbar("Error al cargar usuarios", { variant: "error" });
      setUsers([]); // fallback seguro
    } finally {
      setIsLoading(false);
    }
  }
  async function handleFollow(user) {
    try {
      const response = await followUser(user);
      setUsers((prev) =>
        prev.map((u) =>
          u.id_user === user.id_user ? { ...u, is_following: true } : u
        )
      );
      enqueueSnackbar(response.message, { variant: response.status });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(e.message || "Error al seguir al usuario", {
        variant: "error",
        ContentProps: { className: "my-snackbar" },
      });
    }
  }

  // Componente reutilizable para skeletons de texto
  const TextSkeleton = ({ width }) => (
    <Skeleton
      variant="text"
      width={width}
      className="skeleton skeleton-text"
    />
  );

  return (
    <section className="follow-container">
      <h3>Who to Follow?</h3>
      {isLoading ? (
        // Mostrar skeletons mientras se cargan los datos
        Array.from({ length: 4 }).map((_, index) => (
          <article key={index} className="container-card">
            <div className="finfo-container">
              <div className="photo-section flex-center">
                <Skeleton
                  variant="circular"
                  className="skeleton skeleton-circular"
                />
                <TextSkeleton width={120} />
              </div>
              <div className="photo-section2 flex-center">
                <TextSkeleton width={80} />
                <span>.</span>
                <TextSkeleton width={60} />
              </div>
            </div>
            <div className="container-follow">
              <Skeleton
                variant="rounded"
                className="skeleton skeleton-button"
              />
            </div>


          </article>
        ))
      ) : users.length === 0 ? (
        <p className="no-following">No one to follow right now</p>
      ) : (
        users.map((user) => (
          <article key={user.id_user} className="container-card" id="">
            <div className="finfo-container">
              <div className="photo-section flex-center">
                <img
                  src={user.photo}
                  alt={`${user.account_details.full_name}'s profile`}
                />
                <p className="name">{user.account_details.full_name}</p>
              </div>
              <div className="photo-section2 flex-center">
                <p className="username">{user.username}</p>
                <span>.</span>
                <p className="date">{user.account_details.union_date}</p>
              </div>
            </div>
            <div className="container-follow">
              {user.is_following ? (
                <button
                  className="is_following"
                  onClick={() => setFollowModal(user.username)}
                >
                  Following
                </button>
              ) : (
                <button onClick={() => handleFollow(user)}>Follow</button>
              )}
            </div>
            {followModal === user.username &&
              confirmFollow(user, setFollowModal, setUsers)}
          </article>
        ))
      )}
    </section>
  );
}

export default Following;
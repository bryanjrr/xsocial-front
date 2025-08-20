import { useState } from "react";
import "./UserCard.css";
import { Menu as MuiMenu, MenuItem } from "@mui/material";
import Badge from "@mui/material/Badge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import Skeleton from "@mui/material/Skeleton";

function UserCard({ user, userStatus, setUserStatus, isLoading }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
    handleClose();
  };

  const handleToggleStatus = (event) => {
    event.stopPropagation();
    setUserStatus(userStatus === "online" ? "dnd" : "online");
  };

  const TextSkeleton = ({ width }) => (
    <Skeleton
      variant="text"
      width={width}
      className="skeleton skeleton-text"
    />
  );

  return (
    <div className="profile-container">
      <section className="info-container">
        <section className="photo-section flex-center">
          {isLoading ? (
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              className="skeleton skeleton-circular"
            />
          ) : (
            <Badge
              className="status-badge"
              status={userStatus}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <img
                src={user.photo || "default-profile.png"}
                alt={`${user.username}'s profile`}
                onClick={handleToggleStatus}
              />
            </Badge>
          )}
          <div className="user-info">
            {isLoading ? (
              <>
                <TextSkeleton width={100} />
                <TextSkeleton width={80} />
              </>
            ) : (
              <>
                <p className="name">{user.username || "Usuario"}</p>
                <span className="real-name">{user.realName || "Nombre Real"}</span>
              </>
            )}
          </div>
        </section>
        <MoreVertIcon
          className="more-icon"
          onClick={handleProfileClick}
        />
      </section>
      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          className: "mui-menu",
        }}
      >
        <MenuItem className="mui-menu-item" onClick={handleLogout}>
          <LogoutIcon className="logout-icon" />
          Log out
        </MenuItem>
      </MuiMenu>
    </div>
  );
}

export default UserCard;
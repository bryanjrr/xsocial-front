import { useEffect } from "react";
import viteLogo from "/vite.svg";
import "./Home.css";
import Menu from "../../components/menu/Menu";
import FeedThreads from "./FeedThreads";
import { SnackbarProvider } from 'notistack';
import { setAuthToken } from "../../services/ConfigService";

const token = localStorage.getItem('token');
if (token) {
  console.log(token)
  setAuthToken(token);
}

function Feed() {
  return (
    <>
      <div className="main-content-wrapper">
        <Menu />
        <section className="container">
          <SnackbarProvider maxSnack={2} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            style: { fontSize: '1.2rem', fontWeight: 'bold' },
          }}>
            <FeedThreads />
          </SnackbarProvider>
        </section>
      </div>
    </>
  );
  // CSS sugerido para main-content-wrapper (añadir en Home.css o global):
  // .main-content-wrapper { padding-left: 260px; box-sizing: border-box; }
  // @media (max-width: 1024px) { .main-content-wrapper { padding-left: 190px; } }
  // @media (max-width: 768px) { .main-content-wrapper { padding-left: 0; padding-top: 60px; } }
}

export default Feed;

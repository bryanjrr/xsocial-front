import { useEffect } from "react";
import viteLogo from "/vite.svg";
import "./Home.css";
import Tweet from "../../components/tweet/Tweet";
import Following from "../../components/Following/Following";
import Menu from "../../components/menu/Menu";
import { SnackbarProvider } from 'notistack';
import { setAuthToken } from "../../services/ConfigService";

const token = localStorage.getItem('token');
if (token) {
  console.log(token)
  setAuthToken(token);
}

function Home() {
  return (
    <>
      <div className="main-content-wrapper">
      <Menu />
        <section className="container">
          <div className="mainContainer">
            <SnackbarProvider maxSnack={2} anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
              style: { fontSize: '1.2rem', fontWeight: 'bold' },
            }}>
              <Tweet />
              <Following />
            </SnackbarProvider>
          </div>
        </section>
      </div>
    </>
  );
// CSS sugerido para main-content-wrapper (añadir en Home.css o global):
// .main-content-wrapper { padding-left: 260px; box-sizing: border-box; }
// @media (max-width: 1024px) { .main-content-wrapper { padding-left: 190px; } }
// @media (max-width: 768px) { .main-content-wrapper { padding-left: 0; padding-top: 60px; } }
}

export default Home;

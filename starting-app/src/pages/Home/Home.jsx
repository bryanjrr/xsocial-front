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
      <section className="container">
        <Menu></Menu>
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
    </>
  );
}

export default Home;

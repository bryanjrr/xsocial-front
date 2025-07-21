import { useState } from "react";
import viteLogo from "/vite.svg";
import "./Home.css";
import Tweet from "../../components/tweet/Tweet";
import Following from "../../components/Following/Following";
import Menu from "../../components/menu/Menu";
import { SnackbarProvider } from 'notistack';


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
          </SnackbarProvider>
          <Following />
        </div>
      </section>
    </>
  );
}

export default Home;

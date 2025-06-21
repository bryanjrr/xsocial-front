import { useState } from "react";
import viteLogo from "/vite.svg";
import "./Home.css";
import Tweet from "../../components/Tweet/Tweet";
import Following from "../../components/Following/Following"; 
import Menu from "../../components/menu/Menu";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="container">
        <Menu></Menu>
        <Tweet />
        <Following />
      </section>
    </>
  );
}

export default Home;

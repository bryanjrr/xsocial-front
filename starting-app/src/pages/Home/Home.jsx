import { useState } from "react";
import viteLogo from "/vite.svg";
import "./Home.css";
import Tweet from "../../components/Tweet/Tweet";
import Following from "../../components/Following/Following";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="container">
        <Tweet />
        <Following />
      </section>
    </>
  );
}

export default Home;

import { useState } from "react";
import viteLogo from "/vite.svg";
import "./Profile.css";


function Profile() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="container">
        <h2>Estas en profile!</h2>
      </section>
    </>
  );
}

export default Profile;

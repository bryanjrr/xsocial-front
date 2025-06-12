import { useState } from "react";
import viteLogo from "/vite.svg";
import "./Settings.css";
function Settings() {
    const [count, setCount] = useState(0);

    return (
        <>
            <section className="container">
                <h2>Settings</h2>
            </section>
        </>
    );
}

export default Settings;

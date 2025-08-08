import { useEffect, useState, useRef } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { getUser } from "../../services/UserService";
import { UserPost } from "../../services/PostService";
import "./Tweet.css";
import { useSnackbar } from 'notistack';
import SearchExperience from "../giphy/Giphy";
import { useNavigate } from "react-router-dom";



function Tweet() {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [Account, setUser] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [showGifs, setShowGifs] = useState(false);
  const [gifs, setGifs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserInfo();
    } else {
      navigate("/auth");
    }
  }, []);

  const addGif = (newGif) => {
    if (gifs.length < 1) {
      setGifs(prevGifs => [...prevGifs, newGif]);
      console.log(newGif)
      insertGifAtCursor(newGif) /* -------------------- */
    } else {
      enqueueSnackbar("Solo puedes añadir 1 GIF por publicación.", { variant: "info" });
    }
  };

  let postContent = {
    "content": text,
    "gif": gifs
  };

  const onEmojiSelect = (emoji) => {
    setText(text + emoji.native);
    setShowPicker(false);
  };

  function handlePicker() {
    showPicker ? setShowPicker(false) : setShowPicker(true);
  }

  async function getUserInfo() {
    let userResponse = await getUser(localStorage.getItem("token"));
    setUser({ ...userResponse.user, ...userResponse.account_details });
  }

  const removeGif = (index) => {
    const updated = gifs.filter((_, i) => i !== index);
    setGifs(updated);
    setEditorContent((prev) =>
      prev.replace(/<img [^>]*src="[^"]+"[^>]*class="gif-inserted"[^>]*>/, "")
    );
  };

  return (
    <>
      <article>
        <section className="info-container">
          <section className="photo-section flex-center">
            <img src={Account.photo} />
            <p className="name">{Account.username}</p>
          </section>
        </section>

        <section>
          <section className="message-creation">
            <textarea
              name=""
              id=""
              placeholder="¿What is happening?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            {gifs.map((gif, i) => (
              <div key={i} className="gif-preview">
                <img src={gif} alt={`gif-${i}`} />
                <button className="gif-delete" onClick={() => removeGif(i)}>🗑️</button>
              </div>
            ))}
            <div className="functionalities-container">
              <div className="functionalities">
                <span>
                  <label htmlFor="labelimage">
                    <i class="fa-regular fa-image"></i>
                  </label>
                  <input type="file" id="labelimage" />
                </span>
                <span>
                  <i
                    class="fa-solid fa-face-awesome"
                    onClick={handlePicker}
                  ></i>
                  {showPicker && (
                    <Picker
                      id="emoji-picker"
                      data={data}
                      theme="auto"
                      onEmojiSelect={onEmojiSelect}
                    />
                  )}
                </span>
                <span onClick={() => setShowGifs(!showGifs)}>
                  <i className="fa-regular fa-gif"></i>
                </span>

                {showGifs && (
                  <div style={{ position: 'relative' }}>
                    <SearchExperience addGif={addGif} setShowGifs={setShowGifs} />
                  </div>
                )}

              </div>
              <button onClick={() => handlePost(postContent)}>Post</button>
            </div>
          </section>
          <section className="message-list">
            <h3>List of posts</h3>
            <div className="message-container">
              <div className="info-container ">
                <section className="photo-section flex-center">
                  <img src="https://avatars.githubusercontent.com/u/181368088?s=96&v=4" />
                  <p className="name">{Account.username}</p>
                </section>
                <section className="photo-section2 flex-center">
                  <p className="username">{Account.username}</p>
                  <span>.</span>
                  <p className="date">3 Jun</p>
                </section>
              </div>
              <section className="message-section flex-center">
                <p className="message">
                  Calling all developers! 📣 Innovate with our real-time and
                  historical data on the X API. Get started with Pro👇
                </p>
              </section>
            </div>
          </section>
        </section>
      </article>
    </>
  );
}

export default Tweet;
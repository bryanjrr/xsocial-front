import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import "./Tweet.css";

function Tweet() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiSelect = (emoji) => {
    setText(text + emoji.native);
    setShowPicker(false);
  };

  function handlePicker() {
    showPicker ? setShowPicker(false) : setShowPicker(true);
  }

  return (
    <>
      <article>
        <section className="info-container">
          <section className="photo-section flex-center">
            <img src="https://avatars.githubusercontent.com/u/181368088?s=96&v=4" />
            <p className="name">Bryanjrr</p>
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
            <div className="functionalities-container">
              <div className="functionalities">
                <span>
                  <label htmlFor="labelimage">
                    <i class="fa-regular fa-image"></i>
                  </label>
                  <input type="file" id="labelimage" />
                </span>
                <span>
                  <i class="fa-regular fa-gif"></i>
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
              </div>
              <button>Post</button>
            </div>
          </section>
          <section className="message-list">
            <h3>List of posts</h3>
            <div className="message-container">
              <div className="info-container ">
                <section className="photo-section flex-center">
                  <img src="https://avatars.githubusercontent.com/u/181368088?s=96&v=4" />
                  <p className="name">Bryanjrr</p>
                </section>
                <section className="photo-section2 flex-center">
                  <p className="username">@bryanjr</p>
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

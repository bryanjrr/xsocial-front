import { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { getUser } from "../../services/UserService";
import { UserPost, getFeed } from "../../services/PostService";
import "./Tweet.css";
import { useSnackbar } from "notistack";
import SearchExperience from "../giphy/Giphy";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Feed from "../feed/Feed";

function Tweet() {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [Account, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showGifs, setShowGifs] = useState(false);
  const [gifs, setGifs] = useState([]);
  const navigate = useNavigate();

  const isPostEnabled = text.trim() !== "";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserInfo();
      loadPosts();
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  async function getUserInfo() {
    try {
      let userResponse = await getUser(localStorage.getItem("token"));
      setUser({ ...userResponse.user, ...userResponse.account_details });
    } catch (e) {
      console.error("Error fetching user:", e);
      enqueueSnackbar("Error al cargar los datos del usuario", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function loadPosts() {
    if (isFetching) return;
    setIsFetching(true);
    try {
      console.log("Cargando posts con cursor:", cursor);
      const response = await getFeed(cursor);
      console.log("Respuesta feed:", response);
      if (response.data.length === 0) {
        setHasMore(false);
        return;
      }
      setPosts((prev) => {
        const newPosts = response.data.filter(
          (newPost) => !prev.some((p) => p.id === newPost.id)
        );
        return [...prev, ...newPosts];
      });
      setCursor(response.pagination.next_cursor);
    } catch (e) {
      console.error("Error al cargar el feed:", e);
      enqueueSnackbar("Error al cargar el feed. Reintentando...", {
        variant: "warning",
      });
      setTimeout(loadPosts, 10000);
    } finally {
      setIsFetching(false);
    }
  }

  const addGif = (newGif) => {
    if (gifs.length < 1) {
      setGifs((prevGifs) => [...prevGifs, newGif]);
    } else {
      enqueueSnackbar("Solo puedes añadir 1 GIF por publicación.", {
        variant: "info",
      });
    }
  };

  let postContent = {
    content: text,
    gif: gifs,
  };

  const onEmojiSelect = (emoji) => {
    setText(text + emoji.native);
    setShowPicker(false);
  };

  function handlePicker() {
    if (showPicker) {
      setShowPicker(false);
    } else {
      setShowPicker(true);
      setShowGifs(false);
    }
  }

  function handleGifs() {
    if (showGifs) {
      setShowGifs(false);
    } else {
      setShowGifs(true);
      setShowPicker(false);
    }
  }

  const removeGif = (index) => {
    const updated = gifs.filter((_, i) => i !== index);
    setGifs(updated);
  };

  async function handlePost(postContent) {
    try {
      let response = await UserPost(postContent);
      enqueueSnackbar(response.message, { variant: response.status });
      setText("");
      setGifs([]);
      setPosts((prev) => [response.data, ...prev]);
    } catch (e) {
      enqueueSnackbar(e.response?.data?.message || "Error al publicar", {
        variant: "error",
      });
    }
  }

  const TextSkeleton = ({ width }) => (
    <Skeleton variant="text" width={width} className="skeleton-text" />
  );

  return (
    <>
      <article>
        <section className="info-container">
          <section className="photo-section flex-center">
            {isLoading ? (
              <>
                <Skeleton variant="circular" className="skeleton-circular" />
                <TextSkeleton width={100} />
              </>
            ) : (
              <>
                <img
                  src={Account.photo || "default-profile.png"}
                  alt={`${Account.username || "Usuario"}'s profile`}
                />
                <p className="name">{Account.username || "Usuario"}</p>
              </>
            )}
          </section>
        </section>

        <section>
          <section className="message-creation">
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" className="skeleton-textarea" />
                <div className="functionalities-container">
                  <div className="functionalities">
                    <span>
                      <i className="fa-regular fa-image"></i>
                    </span>
                    <span>
                      <i className="fa-solid fa-face-awesome"></i>
                    </span>
                    <span>
                      <i className="fa-regular fa-gif"></i>
                    </span>
                  </div>
                  <Skeleton variant="rounded" className="skeleton-button" />
                </div>
              </>
            ) : (
              <>
                <textarea
                  placeholder="¿What is happening?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>

                {gifs.map((gif, i) => (
                  <div key={i} className="gif-preview">
                    <img src={gif} alt={`gif-${i}`} />
                    <button className="gif-delete" onClick={() => removeGif(i)}>
                      🗑️
                    </button>
                  </div>
                ))}

                <div className="functionalities-container">
                  <div className="functionalities">
                    <span>
                      <label htmlFor="labelimage">
                        <i className="fa-regular fa-image"></i>
                      </label>
                      <input type="file" id="labelimage" />
                    </span>

                    <span onClick={handlePicker}>
                      <i className="fa-solid fa-face-awesome"></i>
                    </span>
                    {showPicker && (
                      <div className="emoji-picker-container">
                        <Picker
                          id="emoji-picker"
                          data={data}
                          theme="auto"
                          onEmojiSelect={onEmojiSelect}
                        />
                      </div>
                    )}

                    <span onClick={handleGifs}>
                      <i className="fa-regular fa-gif"></i>
                    </span>
                    {showGifs && (
                      <div style={{ position: "relative" }}>
                        <SearchExperience addGif={addGif} setShowGifs={setShowGifs} />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handlePost(postContent)}
                    disabled={!isPostEnabled}
                    className={isPostEnabled ? "post-button-enabled" : "post-button-disabled"}
                  >
                    Post
                  </button>
                </div>
              </>
            )}
          </section>

          <section className="message-list">
            <Feed
              posts={posts}
              isLoading={isLoading}
              loadMorePosts={loadPosts}
              hasMore={hasMore}
              type="feed"
            />
          </section>
        </section>
      </article>
    </>
  );
}

export default Tweet;
import { useEffect, useReducer, useCallback, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import PropTypes from "prop-types";
import { getUser } from "../../services/UserService";
import { UserPost, getFeed, moderateImage } from "../../services/PostService";
import "./Tweet.css";
import { useSnackbar } from "notistack";
import SearchExperience from "../giphy/Giphy";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Feed from "../feed/Feed";

// Custom hook para manejar la carga de posts
const usePosts = (initialCursor = null) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "FETCHING":
          return { ...state, isFetching: true };
        case "SUCCESS":
          return {
            ...state,
            posts: [...state.posts, ...action.payload.posts],
            cursor: action.payload.cursor,
            hasMore: action.payload.hasMore,
            isFetching: false,
          };
        case "ERROR":
          return { ...state, isFetching: false };
        case "ADD_POST":
          return {
            ...state,
            posts: [action.payload, ...state.posts],
          };
        default:
          return state;
      }
    },
    {
      posts: [],
      cursor: initialCursor,
      hasMore: true,
      isFetching: false,
    }
  );

  const loadPosts = useCallback(async () => {
    if (state.isFetching) return;
    dispatch({ type: "FETCHING" });
    try {
      console.log("Cargando posts con cursor:", state.cursor);
      const response = await getFeed(state.cursor);
      console.log("Respuesta feed:", response);
      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        dispatch({ type: "SUCCESS", payload: { posts: [], cursor: null, hasMore: false } });
        return;
      }
      const newPosts = response.data
        .filter((newPost) => newPost && typeof newPost === "object" && newPost.id)
        .map((post) => ({
          ...post,
          media: post.mediaPosts
            ? post.mediaPosts.map((media) => ({
                file_url: media.file_url,
                content_type: media.content_type === 1 ? "gif" : "photo",
              }))
            : [],
        }));
      dispatch({
        type: "SUCCESS",
        payload: {
          posts: newPosts.filter((np) => !state.posts.some((p) => p.id === np.id)),
          cursor: response.pagination.next_cursor,
          hasMore: true,
        },
      });
    } catch (e) {
      console.error("Error al cargar el feed:", e);
      dispatch({ type: "ERROR" });
    }
  }, [state.cursor, state.isFetching]);

  return { ...state, loadPosts, addPost: (post) => dispatch({ type: "ADD_POST", payload: post }) };
};

// Custom hook para manejar el formulario de publicación
const usePostForm = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_TEXT":
          return { ...state, text: action.payload };
        case "SET_GIF":
          return { ...state, gif: action.payload, image: null };
        case "SET_IMAGE":
          return { ...state, image: action.payload, gif: null };
        case "SET_SHOW_PICKER":
          return { ...state, showPicker: action.payload, showGifs: action.payload ? false : state.showGifs };
        case "SET_SHOW_GIFS":
          return { ...state, showGifs: action.payload, showPicker: action.payload ? false : state.showPicker };
        case "RESET":
          return { ...state, text: "", gif: null, image: null };
        default:
          return state;
      }
    },
    {
      text: "",
      showPicker: false,
      showGifs: false,
      gif: null,
      image: null,
    }
  );

  return { ...state, dispatch };
};

function Tweet() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { posts, cursor, hasMore, isFetching, loadPosts, addPost } = usePosts();
  const { text, showPicker, showGifs, gif, image, dispatch } = usePostForm();

  const isPostEnabled = text.trim() !== "" || gif !== null || image !== null;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserInfo();
      loadPosts();
    } else {
      navigate("/auth");
    }
  }, [navigate, loadPosts]);

  async function getUserInfo() {
    try {
      let userResponse = await getUser(localStorage.getItem("token"));
      setUser({ ...userResponse.user, ...userResponse.account_details });
    } catch (e) {
      console.error("Error fetching user:", e);
      enqueueSnackbar("Error al cargar los datos del usuario", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  const addGif = (newGif) => {
    if (gif || image) {
      enqueueSnackbar("Solo puedes añadir 1 GIF o imagen por publicación.", { variant: "info" });
    } else {
      dispatch({ type: "SET_GIF", payload: { file_url: newGif, content_type: "gif" } });
    }
  };

  const onEmojiSelect = (emoji) => {
    dispatch({ type: "SET_TEXT", payload: text + emoji.native });
    dispatch({ type: "SET_SHOW_PICKER", payload: false });
  };

  const handlePicker = () => {
    dispatch({ type: "SET_SHOW_PICKER", payload: !showPicker });
  };

  const handleGifs = () => {
    dispatch({ type: "SET_SHOW_GIFS", payload: !showGifs });
  };

  const removeGif = () => {
    dispatch({ type: "SET_GIF", payload: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (gif || image) {
      enqueueSnackbar("Solo puedes añadir 1 GIF o imagen por publicación.", { variant: "info" });
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      enqueueSnackbar("Solo se permiten imágenes JPEG, PNG, WebP o GIF.", { variant: "error" });
      return;
    }
    if (image && image.previewUrl) {
      URL.revokeObjectURL(image.previewUrl);
    }
    const previewUrl = URL.createObjectURL(file);
    console.log("Nueva imagen seleccionada:", { file, previewUrl });
    dispatch({ type: "SET_IMAGE", payload: { file, previewUrl } });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    console.log("Eliminando imagen:", image);
    if (image && image.previewUrl) {
      URL.revokeObjectURL(image.previewUrl);
    }
    dispatch({ type: "SET_IMAGE", payload: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handlePost() {
    try {
      if (image) {
        const isSafe = await moderateImage(image.file);
        if (!isSafe) {
          enqueueSnackbar("La imagen contiene contenido inapropiado y no puede ser publicada.", {
            variant: "error",
          });
          return;
        }
      }

      const postContent = {
        content: text || "",
        gif: gif ? gif.file_url : null,
        media: image ? image.file : null,
      };

      console.log("Enviando post:", postContent);
      let response = await UserPost(postContent);
      console.log("Respuesta del post:", response);
      if (!response.data || typeof response.data !== "object" || !response.data.id) {
        throw new Error("La respuesta de la API no contiene un post válido");
      }

      const normalizedPost = {
        id: response.data.id,
        content: response.data.content || text,
        media: response.data.mediaPosts
          ? response.data.mediaPosts.map((media) => ({
              file_url: media.file_url,
              content_type: media.content_type === 1 ? "gif" : "photo",
            }))
          : [],
        user: response.data.user || user,
        created_at: response.data.created_at || new Date().toISOString(),
      };

      enqueueSnackbar(response.message || "Post creado exitosamente", { variant: response.status || "success" });
      dispatch({ type: "RESET" });
      addPost(normalizedPost);
    } catch (e) {
      console.error("Error al publicar:", e.response?.data || e);
      let errorMessage = e.response?.data?.message || "Error al publicar";
      if (e.response?.data?.errors) {
        errorMessage += ": " + Object.values(e.response.data.errors).flat().join(", ");
      }
      enqueueSnackbar(errorMessage, { variant: "error" });
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
                  src={user.photo || "default-profile.png"}
                  alt={`${user.username || "Usuario"}'s profile`}
                />
                <p className="name">{user.username || "Usuario"}</p>
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
                  onChange={(e) => dispatch({ type: "SET_TEXT", payload: e.target.value })}
                ></textarea>

                {gif && (
                  <div className="gif-preview">
                    <img src={gif.file_url} alt="gif-preview" />
                    <button className="gif-delete" onClick={removeGif}>
                      🗑️
                    </button>
                  </div>
                )}

                {image && (
                  <div className="image-preview" key={image.previewUrl}>
                    <img src={image.previewUrl} alt="image-preview" />
                    <button className="image-delete" onClick={removeImage}>
                      🗑️
                    </button>
                  </div>
                )}

                <div className="functionalities-container">
                  <div className="functionalities">
                    <span>
                      <label htmlFor="labelimage">
                        <i className="fa-regular fa-image"></i>
                      </label>
                      <input
                        type="file"
                        id="labelimage"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
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
                        <SearchExperience addGif={addGif} setShowGifs={(value) => dispatch({ type: "SET_SHOW_GIFS", payload: value })} />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handlePost}
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

Tweet.propTypes = {
  // No props directas en Tweet, pero podrías añadirlas si se usa como subcomponente
};

export default Tweet;
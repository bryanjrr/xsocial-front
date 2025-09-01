import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Feed.css";

// Componente para mostrar una imagen desde Blob o URL
function MediaImage({ file, alt, className, onError }) {
  const [objectUrl, setObjectUrl] = React.useState(null);

  React.useEffect(() => {
    if (file instanceof Blob) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setObjectUrl(null);
    }
  }, [file]);

  const src = objectUrl || file;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={onError}
    />
  );
}

function Feed({ posts, isLoading, loadMorePosts, hasMore, type = "feed" }) {
  // Formatear fecha en un formato amigable (e.g., "20 ago 2025")
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha desconocida";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const TextSkeleton = ({ width }) => (
    <Skeleton variant="text" width={width} className="skeleton-text" />
  );

  const PostSkeleton = () => (
    <div className="message-container">
      <div className="info-container post-info">
        <section className="photo-section flex-center">
          <Skeleton variant="circular" className="skeleton-circular-post" />
          <TextSkeleton width={100} />
        </section>
        <section className="photo-section2 flex-center">
          <TextSkeleton width={80} />
          <span>.</span>
          <TextSkeleton width={60} />
        </section>
        <section className="message-section flex-center">
          <TextSkeleton width="90%" />
          <TextSkeleton width="90%" />
          <TextSkeleton width="70%" />
        </section>
      </div>
    </div>
  );

  console.log("Feed renderizado - Posts recibidos:", posts);

  return (
    <section className="message-list">
      <h3>{type === "feed" ? "List of posts" : "Posts"}</h3>

      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <PostSkeleton key={`skeleton-${index}`} />
        ))
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<PostSkeleton />}
          scrollThreshold="200px"
        >
          {posts.length === 0 ? (
            <p>No hay publicaciones para mostrar</p>
          ) : (
            posts.map((post) => {
              // Convertir post.media en array si es un objeto
              const mediaArray = Array.isArray(post.media)
                ? post.media
                : post.media && typeof post.media === "object"
                  ? [post.media]
                  : [];
              return (
                <div key={post.id} className="message-container">
                  <div className="info-container post-info">
                    <section className="photo-section flex-center">
                      <img
                        src={post.user?.photo || "default-profile.png"}
                        alt={`${post.user?.username || "Usuario"}'s profile`}
                      />
                      <p className="name">{post.user?.username || "Usuario"}</p>
                    </section>
                    <section className="photo-section2 flex-center">
                      <p className="username">{post.user?.username || "Usuario"}</p>
                      <span>.</span>
                      <p className="date">{formatDate(post.created_at)}</p>
                    </section>
                  </div>
                  <section className="message-section flex-center">
                    <p className="message">{post.content || ""}</p>
                    {mediaArray.length > 0 && (
                      <div className="media-preview">
                        {mediaArray
                          .filter((media) => {
                            const isValid = ["gif", "image", "image/jpeg", "image/png", "image/gif", "image/webp"].includes(
                              media.content_type?.toLowerCase().trim()
                            ) || media.file_url instanceof Blob;
                            console.log("Media filter:", media, "isValid:", isValid);
                            return isValid;
                          })
                          .map((media, index) => (
                            <MediaImage
                              key={`media-${index}`}
                              file={media.file_url}
                              alt="Post media"
                              className="gif-preview"
                              onError={(e) => {
                                console.error(`Error cargando media ${index}:`, media.file_url);
                                e.target.src = "/default-media.png";
                              }}
                            />
                          ))}
                      </div>
                    )}
                    <div className="tiktok-actions">
                      <span className="heart-anim" title="Me gusta">
                        <FavoriteIcon className="heart-icon" fontSize="medium" />
                      </span>
                      <span className="comment-anim" title="Comentar">
                        <ChatBubbleOutlineIcon className="comment-icon" fontSize="medium" />
                      </span>
                    </div>
                  </section>
                </div>
              );
            })
          )}
        </InfiniteScroll>
      )}
    </section>
  );
}

export default Feed;
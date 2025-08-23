import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Feed.css";

function Feed({ posts, isLoading, loadMorePosts, hasMore, type = "feed" }) {
  // Componente auxiliar para skeletons de texto
  const TextSkeleton = ({ width }) => (
    <Skeleton variant="text" width={width} className="skeleton-text" />
  );

  // Skeleton para posts (usado en carga inicial y loader)
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

  return (
    <section className="message-list">
      {/* Título dinámico según el tipo de feed */}
      <h3>{type === "feed" ? "List of posts" : "Posts"}</h3>

      {/* Mostrar skeletons durante la carga inicial */}
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <PostSkeleton key={`skeleton-${index}`} />
        ))
      ) : (
        <InfiniteScroll
          dataLength={posts.length} // Longitud actual de posts para detectar cambios
          next={loadMorePosts} // Función para cargar más posts
          hasMore={hasMore} // Controla si hay más posts para cargar
          loader={<PostSkeleton />} // Skeleton para cargas adicionales
          endMessage={<p>No hay más publicaciones para mostrar</p>} // Mensaje al final
          scrollThreshold="200px" // Cargar más posts a 200px del final
        >
          {/* Mostrar mensaje si no hay posts, o renderizar la lista */}
          {posts.length === 0 ? (
            <p>No hay publicaciones para mostrar</p>
          ) : (
            posts.map((post) => (
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
                    <p className="date">
                      {post.created_at
                        ? new Date(post.created_at).toLocaleDateString()
                        : "Fecha desconocida"}
                    </p>
                  </section>
                </div>
                <section className="message-section flex-center">
                  <p className="message">{post.content || ""}</p>
                  {post.gif && <img src={post.gif} alt="post-gif" className="gif-preview" />}
                </section>
              </div>
            ))
          )}
        </InfiniteScroll>
      )}
    </section>
  );
}

export default Feed;
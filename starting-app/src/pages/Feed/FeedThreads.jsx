import React, { useEffect, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Chip, Typography, Button, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import InfiniteScroll from "react-infinite-scroll-component";
import Menu from "../../components/menu/Menu";
import { SnackbarProvider } from "notistack";
import { Fade, Slide } from "@mui/material";
import ThreadChat from "./ThreadChat";
import CategoriesSidebar from "../../components/CategoriesSidebar/CategoriesSidebar";
import { getThreads, getLanguages, getCategories } from "../../services/ThreadService";
import "./FeedThreads.css";
import TrendingThreads from "../../components/TrendingThreads/TrendingThreads";

// Componente Skeleton
const ThreadSkeleton = () => (
  <li className="feed-thread-item skeleton">
    <div className="thread-main">
      <Typography className="skeleton-text"></Typography>
      <div className="thread-info skeleton-text"></div>
    </div>
  </li>
);

function FeedThreads() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [threadParticipants, setThreadParticipants] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Fetch initial data
    fetchThreads();
    fetchLanguages();
    fetchCategories();
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await getThreads(page, filters);
      setThreads((prev) => [...prev, ...response.data]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await getLanguages();
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const loadMoreThreads = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleThreadClick = async (thread) => {
    if (thread.id === selectedThread?.id) {
      setSelectedThread(null);
      setThreadParticipants([]);
      return;
    }
    setSelectedThread(thread);
    // Fetch participantes del thread
    try {
      const res = await fetch(`/api/threads/${thread.id}/participants`);
      if (res.ok) {
        const data = await res.json();
        setThreadParticipants(data);
      } else {
        setThreadParticipants([]);
      }
    } catch {
      setThreadParticipants([]);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setThreads([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="main-content-wrapper">
      <Menu />
      <section className="container">


        <section className=" feed-threads-layout">

          <SnackbarProvider
            maxSnack={2}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
              style: { fontSize: "1.2rem", fontWeight: "bold" },
            }}
          >
            <div className="feed-threads-list-col">
              <TrendingThreads />
              <div className="feed-threads-filters">
                {/* ...filtros... */}
              </div>
              <InfiniteScroll
                dataLength={threads.length}
                next={loadMoreThreads}
                hasMore={hasMore}
                loader={
                  <div className="skeleton-container">
                    {Array(3)
                      .fill()
                      .map((_, index) => (
                        <ThreadSkeleton key={index} />
                      ))}
                  </div>
                }
                scrollThreshold="200px"
              >
                <ul className="feed-threads-list">
                  {threads.map((thread) => {
                    const visibleAvatars = 5;
                    return (
                      <li
                        className={`feed-thread-item${selectedThread && selectedThread.id === thread.id ? " selected" : ""}`}
                        key={thread.id}
                        onClick={() => handleThreadClick(thread)}
                      >
                        <div className="thread-main">
                          <div className="thread-title-row">
                            <Typography variant="subtitle1" className="thread-title">
                              {thread.title}
                            </Typography>
                          </div>
                          <div className="thread-meta">
                            <Chip label={thread.type} size="small" className="meta-tag" />
                            <span className="meta-author">{thread.user?.username || "unknown"}</span>
                            <span className="meta-date">
                              {new Date(thread.created_at).toLocaleDateString()}
                            </span>
                            <span className="meta-status">{thread.status ? "Active" : "Inactive"}</span>
                          </div>
                        </div>
                        <div className="thread-right">
                          <span className="thread-comments">
                            <ChatBubbleOutlineIcon fontSize="small" />
                            <Typography variant="caption" color="text.secondary">
                              {thread.replies || 0}
                            </Typography>
                          </span>
                          {thread.recent_participants && thread.recent_participants.length > 0 && (
                            <div className="thread-participants">
                              <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                Participants
                              </Typography>
                              <AvatarGroup max={visibleAvatars}>
                                {thread.recent_participants
                                  .slice(0, visibleAvatars)
                                  .map((user, i) => (
                                    <Tooltip key={i} title={user.username} arrow>
                                      <Avatar src={user.avatar_url || undefined} alt={user.username}>
                                        {user.username ? user.username[0].toUpperCase() : "U"}
                                      </Avatar>
                                    </Tooltip>
                                  ))}
                              </AvatarGroup>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </InfiniteScroll>
            </div>

            {/* Chat lateral si hay thread seleccionado */}
            {selectedThread && (
              <div className="feed-threads-chat-col">
                <ThreadChat thread={selectedThread} participants={threadParticipants} />
              </div>
            )}

          </SnackbarProvider>
        </section>
      </section>
    </div>
  );
}

export default FeedThreads;

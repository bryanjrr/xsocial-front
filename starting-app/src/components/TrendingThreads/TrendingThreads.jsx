import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './TrendingThreads.css'; // Import the CSS file

const TrendingThreads = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const fakeThreads = [
        {
          id: 1,
          title: 'Lanzamiento de nueva API por xAI',
          content: 'Detalles sobre la nueva integración de IA.',
          created_at: '2025-09-30',
          views: 1200,
          replies: 45,
          image: "https://pics.filmaffinity.com/one_battle_after_another-992235034-large.jpg"
        },
        {
          id: 2,
          title: 'Cómo optimizar React en 2025',
          content: 'Nuevas técnicas para mejorar rendimiento.',
          created_at: '2025-09-29',
          views: 850,
          replies: 12,
          image: "https://pics.filmaffinity.com/one_battle_after_another-992235034-large.jpg"
        },
        {
          id: 3,
          title: 'Debate: ¿Futuro de las redes sociales?',
          content: 'Discusión sobre tendencias actuales.',
          created_at: '2025-09-30',
          views: 3000,
          replies: 89,
          image: "https://pics.filmaffinity.com/one_battle_after_another-992235034-large.jpg"
        },
        {
          id: 4,
          title: 'Tendencias en IA 2025',
          content: 'Explorando el futuro de la inteligencia artificial.',
          created_at: '2025-09-28',
          views: 500,
          replies: 20,
          image: "https://pics.filmaffinity.com/one_battle_after_another-992235034-large.jpg"
        },
      ];
      setThreads(fakeThreads);
    };
    fetchThreads();
  }, []);

  return (
    <Box className="trending-threads-container">
      <Box className="trending-header">
        <TrendingUpIcon color="primary" fontSize="large" />
        <Typography variant="h5" className="trending-title">
          Threads en Tendencia
        </Typography>
      </Box>
      <Box className="trending-threads-grid">
        {threads[0] && (
          <Box className="trending-thread-card trending-thread-card-left" key={`thread-card-0`}>
            <img
              src={threads[0].image}
              alt={threads[0].title}
              className="trending-thread-image"
            />
            <Box className="trending-thread-content">
              <Typography variant="h6" className="trending-thread-title">
                {threads[0].title}
              </Typography>
              <Typography variant="body2" className="trending-thread-desc">
                {threads[0].content.substring(0, 40)}...
              </Typography>
              <div className="trending-thread-meta">
                <span className="trending-thread-meta-item">
                  <ChatBubbleOutlineIcon fontSize="small" className="trending-thread-icon" style={{ color: '#7ec3ff' }} />
                  {threads[0].replies}
                </span>
                <span className="trending-thread-meta-item">
                  <FavoriteBorderIcon fontSize="small" className="trending-thread-icon" style={{ color: '#ff4081' }} />
                  {threads[0].views}
                </span>
              </div>
              <div className="thread-meta">
                <span className="meta-tag">Tendencia</span>
                <span className="meta-author">{threads[0].user?.username || "unknown"}</span>
                <span className="meta-date">{new Date(threads[0].created_at).toLocaleDateString()}</span>
                <span className="meta-status">Activo</span>
              </div>
            </Box>
          </Box>
        )}
        {threads[1] && (
          <Box className="trending-thread-card" key={`thread-card-1`}>
            <img
              src={threads[1].image}
              alt={threads[1].title}
              className="trending-thread-image"
            />
            <Box className="trending-thread-content">
              <Typography variant="h6" className="trending-thread-title">
                {threads[1].title}
              </Typography>
              <Typography variant="body2" className="trending-thread-desc">
                {threads[1].content.substring(0, 40)}...
              </Typography>
              <div className="trending-thread-meta">
                <span className="trending-thread-meta-item">
                  <ChatBubbleOutlineIcon fontSize="small" className="trending-thread-icon" style={{ color: '#7ec3ff' }} />
                  {threads[1].replies}
                </span>
                <span className="trending-thread-meta-item">
                  <FavoriteBorderIcon fontSize="small" className="trending-thread-icon" style={{ color: '#ff4081' }} />
                  {threads[1].views}
                </span>
              </div>
              <div className="thread-meta">
                <span className="meta-tag">Tendencia</span>
                <span className="meta-author">{threads[1].user?.username || "unknown"}</span>
                <span className="meta-date">{new Date(threads[1].created_at).toLocaleDateString()}</span>
                <span className="meta-status">Activo</span>
              </div>
            </Box>
          </Box>
        )}
        {threads[2] && (
          <Box className="trending-thread-card" key={`thread-card-2`}>
            <img
              src={threads[2].image}
              alt={threads[2].title}
              className="trending-thread-image"
            />
            <Box className="trending-thread-content">
              <Typography variant="subtitle1" className="trending-thread-title trending-thread-title-small">
                {threads[2].title}
              </Typography>
              <Typography variant="body2" className="trending-thread-desc">
                {threads[2].content.substring(0, 40)}...
              </Typography>
              <div className="trending-thread-meta">
                <span className="trending-thread-meta-item">
                  <ChatBubbleOutlineIcon fontSize="small" className="trending-thread-icon" style={{ color: '#7ec3ff' }} />
                  {threads[2].replies}
                </span>
                <span className="trending-thread-meta-item">
                  <FavoriteBorderIcon fontSize="small" className="trending-thread-icon" style={{ color: '#ff4081' }} />
                  {threads[2].views}
                </span>
              </div>
              <div className="thread-meta">
                <span className="meta-tag">Tendencia</span>
                <span className="meta-author">{threads[2].user?.username || "unknown"}</span>
                <span className="meta-date">{new Date(threads[2].created_at).toLocaleDateString()}</span>
                <span className="meta-status">Activo</span>
              </div>
            </Box>
          </Box>
        )}
        {threads[3] && (
          <Box className="trending-thread-card" key={`thread-card-3`}>
            <img
              src={threads[3].image}
              alt={threads[3].title}
              className="trending-thread-image"
            />
            <Box className="trending-thread-content">
              <Typography variant="subtitle1" className="trending-thread-title trending-thread-title-small">
                {threads[3].title}
              </Typography>
              <Typography variant="body2" className="trending-thread-desc">
                {threads[3].content.substring(0, 40)}...
              </Typography>
              <div className="trending-thread-meta">
                <span className="trending-thread-meta-item">
                  <ChatBubbleOutlineIcon fontSize="small" className="trending-thread-icon" style={{ color: '#7ec3ff' }} />
                  {threads[3].replies}
                </span>
                <span className="trending-thread-meta-item">
                  <FavoriteBorderIcon fontSize="small" className="trending-thread-icon" style={{ color: '#ff4081' }} />
                  {threads[3].views}
                </span>
              </div>
              <div className="thread-meta">
                <span className="meta-tag">Tendencia</span>
                <span className="meta-author">{threads[3].user?.username || "unknown"}</span>
                <span className="meta-date">{new Date(threads[3].created_at).toLocaleDateString()}</span>
                <span className="meta-status">Activo</span>
              </div>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TrendingThreads;
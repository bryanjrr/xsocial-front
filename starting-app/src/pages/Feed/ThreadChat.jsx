import React, { useEffect, useRef, useState } from "react";
import "./ThreadChat.css"; // Actualiza CSS para burbujas

import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function ThreadChat({ thread, participants = [] }) {
  const [messages, setMessages] = useState([]); // Árbol de mensajes
  const [input, setInput] = useState("");
  const [replyToId, setReplyToId] = useState(null);
  const ws = useRef(null);
  const messagesEndRef = useRef(null); // Para scroll automático

  useEffect(() => {
    ws.current = new WebSocket(`wss://your-backend/ws/thread/${thread.id}`);
    ws.current.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      addMessageToTree(newMsg);
    };
    // Fetch inicial y build tree
    fetch(`/api/threads/${thread.id}/messages`)
      .then((r) => r.json())
      .then((data) => buildMessageTree(data))
      .then(setMessages);

    return () => ws.current && ws.current.close();
  }, [thread.id]);

  // Función para construir el árbol de mensajes (copia de mi ejemplo anterior)
  const buildMessageTree = (flatMessages) => {
    const messageMap = new Map();
    flatMessages.forEach((msg) => {
      msg.replies = [];
      messageMap.set(msg.id, msg);
    });
    const roots = [];
    flatMessages.forEach((msg) => {
      if (msg.parent_id) {
        const parent = messageMap.get(msg.parent_id);
        if (parent) parent.replies.push(msg);
      } else {
        roots.push(msg);
      }
    });
    return roots;
  };

  // Añadir un nuevo mensaje al árbol
  const addMessageToTree = (newMsg) => {
    setMessages((prev) => {
      if (!newMsg.parent_id) {
        return [...prev, { ...newMsg, replies: [] }];
      }
      const updateTree = (msgs) =>
        msgs.map((msg) =>
          msg.id === newMsg.parent_id
            ? { ...msg, replies: [...msg.replies, { ...newMsg, replies: [] }] }
            : { ...msg, replies: updateTree(msg.replies) }
        );
      return updateTree(prev);
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll al final
  }, [messages]);

  // Función sendMessage completada
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = {
      content: input,
      thread_id: thread.id,
      user: "me", // Ajusta esto según tu lógica de autenticación
      created_at: new Date().toISOString(),
      parent_id: replyToId,
    };
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msg));
    }
    addMessageToTree(msg); // Actualiza localmente
    setInput("");
    setReplyToId(null);
  };

  // MessageTree con estilos chat-like
  const MessageTree = ({ msg, depth = 0 }) => (
    <div style={{ marginLeft: `${depth * 20}px` }}>
      <div className={`chat-bubble ${msg.user === "me" ? "mine" : "other"}`}>
        <img src={`avatar-${msg.user}.png`} alt="avatar" className="avatar" /> {/* Placeholder para avatar */}
        <div className="bubble-content">
          <span className="user">{msg.user}</span>
          <span className="content">{msg.content}</span>
          <span className="date">{new Date(msg.created_at).toLocaleTimeString()}</span>
        </div>
        <button onClick={() => setReplyToId(msg.id)}>Responder</button>
      </div>
      {msg.replies.map((reply) => (
        <MessageTree key={reply.id} msg={reply} depth={depth + 1} />
      ))}
    </div>
  );

  return (
    <div className="thread-chat-container">
      <div className="thread-chat-header" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        {/* Imagen del thread si existe */}
        {thread.image_url && (
          <img src={thread.image_url} alt="thread" style={{maxWidth: 120, maxHeight: 120, borderRadius: 18, marginBottom: 10, objectFit: 'cover', boxShadow: '0 2px 12px #0003'}} />
        )}
        <Typography variant="h6" sx={{fontWeight: 700, color: '#fff', mb: 1}}>
          {thread.title}
        </Typography>
        {/* Participantes con AvatarGroup si hay participantes */}
        {participants.length > 0 && (
          <AvatarGroup max={6} sx={{margin: '0 auto', mb: 1}}>
            {participants.map((user) => (
              <Avatar key={user.id} src={user.avatar_url || undefined} alt={user.username}>
                {user.username ? user.username[0].toUpperCase() : 'U'}
              </Avatar>
            ))}
          </AvatarGroup>
        )}
      </div>
      <div className="thread-chat-messages">
        {messages.map((msg) => (
          <MessageTree key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={replyToId ? "Respondiendo..." : "Escribe..."}
        />
        <button type="submit">Enviar</button>
        {replyToId && <button onClick={() => setReplyToId(null)}>Cancelar</button>}
      </form>
    </div>
  );
}

export default ThreadChat;
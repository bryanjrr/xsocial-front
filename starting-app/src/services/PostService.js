import { apiClient } from "./ConfigService";
import * as tf from "@tensorflow/tfjs";
import * as nsfwjs from "nsfwjs";
import axios from "axios";

// Cargar el modelo NSFWJS una sola vez
let nsfwModel = null;
async function loadNSFWModel() {
  if (!nsfwModel) {
    try {
      nsfwModel = await nsfwjs.load();
      console.log("Modelo NSFWJS cargado exitosamente");
    } catch (e) {
      console.error("Error al cargar el modelo NSFWJS:", e);
      throw new Error("No se pudo cargar el modelo de moderación");
    }
  }
  return nsfwModel;
}

// Función para moderar imágenes con NSFWJS
async function moderateImage(file) {
  try {
    // Crear una imagen a partir del archivo
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => (img.onload = resolve));

    // Cargar el modelo NSFWJS
    const model = await loadNSFWModel();

    // Clasificar la imagen
    const predictions = await model.classify(img);
    console.log("Predicciones de NSFWJS:", predictions);

    // Liberar la URL de la imagen
    URL.revokeObjectURL(img.src);

    // Considerar la imagen no apta si tiene alta probabilidad de ser 'Porn' o 'Hentai'
    const nsfwScore =
      predictions.find((p) => p.className === "Porn")?.probability || 0;
    const hentaiScore =
      predictions.find((p) => p.className === "Hentai")?.probability || 0;
    return nsfwScore < 0.5 && hentaiScore < 0.5; // Apta si ambos puntajes son bajos
  } catch (e) {
    console.error("Error al moderar la imagen:", e);
    return false; // Por seguridad, asumir que la imagen no es apta si hay un error
  }
}

// Crear una nueva publicación
export const UserPost = async (postData) => {
  const formData = new FormData();
  console.log(postData.content);
  formData.append("content", postData.content || "");
  if (postData.gif) {
    formData.append("gif", postData.gif);
    formData.append("type", "gif");
  }
  if (postData.media) {
    formData.append("media", postData.media);
    formData.append("type", "photo");
  }

  console.log("Datos enviados a /user/post:", Object.fromEntries(formData));

  try {
    /*     const response = await apiClient.post("/user/post", formData);
     */
    const response = await axios.post(
      "http://127.0.0.1:8000/api/user/post",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Respuesta de /user/post:", response.data);
    return response.data;
  } catch (e) {
    console.error("Error en UserPost:", e.response?.data || e);
    throw e; // Propagar el error para manejarlo en Tweet.jsx
  }
};

// Obtener el feed de publicaciones
export const getFeed = async (cursor) => {
  const params = cursor
    ? `per_page=10&after=${encodeURIComponent(cursor)}`
    : `per_page=10`;
  console.log("Solicitando feed con params:", params);
  const response = await apiClient.get(`/feed?${params}`);
  console.log("Respuesta feed:", response.data);
  return response.data;
};

export const likePost = async (postId) => {
  const response = await apiClient.post(`/post/${postId}/like`);
  console.log("Response Interaction:", response.data);
  return response.data;
};
// Obtener publicaciones de un usuario específico
export const getUserPosts = async (username, cursor) => {
  const params = cursor
    ? `per_page=10&after=${encodeURIComponent(cursor)}`
    : `per_page=10`;
  console.log("Solicitando posts de usuario:", username, "con params:", params);
  const response = await apiClient.get(`/user/${username}/posts?${params}`);
  console.log("Respuesta user posts:", response.data);
  return response.data;
};

export { moderateImage };

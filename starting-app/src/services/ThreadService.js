/* // src/services/ThreadService.js
export async function getThreads(filters) {
  const params = new URLSearchParams();
  if (filters.language) params.append('language', filters.language);
  if (filters.category) params.append('category', filters.category);
  const res = await fetch(`/api/threads?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch threads');
  return await res.json();
}

export async function getLanguages() {
  const res = await fetch('/api/languages');
  if (!res.ok) throw new Error('Failed to fetch languages');
  return await res.json();
}

export async function getCategories() {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return await res.json();
}
 */

import { apiClient } from "./ConfigService";

export const getThreads = async (filters = {}, cursor = null, perPage = 10) => {
  try {
    const params = { per_page: perPage };
    if (filters.language) params.id_language = filters.language;
    if (filters.category) params.id_category = filters.category;
    if (cursor) params.cursor = cursor;

    const response = await apiClient.get("/threads", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching threads:", error);  
    throw error;
  }
};

export const getLanguages = async () => {
  try {
    const response = await apiClient.get("/languages");
    return response.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

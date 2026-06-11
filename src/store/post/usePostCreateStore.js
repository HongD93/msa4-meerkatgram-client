import { defineStore } from "pinia";
import myAxios from "../../api/MyAxios";

export const usePostCreateStore = defineStore('postCreate', () => {
  // 1. state

  // 2. getters
  
  // 3. actions
  const createPost = async (postData) => {
    try {
      const url = '/api/posts';

      const res = await myAxios.post(url, postData);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    createPost,
  }
});

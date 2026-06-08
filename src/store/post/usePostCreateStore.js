import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/MyAxios";

export const usePostCreateStore = defineStore('postCreate', () => {
  // 1. state

  // 2. getters
  
  // 3. actions
  const uploadPost = async (formData) => {
    try {
      const url = '/api/posts/create';

      // Content-type 변경
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, formData, config);
      return res.data.data.fileUri;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return {
    uploadPost,
  }
});
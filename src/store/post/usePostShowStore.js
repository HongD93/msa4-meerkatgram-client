import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/MyAxios";

export const usePostShowStore = defineStore('postShowStore', () => {
  // 1. State
  const post = ref();

  // 2. Getters

  // 3. Actions
  const getPost = async (id) => {
    try {
      const url = `/api/posts/${id}`;
      const result = await myAxios.get(url);

      post.value = result.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    post,
    getPost,
  }

});

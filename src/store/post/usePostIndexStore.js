import { defineStore } from "pinia";
import { computed, ref } from "vue";
import myAxios from "../../api/MyAxios";
import { useMyErrorStore } from "../error/useMyErrorStore";

export const usePostIndexStore = defineStore('postIndex', () => {
  // 1. State (ref)
  const items = ref([]);
  const isLastPage = ref(false);
  const currentPage = ref(0);

  // 2. Getters (computed)
  const getNextPageNumber = computed(() => currentPage.value + 1);

  // 3. Actions (function)
  const getPostPagination = async (page = 1) => {
    // 마지막 페이지가 아닐경우만 실행
    if(!isLastPage.value) {
      try {
        const url = '/api/posts';
        const params = {
          page,
        };

        const res= await myAxios.get(url, { params });
        const data = res.data.data
        isLastPage.value = data.lastPage;
        items.value.push(...data.posts);
        
        currentPage.value++;
      } catch (error) {
        // try catch 문에서 throw 하나만 있을때는 try catch문을 지워도 된다
        console.error(error);
        useMyErrorStore().setErrorInfo(error);
      }
    }
  }

  return {
    // state
    items,
    isLastPage,
    
    // getters
    getNextPageNumber,

    // actions
    getPostPagination,
  }
});



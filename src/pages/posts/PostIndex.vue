<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { usePostIndexStore } from '../../store/post/usePostIndexStore.js';

// -----------------------start------------------------------------

// 스토어로 이관
// const posts = ref([]);
// const isLastPage = ref(false);
// let currentPage = 0;


// 함수 
// const getPostPagination = async (page = 1) => {
//   //마지막 페이지가 아닐경우만 실행
//   if(!isLastPage.value) {
//     try {
//       const url = '/api/posts';
//       const params = {
//         page,
//       };

//       const res= await myAxios.get(url, { params });
//       const data = res.data.data
//       isLastPage.value = data.lastPage;
//       posts.value.push(...data.posts);
      
//       currentPage++;
//     } catch (error) {
//       console.error(error);
//   }
//   }
// }
// ----------------------스토어로 이관 end --------------------------

const postIndexStore = usePostIndexStore();

const getNextPage = async () => {
  await postIndexStore.getPostPagination(postIndexStore.getNextPageNumber);
}

//라이프 사이클
onBeforeMount(postIndexStore.getPostPagination);

</script>

<template>
<div class="card-container">     
  <div 
  class="card"
  v-for="item in postIndexStore.items"
  :key="item.id"
  :style="{backgroundImage: `url(${item.image})`}"
  ></div>
</div>
<MyButton
  v-if="!postIndexStore.isLastPage"
  :color="'gray'"
  :size="'big'"
  :content="'Show more posts from Kanna_Kaumui'"
  @click="getNextPage()"
/>
</template>

<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
  
.card {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>

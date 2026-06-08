<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';

const router = useRouter();

const postContent = ref(''); 
const preview = ref(null);   
const selectedFile = ref(null); 

const handleSubmit = async () => {
  if (!postContent.value) {
    alert('내용을 작성해주세요.');
    return;
  }

  try {
    // TODO: 실제 게시글 저장 API 호출 로직을 여기에 작성하세요.
    // 예: await postStore.createPost({ content: postContent.value, image: selectedFile.value });
    
    alert("게시글이 작성되었습니다.");
    router.replace('/posts');
  } catch (error) {
    console.error(error);
    alert('게시글 작성 중 오류가 발생했습니다.');
  }
}

// 이미지 파일 첨부 및 미리보기 함수
const handleChangeImage = (e) => {
  const file = e.target.files[0];

  if (file) {
    if (preview.value) {
      // 기존에 생성된 메모리 URL이 있다면 해제 (메모리 누수 방지)
      URL.revokeObjectURL(preview.value);
    }

    selectedFile.value = file;
    // 파일 객체를 브라우저에서 접근 가능한 임시 URL로 변환하여 미리보기 제공
    preview.value = URL.createObjectURL(file);
  }
}
</script>

<template>
<form @submit.prevent="handleSubmit">
  <textarea
    :placeholder="'내용 작성'"
    :readonly="false"
    :required="true"
    class="postInput"
    v-model="postContent"
  ></textarea>

  <div 
    class="preview"
    v-if="preview"
    :style="{backgroundImage: `url(${preview})`}"
  ></div>
  
  <input 
    type="file" 
    accept="image/*"
    @change="handleChangeImage"  
  >

  <MyButton
    :btn-type="'submit'"
    :color="'black'"
    :size="'middle'"
    :content="'Write'"
  ></MyButton>
  
</form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.postInput {
  width: 90%;
  min-height: 200px;
  padding: 10px;
  resize: none;
  border-radius: 5px;
  box-sizing: border-box;
}

.preview {
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
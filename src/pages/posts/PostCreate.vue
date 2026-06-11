<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MyButton from '../../components/button/MyButton.vue';
import { usePostCreateStore } from '../../store/post/usePostCreateStore';
import { useFileStore } from '../../store/file/useFileStore';

const router = useRouter();
const postCreateStore = usePostCreateStore();
const fileStore = useFileStore();

const postContent = ref(''); 
const preview = ref(null);   
const selectedFile = ref(null); 
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (isSubmitting.value) {
    return;
  }

  if (!postContent.value) {
    alert('내용을 작성해주세요.');
    return;
  }

  if (!selectedFile.value) {
    alert('이미지를 선택해주세요.');
    return;
  }

  try {
    isSubmitting.value = true;
    const imageUrl = await fileStore.uploadPostImage(selectedFile.value);

    if (!imageUrl) {
      alert('이미지 업로드에 실패했습니다.');
      isSubmitting.value = false;
      return;
    }

    const postData = {
      content: postContent.value,
      image: imageUrl
    };

    const res = await postCreateStore.createPost(postData);
    
    if (res.code === '00') {
      alert("게시글이 작성되었습니다.");
      router.replace(`/posts/${res.data.id}`);
    } else {
      alert(res.message || '게시글 작성에 실패했습니다.');
      isSubmitting.value = false;
    }
  } catch (error) {
    console.error(error);
    alert('게시글 작성 중 오류가 발생했습니다.');
    isSubmitting.value = false;
  }
}

const handleChangeImage = (e) => {
  const file = e.target.files[0];

  if (file) {
    if (preview.value) {
      URL.revokeObjectURL(preview.value);
    }
    selectedFile.value = file;
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
    :color="isSubmitting ? 'gray' : 'black'"
    :size="'middle'"
    :content="isSubmitting ? 'Writing...' : 'Write'"
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

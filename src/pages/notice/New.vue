<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="신규 공지사항 등록">
      <form @submit="submit">
        <h3 class="text-lg font-semibold mb-2">공지사항 등록</h3>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">공지 제목</label>
          <input v-model="noticeInfo.title" type="text" id="branchName" class="input" />
        </div>
        <div class="input-wrap mb-4">
          <label for="name" class="label label-lt">공지 내용 입력</label>
          <div class="editor-wrap">
            <div id="editor"></div>
          </div>
        </div>
        <div class="flex justify-end">
          <router-link :to="{ name: 'notice-list' }" class="btn btn-secondary">취소</router-link>
          <button type="submit" class="btn btn-primary ml-4">등록</button>
        </div>
      </form>
    </CreateForm>
  </SafeArea>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import CreateForm from '@/components/display/CreateForm.vue'
import Quill from 'quill'
import { onMounted, ref } from 'vue'
import { processQuillContent } from '@/utils/index.util'
import type { NoticeCreateInput } from '@/types/service.type'
import { NoticeService } from '@/services/notice.service'

let quill: Quill | null = null
const noticeInfo = ref<NoticeCreateInput>({
  title: '',
  content: '',
})
const noticeSvc = new NoticeService()
onMounted(async () => {
  quill = new Quill('#editor', {
    modules: {
      toolbar: true,
    },
    placeholder: '내용을 입력하세요',
    theme: 'snow',
  })
})

function validateInput() {
  if (!noticeInfo.value.title) {
    alert('제목을 입력하세요')
    return false
  }
  if (!noticeInfo.value.content) {
    alert('내용을 입력하세요')
    return false
  }
  return true
}

async function submit(e: Event) {
  e.preventDefault()
  noticeInfo.value.content = getQuill()
  if (validateInput()) {
    try {
      await noticeSvc.createNotice(noticeInfo.value)
      alert('공지가 생성되었습니다.')
      noticeInfo.value = {
        title: '',
        content: '',
      }
      quill!.setContents([])
    } catch (e) {
      console.error(e.message)
      alert('공지 생성에 실패했습니다.')
    }
  }
}

function getQuill(): string {
  const raw = quill!.getSemanticHTML()
  return processQuillContent(raw)
}
</script>
<style></style>

<template>
  <AppBar />
  <SafeArea>
    <CreateForm title="공지사항 등록">
      <form @submit="submitNotice">
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
import { useRoute } from 'vue-router'

let quill: Quill | null = null
const noticeSvc = new NoticeService()
const route = useRoute()
const props = defineProps<{ id: string }>()
const noticeInfo = ref<NoticeCreateInput>({
  title: '',
  content: '',
})
const isUpdate = ref(false)
onMounted(async () => {
  quill = new Quill('#editor', {
    modules: {
      toolbar: true,
    },
    placeholder: '내용을 입력하세요',
    theme: 'snow',
  })
  if (route.name === 'notice-update') {
    isUpdate.value = true
    const noticeId = Number(props.id)
    const notice = await noticeSvc.getNotice(noticeId)
    noticeInfo.value = {
      title: notice.title,
      content: notice.content,
    }
    quill.root.innerHTML = notice.content
  }
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

async function submitNotice(e: Event) {
  e.preventDefault()
  noticeInfo.value.content = getQuill()
  if (!validateInput()) return
  if (isUpdate.value) {
    await updateNotice()
  } else {
    await createNotice()
  }
}

async function createNotice() {
  try {
    await noticeSvc.createNotice(noticeInfo.value)
    alert('공지가 생성되었습니다.')
    noticeInfo.value = {
      title: '',
      content: '',
    }
    quill!.setContents([])
  } catch (e: any) {
    console.error(e.message)
    alert('공지 생성에 실패했습니다.')
  }
}

async function updateNotice() {
  try {
    const noticeId = Number(props.id)
    await noticeSvc.updateNotice(noticeId, noticeInfo.value)
    alert('공지가 수정되었습니다.')
  } catch (e: any) {
    console.error(e.message)
    alert('공지 수정에 실패했습니다.')
  }
}

function getQuill(): string {
  const raw = quill!.getSemanticHTML()
  return processQuillContent(raw)
}
</script>
<style></style>

<script setup lang="ts">
import { computed, ref, toRaw } from 'vue'
import { useConfirmDialog, useMobile } from '@/lib/composables'
import { Dialog, Input, FormField } from '@/lib/components'
import { cloneMaybeReactive } from '@/lib/utils'
import type { Book } from '@/entities/book'
import { useBookForm } from '../composables/useBookForm'
import { IconAddBook } from '@/lib/icons'

const { opened, open: _open, cancel, confirm } = useConfirmDialog<Book, null>()
const { book, original, reset, invalid, validator, hasChanges } = useBookForm()

const isEdit = ref(false)
const isMobile = useMobile()

function open(editBook: Book | null = null) {
  reset()
  if (editBook != null) {
    Object.assign(book, cloneMaybeReactive(editBook))
    Object.assign(original, cloneMaybeReactive(editBook))
  }

  isEdit.value = !!editBook
  return _open()
}

const modalTitle = computed(() => (isEdit.value ? 'Редактирование' : 'Добавить книгу'))
const modalDescription = computed(() =>
  isEdit.value ? 'Внесите изменение в карточке' : 'Заполните все поля и добавьте книгу в список',
)

const buttonSaveTitle = computed(() => (isEdit.value ? 'Сохранить' : 'Добавить'))

function save() {
  return confirm(structuredClone(toRaw(book)))
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog
    :title="modalTitle"
    :description="modalDescription"
    class="book-create-modal"
    :fullscreen="isMobile"
    :visible="opened"
    @close="cancel"
  >
    <template #default>
      <div class="form">
        <FormField title="Название" :error="validator.name.$error">
          <Input
            v-model="book.name"
            :error="validator.name.$error"
            placeholder="Название произведения"
          />
          <template #description>
            <span v-for="err in validator.name.$errors" :key="err.$uid">{{ err.$message }}</span>
          </template>
        </FormField>
        <FormField title="Автор" :error="validator.author.$error">
          <Input
            v-model="book.author"
            :error="validator.author.$error"
            placeholder="Имя и фамилия автора"
          />
          <template #description>
            <span v-for="err in validator.author.$errors" :key="err.$uid">{{ err.$message }}</span>
          </template>
        </FormField>
        <FormField title="Год" :error="validator.year.$error">
          <Input v-model="book.year" :error="validator.year.$error" placeholder="Год выпуска" />
          <template #description>
            <span v-for="err in validator.year.$errors" :key="err.$uid">{{ err.$message }}</span>
          </template>
        </FormField>
        <FormField title="Жанр">
          <Input v-model="book.genre" placeholder="Добавьте жанр произведения" />
        </FormField>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button primary save-button"
        :disabled="invalid || !hasChanges"
        @click="save"
      >
        <IconAddBook v-if="!isEdit" />
        {{ buttonSaveTitle }}
      </button>
    </template>
  </Dialog>
</template>

<style>
.book-create-modal {
  width: 460px;
}
</style>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.book-create-modal {
  .form {
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;

    .form-field {
      display: flex;
      flex-flow: column nowrap;
      gap: 4px;

      .title {
        color: rgba(15, 23, 42, 1);
        font-size: 14px;
        line-height: 1.5;
        font-weight: 600;
      }
    }
  }

  .save-button {
    @include large-mobile() {
      width: 100%;
    }
  }
}
</style>

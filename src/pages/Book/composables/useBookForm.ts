import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, maxValue, required } from '@vuelidate/validators'
import { bookFactory, type Book } from '@/entities/book'

const requiredValidator = () => helpers.withMessage('Поле обязательное для заполнения', required)

const rules = {
  name: {
    required: requiredValidator(),
  },
  year: {
    required: requiredValidator(),
    greaterNow: helpers.withMessage(
      'Год не может быть больше текущего',
      maxValue(new Date().getFullYear()),
    ),
  },
  author: {
    required: requiredValidator(),
  },
}

export function useBookForm() {
  const book = reactive<Book>(bookFactory())
  const original = reactive<Book>(bookFactory())

  const hasChanges = computed(() => {
    const checkFields = ['genre', 'name', 'year', 'author']
    for (const field of checkFields) {
      const curr = book[field]
      const orig = original[field]

      if (!Object.is(curr, orig)) {
        return true
      }
    }

    return false
  })

  const validator = useVuelidate(rules, book, {
    $stopPropagation: true,
    $autoDirty: true,
  })

  function reset() {
    Object.assign(book, bookFactory())
    Object.assign(original, bookFactory())
  }

  return {
    validator,
    book,
    reset,
    original,
    hasChanges,
    invalid: computed(() => validator.value.$invalid),
  }
}

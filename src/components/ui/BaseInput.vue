<!-- Componente input de tipo texto -->
<template>
  <v-text-field
    :label="label"
    :type="type"
    :placeholder="placeholder"
    :rules="rules"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :variant="variant"
    @update:modelValue="updateValue"
    clearable
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { PropType } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  rules: {
    type: Array as PropType<Array<(v: string) => boolean | string | number>>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<'underlined' | 'outlined' | 'filled' | 'plain' | undefined>,
    default: 'outlined',
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>

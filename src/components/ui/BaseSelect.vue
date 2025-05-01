<!-- src/components/ui/BaseSelect.vue -->
<template>
  <v-select
    :model-value="modelValue"
    @update:modelValue="updateValue"
    :label="label"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :rules="rules"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :readonly="readonly"
    clearable
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: [String, Number, Object],
  label: String,
  items: {
    type: Array,
    default: () => [],
  },
  itemTitle: {
    type: String,
    default: 'text',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  rules: Array,
  placeholder: String,
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value: unknown) {
  emit('update:modelValue', value)
}
</script>

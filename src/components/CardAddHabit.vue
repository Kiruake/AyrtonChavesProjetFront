<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  variants: {
    type: Array as () => { icon: string; title: string }[],
    default: () => [
      { icon: '😀', title: 'Musculation' },
      { icon: '🎉', title: 'Fête' },
      { icon: '📚', title: 'Lecture' },
    ],
  },
});

const emit = defineEmits(['add']);

const localVariants = ref([...props.variants]);

const updateIcon = (index: number, event: Event) => {
  const target = event.target as HTMLDivElement;
  localVariants.value[index].icon = target.innerText;
};

const updateTitle = (index: number, event: Event) => {
  const target = event.target as HTMLDivElement;
  localVariants.value[index].title = target.innerText;
};

const onAddClick = (index: number) => {
  emit('add', localVariants.value[index]);
};
</script>

<template>
  <div v-for="(variant, index) in localVariants" :key="index" class="card-AddHabit">
    <div
      class="card-AddHabit__icon"
      contenteditable="true"
      @input="updateIcon(index, $event)"
    >
      {{ variant.icon }}
    </div>
    <div
      class="card-AddHabit__title"
      contenteditable="true"
      @input="updateTitle(index, $event)"
    >
      {{ variant.title }}
    </div>
    <button class="card-AddHabit__button" @click="onAddClick(index)">+</button>
  </div>
</template>

<style lang="scss">

.card-AddHabit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $secondaryColor;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  width: 90%;
  max-width: 400px;
  margin: 10px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &__icon {
      font-size: $fontTextSize;
      margin-right: 10px;
      flex-shrink: 0;
      cursor: text; 
      outline: none;
    }

    &__title {
      flex-grow: 1;
      font-size: $fontTextSize;
      color: $black;
      font-weight: 500;
      margin-left:10px;
      text-align: left;
      font-family: $fontTextFamily;
      cursor: text; 
      overflow: hidden; 
      white-space: nowrap;
      text-overflow: ellipsis;
      outline: none; 
    }

    &__button {
      font-size: $fontTextSize; 
      color: $secondaryColor;
      background-color: $primaryColor;
      border: none;
      border-radius: 50%;
      width: 22px;
      height: 22px; 
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

}

</style>

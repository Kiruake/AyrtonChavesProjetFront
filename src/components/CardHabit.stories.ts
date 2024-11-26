import CardHabit from './CardHabit.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/CardHabit',
  component: CardHabit,
  argTypes: {
    variants: { control: 'object' },
    onAdd: { action: 'add' },
  },
};

const Template = (args: any) => ({
  components: { CardHabit },
  setup() {
    return { args, onAdd: action('add') };
  },
  template: `
    <CardHabit v-bind="args" @add="onAdd" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  variants: [
    { icon: '😀', title: 'Musculation' },
    { icon: '🎉', title: 'Fête' },
    { icon: '📚', title: 'Lecture' },
  ],
};

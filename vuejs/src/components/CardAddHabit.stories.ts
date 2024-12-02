import type { Meta, StoryObj } from '@storybook/vue3';
import CardAddHabit from './CardAddHabit.vue';

const meta: Meta<typeof CardAddHabit> = {
  title: 'Components/CardAddHabit',
  component: CardAddHabit,
  argTypes: {
    variant: {
      control: { type: 'object' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof CardAddHabit>;

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { CardAddHabit },
    setup() {
      return { args };
    },
    template: `<CardAddHabit v-bind="args" />`,
  }),
};

// Stories
export const Default: Story = {
  ...storyOptions,
  args: {
    variant: { icon: '💪🏾', title: 'Musculation' },
  },
};

export const Running: Story = {
  ...storyOptions,
  args: {
    variant: { icon: '🏃🏾', title: 'Course à pieds' },
  },
};

export const Yoga: Story = {
  ...storyOptions,
  args: {
    variant: { icon: '🧘🏻', title: 'Yoga' },
  },
};

export const Custom: Story = {
  ...storyOptions,
  args: {
    variant: { icon: '✨', title: 'Votre habitude personnalisée' },
  },
};

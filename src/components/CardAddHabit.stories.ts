import type { Meta, StoryObj } from '@storybook/vue3'
import CardAddHabit from './CardAddHabit.vue'

const meta: Meta<typeof CardAddHabit> = {
  title: 'Components/CardAddHabit',
  component: CardAddHabit,
  argTypes: {
    variants: {
      control: { type: 'object' },
    },
    onAdd: { action: 'add' },
  },
}

export default meta

type Story = StoryObj<typeof CardAddHabit>

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { CardAddHabit },
    setup() {
      return { args }
    },
    template: `<CardAddHabit v-bind="args" @add="args.onAdd" />`,
  }),
}

export const Default: Story = {
  ...storyOptions,
  args: {
    variants: [
      { icon: '😀', title: 'Musculation' },
      { icon: '🎉', title: 'Fête' },
      { icon: '📚', title: 'Lecture' },
    ],
  },
}

export const CustomVariants: Story = {
  ...storyOptions,
  args: {
    variants: [
      { icon: '🍕', title: 'Cuisine' },
      { icon: '🏀', title: 'Sport' },
    ],
  },
}

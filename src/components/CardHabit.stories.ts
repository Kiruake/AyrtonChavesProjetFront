import type { Meta, StoryObj } from '@storybook/vue3'
import CardHabit from './CardHabit.vue'

const meta: Meta<typeof CardHabit> = {
  title: 'Components/CardHabit',
  component: CardHabit,
  argTypes: {
    variants: {
      control: { type: 'object' },
    },
    onAdd: { action: 'add' },
  },
}

export default meta

type Story = StoryObj<typeof CardHabit>

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { CardHabit },
    setup() {
      return { args }
    },
    template: `<CardHabit v-bind="args" @add="args.onAdd" />`,
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

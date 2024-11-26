import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'outline'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}
export default meta

type Story = StoryObj<typeof Button>

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `<Button v-bind="args" />`,
  }),
}

export const Primary: Story = {
  ...storyOptions,
  args: {
    label: 'Button',
  },
}

export const DisabledPrimary: Story = {
  ...storyOptions,
  args: {
    label: 'Submit',
    variant: 'primary',
    disabled: true,
  },
}

export const Outline: Story = {
  ...storyOptions,
  args: {
    label: 'Connexion',
    variant: 'outline',
  },
}

export const OutlineDisabled: Story = {
  ...storyOptions,
  args: {
    label: 'Submit',
    variant: 'outline',
    disabled: true,
  },
}
import type { Meta, StoryObj } from '@storybook/vue3';
import Form from './Form.vue';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    showTitle: {
      control: { type: 'boolean' },
      description: 'Afficher ou non le titre du formulaire',
      defaultValue: true,
    },
    usernamePlaceholder: {
      control: 'text',
      description: 'Placeholder du champ Nom d’utilisateur',
      defaultValue: 'Nom d’utilisateur',
    },
    passwordPlaceholder: {
      control: 'text',
      description: 'Placeholder du champ Mot de passe',
      defaultValue: 'Mot de passe',
    },
    title: {
      control: 'text',
      description: 'Titre du formulaire',
      defaultValue: 'Connexion',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Form>;

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { Form },
    setup() {
      return { args };
    },
    template: `
      <Form 
        v-bind="args" 
      />
    `,
  }),
};

// Définitions des stories avec différentes configurations
export const Default: Story = {
  ...storyOptions,
  args: {
    showTitle: true,
    usernamePlaceholder: 'Nom d’utilisateur',
    passwordPlaceholder: 'Mot de passe',
    title: 'Connexion',
  },
};

export const WithoutTitle: Story = {
  ...storyOptions,
  args: {
    showTitle: false,
    usernamePlaceholder: 'Nom d’utilisateur',
    passwordPlaceholder: 'Mot de passe',
  },
};

export const CustomPlaceholders: Story = {
  ...storyOptions,
  args: {
    showTitle: true,
    usernamePlaceholder: 'Entrez votre email',
    passwordPlaceholder: 'Entrez votre mot de passe',
  },
};

export const SignUpView: Story = {
  ...storyOptions,
  args: {
    showTitle: true,
    usernamePlaceholder: 'Créez un nom d’utilisateur',
    passwordPlaceholder: 'Choisissez un mot de passe',
    title: 'Inscription',
  },
};

export const LoginView: Story = {
  ...storyOptions,
  args: {
    showTitle: true,
    usernamePlaceholder: 'Nom d’utilisateur',
    passwordPlaceholder: 'Mot de passe',
    title: 'Connexion',
  },
};

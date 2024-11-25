<script lang="ts" setup>
defineProps<{
    disabled?: boolean;
    variant?: "primary" | "outline" ;
}>();

</script>

<template>
    <button :class="{
        'button': true,
        '-outline': variant === 'outline',
        '-disabled': disabled
    }">
        <slot></slot>
    </button>
</template>

<style lang="scss">
.button {
    background: $primaryColor;
    color: $gray800;
    font-family: $fontTextFamily;
    font-weight: 700px;
    padding: rem(8px) rem(36px);
    border-radius: rem(12px);
    border: 1px solid $primaryColor;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background: $primaryDarkColor;
    }

    &.-outline {
        background: transparent;
        color: $primaryColor;

        &:hover {
            color: $primaryDarkColor;
            border-color: $primaryDarkColor;
        }

        &.-disabled {
            background: transparent;
            color: $gray400;
            border-color: $gray100;
        }
    }

    &.-disabled {
        background: $gray100;
        border-color: $gray100;
        color: $gray400;
        cursor: not-allowed;
    }

    &.-connexion {
       margin-top: 60px;
    }

    &.-small {
        padding: rem(8px) rem(16px);
    }
}
</style>
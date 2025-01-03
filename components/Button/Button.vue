<script lang="ts" setup>
defineProps<{
    disabled?: boolean;
    variant?: "primary" | "outline" | "orange";
    label?: string
    active?: boolean
    number?: number
}>();

</script>

<template>
    <button
:class="{
        'button': true,
        '-outline': variant === 'outline',
        '-orange': variant === 'orange',
        '-disabled': disabled,
        '-active': active
    }">
        {{label}}
        {{ number }}
    </button>
</template>

<style lang="scss">
.button {
    background: $primaryColor;
    color: $gray800;
    font-family: $fontTextFamily;
    font-weight: 700;
    padding: rem(8px) rem(36px);
    border-radius: rem(12px);
    border: 1px solid $primaryColor;
    text-decoration: none;
    cursor: pointer;


    &.-center {
       margin: auto;
       display:flex;

       &:hover {
            background-color: transparent;
            color: $primaryColor;
        }
    }
    &.-orange {
    background: orange;
    color: $primaryColor;

    &:hover {
        background-color: $primaryColor;
        color: white;
    }

    
    &.-outline {
        background: transparent;
        color: $primaryColor;

        &:hover {
            background-color: $primaryColor;
            color: $black;
        }


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

    &.-active {
        background-color: orange;
        color: white;
    }

    &.-connexion {
       margin-top: 60px;
    }

    &.-small {
        padding: rem(8px) rem(16px);
        background: orange;
        color : $primaryColor;

        &:hover {
            background-color: $primaryColor;
        color: white;
        }

        &.-blog {
            position: relative;
            top: -60px;
        }

        &.-blogslug{
            position: relative;
            margin-bottom: 1rem;
        }
    }
}
</style>
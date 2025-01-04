<script lang="ts" setup>
defineProps<{
    variant?: "primary" | "green" | "red" | "$secondaryColor";
    label?: string

}>();

</script>

<template>
    <button
:class="{
        'button': true,
        '-green': variant === 'green',
        '-red': variant === 'red',
        '-orange': variant === '$secondaryColor',
        '-primary': variant === 'primary'
    }">
        {{label}}
    </button>
</template>

<style lang="scss">

.button {
        color: $white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

    
    &.-primary {
        background-color: #007bff;;
        color: $white;
        border: 1px solid ;


        &:hover {
            background-color: $primaryColor;
            color: $white;
        }

    }


    &.-green {
        background-color: green;
        color: $white;

        &:hover {
            background-color: rgb(6, 101, 6);
        }

    }

    &.-red {
        background-color: red;
        color: $white;

        &:hover {
            background-color: rgb(201, 7, 7);
        }

    }

    &.-orange {
        background-color: $secondaryColor;
        color: $white;

        &:hover {
            background-color:rgb(239, 180, 68);
        }

    }


}
</style>
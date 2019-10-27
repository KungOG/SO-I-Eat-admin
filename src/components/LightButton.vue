<template>
    <button class="admin-btn">{{buttonText}}</button>   
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss">
    .admin-btn {
        border: 1px solid white;
        border-radius: 5px;
        color: white;
        background: none;
        font-size: 16px; 
        width: 65px;
        height: 30px;
        margin: 0 1rem;
    }
</style>
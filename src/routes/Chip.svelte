<script lang="ts">
    export let action: () => void = () => {};
    export let primary: boolean = false;
</script>

<button on:click={action} class:primary={primary}>
    <slot></slot>
</button>

<style>
    button {
        display: flex;
        padding: 0px 6px;
        justify-content: center;
        align-items: center;
        gap: 4px;

        border-radius: 6px;
        background: #363636;

        color: #a0a0a0;
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;

        cursor: pointer;
        outline: none;
        border: none;
    }

    button.primary {
        background: #a0a0a0;
        color: #202020;
    }
</style>
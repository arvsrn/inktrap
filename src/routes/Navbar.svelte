<script lang="ts">
    import Chip from "./Chip.svelte";
    import Dropdown from "./Dropdown.svelte";
    import DropdownButton from "./DropdownButton.svelte";

    export let zoom: number = 1.0;
    export let pixelPreview: boolean = false;
</script>

<main>
    <div class="left"></div>
    <div class="center">
        <p>
            <span>Inktrap /</span>
            Inktrap Sans 2.0
        </p>
    </div>
    <div class="right">
        <button on:click={() => pixelPreview = !pixelPreview}>
            Pixel Preview
            <Chip>{pixelPreview ? 'On' : 'Off'}</Chip>
        </button>
        <button>Share</button>
        <button on:dblclick={() => zoom = 1} on:wheel|preventDefault={e => zoom = Math.max(Math.min((zoom + e.deltaY * -zoom/1000), 256), 0.25)}>
            {Math.ceil(zoom * 100)}%
        </button>
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: 40px;

        display: flex;
        flex-direction: row;

        border-bottom: 1px solid #333;
    }

    div {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    div.center {
        justify-content: center;
    }

    div.left {
        justify-content: flex-start;
    }

    div.right {
        justify-content: flex-end;
    }

    button {
        display: flex;
        padding: 0px 12px;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        align-self: stretch;

        border: none;
        border-left: 1px solid #333;

        color: #FFF;
        font-family: Inter;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 145.455% */

        background: transparent;
        outline: none;
        cursor: pointer;

        position: relative;
    }

    button:hover {
        background: #262626;
    }

    p, span {
        color: #EDEDED;
        font-family: Inter;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 145.455% */
    }

    span {
        color: #a0a0a0;
    }
</style>
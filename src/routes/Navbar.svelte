<script lang="ts">
    import Chip from "./Chip.svelte";
    import Dropdown from "./Dropdown.svelte";
    import DropdownButton from "./DropdownButton.svelte";

    export let zoom: number = 1.0;
    export let pixelPreview: boolean = false;
</script>

<main>
    <div class="left">
        <button class="square">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 11.5L11.916 11.2226L11 11.5H11.5ZM11.5 28.5H11V29H11.5V28.5ZM17.5 20.5L17.084 20.7774L17.2324 21H17.5V20.5ZM22.9994 20.5V21H23.8909L23.4261 20.2393L22.9994 20.5ZM17.5 11.5V11H16.6085L17.0733 11.7607L17.5 11.5ZM28.5 11.5H29V11H28.5V11.5ZM28.5 28.5V29H29V28.5H28.5ZM11 11.5V28.5H12V11.5H11ZM11.084 11.7774L17.084 20.7774L17.916 20.2226L11.916 11.2226L11.084 11.7774ZM17.5 21H22.9994V20H17.5V21ZM23.4261 20.2393L17.9267 11.2393L17.0733 11.7607L22.5727 20.7607L23.4261 20.2393ZM17.5 12H28.5V11H17.5V12ZM28 11.5V28.5H29V11.5H28ZM28.5 28H11.5V29H28.5V28Z" fill="currentColor"/>
            </svg>                
        </button>
        <button class="square">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0694 26.5L14.3867 13.5L25.613 20.2865L20.2119 21.7523L17.0694 26.5Z" stroke="currentColor" stroke-opacity="0.8" stroke-linecap="square"/>
            </svg>                
        </button>
        <button class="square">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12.5" y="12.5" width="15" height="15" stroke="currentColor" stroke-opacity="0.8" stroke-linecap="square"/>
            </svg>                
        </button>
        <button class="square">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_291_50737" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M27 13H13V22.2929L16.6464 18.6464L17 18.2929L17.3536 18.6464L25.3536 26.6464L25.7071 27H27V13ZM13 27V23.7071L13.3536 23.3536L17 19.7071L24.2929 27H13ZM13 12H12V13V27V28H13H27H28V27V13V12H27H13ZM25 18.5C25 19.3284 24.3284 20 23.5 20C22.6716 20 22 19.3284 22 18.5C22 17.6716 22.6716 17 23.5 17C24.3284 17 25 17.6716 25 18.5ZM26 18.5C26 19.8807 24.8807 21 23.5 21C22.1193 21 21 19.8807 21 18.5C21 17.1193 22.1193 16 23.5 16C24.8807 16 26 17.1193 26 18.5Z"/>
                </mask>
                <path d="M13 13V12H12V13H13ZM27 13H28V12H27V13ZM13 22.2929H12V24.7071L13.7071 23L13 22.2929ZM16.6464 18.6464L17.3536 19.3536V19.3536L16.6464 18.6464ZM17 18.2929L17.7071 17.5858L17 16.8787L16.2929 17.5858L17 18.2929ZM17.3536 18.6464L16.6464 19.3536L17.3536 18.6464ZM25.3536 26.6464L26.0607 25.9393L26.0607 25.9393L25.3536 26.6464ZM25.7071 27L25 27.7071L25.2929 28H25.7071V27ZM27 27V28H28V27H27ZM13 23.7071L12.2929 23L12 23.2929V23.7071H13ZM13 27H12V28H13V27ZM13.3536 23.3536L14.0607 24.0607L14.0607 24.0607L13.3536 23.3536ZM17 19.7071L17.7071 19L17 18.2929L16.2929 19L17 19.7071ZM24.2929 27V28H26.7071L25 26.2929L24.2929 27ZM12 12V11H11V12H12ZM12 28H11V29H12V28ZM28 28V29H29V28H28ZM28 12H29V11H28V12ZM13 14H27V12H13V14ZM14 22.2929V13H12V22.2929H14ZM15.9393 17.9393L12.2929 21.5858L13.7071 23L17.3536 19.3536L15.9393 17.9393ZM16.2929 17.5858L15.9393 17.9393L17.3536 19.3536L17.7071 19L16.2929 17.5858ZM18.0607 17.9393L17.7071 17.5858L16.2929 19L16.6464 19.3536L18.0607 17.9393ZM26.0607 25.9393L18.0607 17.9393L16.6464 19.3536L24.6464 27.3536L26.0607 25.9393ZM26.4142 26.2929L26.0607 25.9393L24.6464 27.3536L25 27.7071L26.4142 26.2929ZM27 26H25.7071V28H27V26ZM26 13V27H28V13H26ZM12 23.7071V27H14V23.7071H12ZM12.6464 22.6464L12.2929 23L13.7071 24.4142L14.0607 24.0607L12.6464 22.6464ZM16.2929 19L12.6464 22.6464L14.0607 24.0607L17.7071 20.4142L16.2929 19ZM25 26.2929L17.7071 19L16.2929 20.4142L23.5858 27.7071L25 26.2929ZM13 28H24.2929V26H13V28ZM12 13H13V11H12V13ZM13 13V12H11V13H13ZM13 27V13H11V27H13ZM13 28V27H11V28H13ZM13 27H12V29H13V27ZM27 27H13V29H27V27ZM28 27H27V29H28V27ZM27 27V28H29V27H27ZM27 13V27H29V13H27ZM27 12V13H29V12H27ZM27 13H28V11H27V13ZM13 13H27V11H13V13ZM23.5 21C24.8807 21 26 19.8807 26 18.5H24C24 18.7761 23.7761 19 23.5 19V21ZM21 18.5C21 19.8807 22.1193 21 23.5 21V19C23.2239 19 23 18.7761 23 18.5H21ZM23.5 16C22.1193 16 21 17.1193 21 18.5H23C23 18.2239 23.2239 18 23.5 18V16ZM26 18.5C26 17.1193 24.8807 16 23.5 16V18C23.7761 18 24 18.2239 24 18.5H26ZM23.5 22C25.433 22 27 20.433 27 18.5H25C25 19.3284 24.3284 20 23.5 20V22ZM20 18.5C20 20.433 21.567 22 23.5 22V20C22.6716 20 22 19.3284 22 18.5H20ZM23.5 15C21.567 15 20 16.567 20 18.5H22C22 17.6716 22.6716 17 23.5 17V15ZM27 18.5C27 16.567 25.433 15 23.5 15V17C24.3284 17 25 17.6716 25 18.5H27Z" fill="currentColor" fill-opacity="0.8" mask="url(#path-1-inside-1_291_50737)"/>
            </svg>    
        </button>
    </div>
    <div class="center">
        <p><span>Inktrap /&nbsp;</span></p>
        <Chip primary>Inktrap Sans 2.0</Chip>
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
        height: 48px;
        flex: none;

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
        padding: 0px 16px;
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

    /* this is only used in the left div, so border is on the right */
    button.square {
        height: 100%;
        aspect-ratio: 1/1;
        border-left: 1px solid transparent;
        border-right: 1px solid #333;
        
        align-items: center;
        justify-content: center;

        color: #ededed;
    }

    button > svg {
        flex: none;
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
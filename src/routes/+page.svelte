<script lang="ts">
    import { onMount } from "svelte";
    import { CanvasRenderer } from "../render";
    import Navbar from "./Navbar.svelte";

    let canvas: HTMLCanvasElement;
    let canvasRenderer: CanvasRenderer;
    let mounted: boolean = false;

    let pixelPreview: boolean = false;
    let zoom: number = 1.0;

    onMount(() => {
        canvasRenderer = new CanvasRenderer(canvas);
        mounted = true;
    });

    const draw = () => {
        if (mounted) {
            canvasRenderer.scale = zoom;
            canvasRenderer.pixelPreview = pixelPreview;
            canvasRenderer.draw();
        }
    }

    $: zoom, draw();
    $: pixelPreview, draw();
</script>

<main>
    <Navbar bind:zoom={zoom} bind:pixelPreview={pixelPreview}></Navbar>
    <canvas bind:this={canvas} on:contextmenu|preventDefault={() => {}}></canvas>
</main>

<svelte:window on:wheel|preventDefault={() => {}} />

<style>
    main {
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
    }

    canvas {
        border-radius: 12px;

        width: 100vw;
        height: calc(100vh - 40px);
    }
</style>
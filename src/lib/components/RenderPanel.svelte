<script lang="ts">

    import { separatorPositionRightPx, SEPARATOR_WIDTH } from "$lib/components/Separator.svelte";
    import { onMount } from "svelte";

    import * as GW from "$lib/scripts/space"

    let self: HTMLElement;
    let canvas: HTMLCanvasElement;

    function init(): void {
        if (canvas == undefined) {
            console.error("Canvas not found.");
            return;
        }

        GW.initSpace(canvas);
        resizeCanvasToFit();

        window.addEventListener('resize', resizeCanvasToFit);
        separatorPositionRightPx.subscribe(resizeCanvasToFit);
    }

    function resizeCanvasToFit(): void {
        if (self === undefined) return;

        GW.resize(self.clientWidth, self.clientHeight);

    }

    onMount(init);

</script>

<main
    bind:this={self}
>

    <canvas bind:this={canvas}></canvas>
    
</main>

<style>

    main {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;

        overflow: hidden;
    }

    canvas {
        background-color: black;
    }

</style>

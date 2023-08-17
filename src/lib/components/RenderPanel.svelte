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

        resizeCanvasToFit();
        GW.initSpace(canvas);
    }

    function resizeCanvasToFit(): void {
        if (canvas === undefined || self === undefined) return;

        canvas.width = self.clientWidth;
        canvas.height = self.clientHeight;

    }

    separatorPositionRightPx.subscribe(resizeCanvasToFit);

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
    }

    canvas {
        background-color: black;
    }

</style>

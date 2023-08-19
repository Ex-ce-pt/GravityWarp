<script lang="ts">

    import { separatorPositionRightPx } from "$lib/components/Separator.svelte";
    import { onMount } from "svelte";

    import * as GW from "$lib/scripts/space"

    type DragData = { startMousePos: { x: number, y: number }, startWorldPos: { x: number, y: number } };

    let self: HTMLElement;
    let canvas: HTMLCanvasElement;

    let zoom: number = 1;
    let dragData: DragData;

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

    // TODO: zoom with easing
    // TODO: zoom label
    function mouseWheel(e: WheelEvent) {
        // console.log(e.deltaY);
        zoom = Math.min(Math.max(zoom - e.deltaY / 1000, GW.MIN_ZOOM), GW.MAX_ZOOM);
        GW.setZoom(zoom);
    }

    function mouseDown(e: MouseEvent) {
        if (e.button === 0) {
            
            
        } else if (e.button === 2) {
            
            e.preventDefault();
            startDrag(e);

        }
    }

    function startDrag(e: MouseEvent) {
        const camPos = GW.getCameraPos();
        dragData = {
            startMousePos: {
                x: e.clientX,
                y: e.clientY
            },
            startWorldPos: {
                x: camPos.x,
                y: camPos.y
            }
        };

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        document.body.style.cursor = 'move';
        
        drag(e);
    }
    
    // TODO: add "center" button
    function drag(e: MouseEvent) {
        const offsetMouse = {
            x: e.clientX - dragData.startMousePos.x,
            y: e.clientY - dragData.startMousePos.y
        };

        const newWorldPos = {
            x: -(dragData.startWorldPos.x + offsetMouse.x / zoom),
            y: dragData.startWorldPos.y + offsetMouse.y / zoom
        };

        GW.setCameraPos(newWorldPos);
    }
    
    function endDrag(e: MouseEvent) {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.body.style.cursor = 'initial';
    }

    onMount(init);

</script>

<main
    bind:this={self}
    on:mousedown={mouseDown}
    on:mousewheel={mouseWheel}
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

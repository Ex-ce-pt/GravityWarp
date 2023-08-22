<script lang="ts">

    import { separatorPositionRightPx } from "$lib/components/Separator.svelte";
    import { onMount } from "svelte";

    import * as GW from "$lib/scripts/space"

    type Point = { x: number, y: number };
    type DragData = { startMousePos: Point, startWorldPos: Point };

    let self: HTMLElement;
    let canvas: HTMLCanvasElement;

    let zoom: number = 1;
    let dragData: DragData;
    let mousePos: Point = { x: 0, y: 0 };

    // Doesn't account for camera rotation!
    function canvasCoordinateToCameraWorldPos(canvasCoord: Point): Point {
        if (GW.getCamera() === undefined) {
            console.error("Couldn't get the camera.");
            return { x: 0, y: 0 };
        }
        const cam = GW.getCamera()!;

        // NOTE: cam.left and cam.bottom are negative!
        // three.js bottom is browser top
        canvasCoord.y = canvas.height - canvasCoord.y; 

        const canvasRelativeCoord = {
            x: canvasCoord.x / canvas.width,
            y: canvasCoord.y / canvas.height,
        };

        const cameraRelativeCenter = {
            x: (-cam.left) / ((-cam.left) + cam.right),
            y: (-cam.bottom) / ((-cam.bottom) + cam.top)
        };

        let cameraWorldPosOffset = { x: 0, y : 0 };

        if (canvasRelativeCoord.x <= cameraRelativeCenter.x) { // "left" side
            const leftRelativeCanvasX = 1 - (canvasRelativeCoord.x / cameraRelativeCenter.x);
            cameraWorldPosOffset.x = cam.left * leftRelativeCanvasX;
        } else { // "right" side
            const rightRelativeCanvasX = (canvasRelativeCoord.x - cameraRelativeCenter.x) / (1 - cameraRelativeCenter.x);
            cameraWorldPosOffset.x = cam.right * rightRelativeCanvasX;
        }

        if (canvasRelativeCoord.y <= cameraRelativeCenter.y) { // "bottom" side
            const leftRelativeCanvasY = 1 - (canvasRelativeCoord.y / cameraRelativeCenter.y);
            cameraWorldPosOffset.y = cam.bottom * leftRelativeCanvasY;
        } else { // "top" side
            const rightRelativeCanvasY = (canvasRelativeCoord.y - cameraRelativeCenter.y) / (1 - cameraRelativeCenter.y);
            cameraWorldPosOffset.y = cam.top * rightRelativeCanvasY;
        }

        return {
            x: cam.position.x + cameraWorldPosOffset.x,
            y: cam.position.y + cameraWorldPosOffset.y
        };
    }

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
        if (!self) return;

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
            
            GW.createObject();
            
        } else if (e.button === 2) {
            
            startDrag(e);

        }
    }

    function startDrag(e: MouseEvent) {
        if (GW.getCamera() === undefined) return;

        const camPos = GW.getCamera()!.position;
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
    
    // TODO: add "center view" button
    function drag(e: MouseEvent) {
        if (GW.getCamera() === undefined) return;

        const offsetMouse = {
            x: e.clientX - dragData.startMousePos.x,
            y: e.clientY - dragData.startMousePos.y
        };

        const newWorldPos = {
            x: dragData.startWorldPos.x - offsetMouse.x / zoom,
            y: dragData.startWorldPos.y + offsetMouse.y / zoom
        };

        GW.getCamera()!.position.setX(newWorldPos.x);
        GW.getCamera()!.position.setY(newWorldPos.y);
    }
    
    function endDrag(e: MouseEvent) {
        drag(e);

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.body.style.cursor = 'initial';
    }

    function updateMousePos(e: MouseEvent) {
        if (GW.getCamera() === undefined) return;

        mousePos = canvasCoordinateToCameraWorldPos({ x: e.offsetX, y: e.offsetY });
    }

    function center() {
        if (GW.getCamera() === undefined) return;

        GW.getCamera()!.position.setX(0);
        GW.getCamera()!.position.setY(0);
    }

    onMount(init);

</script>

<main bind:this={self} >

    <canvas
        bind:this={canvas}
        on:contextmenu={(e) => { e.preventDefault(); }}
        on:mousedown={mouseDown}
        on:mousemove={updateMousePos}
        on:mousewheel={mouseWheel}
    ></canvas>

    <div>

        <span>
            x:
            {Math.round(mousePos.x)}
        </span>

        <span>
            y:
            {Math.round(mousePos.y)}
        </span>

        <span>
            zoom:
            {Math.round(zoom * 100)}%
        </span>

        <button on:click={center}>center</button>

    </div>
    
</main>

<style>

    main {
        position: relative;

        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;

        overflow: hidden;
    }

    canvas {
        background-color: black;
    }

    div {
        display: flex;
        align-items: center;
        gap: 1em;
        position: absolute;
        inset: 0 0 0 1em;
        width: fit-content;
        height: fit-content;
        padding: 0.5em 1em 0.5em 1em;
        background-color: var(--dark-gray);
        border: 1px solid var(--light-gray);
        border-top: none;
        color: var(--light-gray);
        border-radius: 0 0 1em 1em;
        font-size: 12pt;
        white-space: nowrap;
        clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
        z-index: 9999;
    }

    div > span {
        font-size: inherit;
    }

    div > button {
        background-color: inherit;
        color: inherit;
        font-size: inherit;

        padding: 2px;
        user-select: none;
        -webkit-user-select: none;
    }

</style>

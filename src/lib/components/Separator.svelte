<script lang="ts" context="module">

    import { writable } from 'svelte/store'
    
    // The generic parameter is not obligatory, but it's better to define it explicitly
    // The offset from the screen's right edge is chosen to keep the inspector window the same size on window resize
    // ISSUE: the range of the value is not restricted
    export const separatorPositionRightPx = writable<number>(500);
    export const SEPARATOR_MIN_POSITION_RIGHT = 200;
    export const SEPARATOR_MAX_POSITION_RIGHT = 1000;
    
    export const SEPARATOR_WIDTH = 10;
        
</script>

<script lang="ts">

    let mouseOffsetOnDragStart: number = 0;

    function startDragging(e: MouseEvent): void {
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDragging);
        document.body.style.cursor = 'ew-resize';

        mouseOffsetOnDragStart = $separatorPositionRightPx - (window.innerWidth - e.clientX);

        drag(e);
    }

    function drag(e: MouseEvent): void {
        separatorPositionRightPx.set(window.innerWidth - e.clientX + mouseOffsetOnDragStart);
    }

    function endDragging(e: MouseEvent): void {
        drag(e);

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDragging);
        document.body.style.cursor = 'initial';
    }

</script>

<main on:mousedown={startDragging}></main>

<style>

    main {
        background-color: black;
        cursor: ew-resize;
    }

</style>

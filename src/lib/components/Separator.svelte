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

</script>

<main>

</main>

<style>

    main {
        background-color: black;
    }

</style>

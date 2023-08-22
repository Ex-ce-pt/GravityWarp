<script lang="ts">

    import { onMount } from "svelte";
    import Header, { HEADER_HEIGHT_PX } from "$lib/components/Header.svelte";
    import RenderPanel from "$lib/components/RenderPanel.svelte";
    import Separator, { separatorPositionRightPx, SEPARATOR_WIDTH } from "$lib/components/Separator.svelte";
    import Inspector from "$lib/components/Inspector.svelte";

    onMount(() => {
        window.addEventListener('resize', () => {
            // Update the whole window
            separatorPositionRightPx.set($separatorPositionRightPx);
        });
    });

</script>

<main
    style="
        --separator-position-right: {$separatorPositionRightPx}px;
        --separator-width: {SEPARATOR_WIDTH}px;
        --header-height: {HEADER_HEIGHT_PX}px;
    "
>

    <Header />

    <RenderPanel />
    
    <Separator />

    <Inspector />

</main>

<style>

    main {
        --render-panel-width: calc(100vw - var(--separator-position-right) - var(--separator-width));

        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: var(--render-panel-width) var(--separator-width) 1fr;
        grid-template-rows: var(--header-height) 1fr;
    }

</style>

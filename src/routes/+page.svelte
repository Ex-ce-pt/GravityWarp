<script lang="ts">

    import Header, { HEADER_HEIGHT_PX } from "$lib/components/Header.svelte";
    import Separator, { separatorPositionRightPx, SEPARATOR_WIDTH } from "$lib/components/Separator.svelte";
    import RenderPanel from "$lib/components/RenderPanel.svelte";

</script>

<main
    style="
        --separator-position-right: {$separatorPositionRightPx}px;
        --separator-width: {SEPARATOR_WIDTH}px;
        --header-height: {HEADER_HEIGHT_PX}px;
    "
>

    <Header />

    <Separator />

    <RenderPanel />

</main>

<style>

    :global(html),
    :global(body) {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
    }

    main {
        --render-panel-width: calc(100% - var(--separator-position-right) - var(--separator-width));

        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: var(--render-panel-width) var(--separator-width) 1fr;
        grid-template-rows: var(--header-height) 1fr;
    }

</style>

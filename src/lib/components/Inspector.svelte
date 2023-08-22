<script lang="ts">
    
    import Toggle from "./settings/Toggle.svelte";


</script>

<main>

    <span class="label">Animate</span>

    <Toggle />

</main>

<style>

    main {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;

        padding: 1em;

        background-color: var(--dark-gray);
    }

    .label {
        color: var(--white);
    }

</style>

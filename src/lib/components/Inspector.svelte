<script lang="ts">
    
    import NumberField from "./settings/NumberField.svelte";
    import Toggle from "./settings/Toggle.svelte";


</script>

<main>

    <div>
        <span class="label">Animate</span>

        <Toggle
            notAvailable={true}
        />
        
    </div>
    
    <div>
        <span class="label">Collision</span>
        
        <Toggle
            notAvailable={true}
        />
        
    </div>

    <div>
        <span class="label">Test</span>

        <NumberField
            label={{ text: "X", side: 'left' }}
        />

        <NumberField
            label={{ text: "Km", side: 'right' }}
            notAvailable={true}
        />

        <NumberField
            label={{ text: "Km", side: 'right' }}
            large={true}
        />

    </div>

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

    div {
        --gap: 1em;

        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1.5fr repeat(4, 1fr);
        column-gap: var(--gap);
        align-items: center;

        height: max-content;
        margin: 1em 0 1em 0;
        /* background-color: blue; */
    }

    .label {
        color: var(--white);
    }

</style>

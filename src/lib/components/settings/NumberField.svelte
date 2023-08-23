<script lang="ts">

    import type { Constrain } from "$lib/scripts/constrain"

    export let notAvailable: boolean = false;
    export let label: { text: string, side: 'left' | 'right' } | undefined = undefined;
    export let constrain: Constrain | undefined = undefined;
    export let large: boolean = false;
    export let hoverText: string = "";

    export let value: number = 0;

    let labelWidth: number = 0;

</script>

<main
    style={large ? 'grid-column-end: span 2;' : ''}
    title={notAvailable ? "This feature is not available at the moment." : hoverText}
    data-not-available={notAvailable}
>

    {#if label !== undefined && label.side === 'left'}

        <span
            class="left-label"
            bind:clientWidth={labelWidth}
        >
            {label.text}
        </span>

    {/if}

    <input
        style="--label-width: {labelWidth}px;"
        type="number"
        min={constrain?.min ?? 0}
        max={constrain?.max ?? 100}
        step={constrain?.step ?? 1}
        disabled={notAvailable}
        bind:value={value}
    />

    {#if label !== undefined && label.side === 'right'}

        <span
            class="right-label"
            bind:clientWidth={labelWidth}
        >
            {label.text}
        </span>

    {/if}

</main>

<style>

    main {
        --label-margin: 4px;

        display: flex;
        align-items: stretch;
        justify-content: center;
        border-bottom: 2px solid var(--gray);
        font-size: 15px;
    }

    main[data-not-available="true"] {
        border-bottom-style: dashed;
    }

    input {
        width: calc(100% - var(--label-width) - var(--label-margin));
        border: none;
        background-color: var(--dark-gray);
        color: var(--gray);
        font-size: inherit;
    }

    input:focus {
        color: white;
    }

    span {
        color: var(--gray);
        font-size: inherit;
        user-select: none;
        -webkit-user-select: none;
    }

    .left-label {
        margin-right: var(--label-margin);
    }

    .right-label {
        margin-left: var(--label-margin);
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

</style>

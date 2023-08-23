<script lang="ts">

    export let notAvailable: boolean = false;
    export let hoverText: string = "";
    
    export let state: boolean = false;

    function toggle() {
        if (notAvailable) return;

        state = !state;
    }

</script>

<button
    class:on={state}
    data-not-available={notAvailable}
    title={notAvailable ? "This feature is not available at the moment." : hoverText}
    on:click={toggle}
>
</button>

<style>

    button {
        --toggle-border: 0.1em;
        --animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

        position: relative;
        width: 2em;
        height: 1em;
        background-color: var(--dark-gray);
        border: var(--toggle-border) solid var(--white);
        border-radius: 0.5em;
        box-sizing: border-box;
        cursor: pointer;

        transition: background-color 0.5s var(--animation-timing-function);
    }

    button[data-not-available="false"]::after {
        content: '';
        display: block;
        position: absolute;
        inset: 0;
        height: 100%;
        aspect-ratio: 1 / 1;
        background-color: var(--gray);
        border-radius: calc((1em - var(--toggle-border) * 1) / 2);

        translate: 0;
        transition: translate 0.5s var(--animation-timing-function);
    }

    button[data-not-available="false"].on {
        background-color: var(--white);
    }

    button[data-not-available="false"].on::after {
        translate: calc(2em - 100% - var(--toggle-border) * 2);
    }

</style>

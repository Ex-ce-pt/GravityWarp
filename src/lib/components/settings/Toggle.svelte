<script lang="ts">

    export let state = false;

    function toggle() {
        state = !state;
    }

</script>

<button
    class:on={state}
    on:click={toggle}
>
</button>

<style>

    button {
        --toggle-border: 0.1em;

        position: relative;
        width: 2em;
        height: 1em;
        background-color: var(--dark-gray);
        border: var(--toggle-border) solid var(--white);
        border-radius: 0.5em;
        box-sizing: border-box;
        cursor: pointer;
    }

    button::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: unset;
        height: 100%;
        aspect-ratio: 1 / 1;
        background-color: var(--gray);
        border-radius: calc((1em - var(--toggle-border) * 1) / 2);
    }

    button.on {
        background-color: var(--white);
    }

    button.on::after {
        left: unset;
        right: 0;
    }

</style>

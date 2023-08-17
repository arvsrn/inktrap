<main>
    <slot></slot>
</main>

<style>
    main {
        width: 180px;
        height: fit-content;

        border-radius: 6px;
        background: #111;

        display: flex;
        flex-direction: column;

        position: absolute;
        right: 20%;
        top: calc(100% + 2px);

        overflow: hidden;
    }
</style>
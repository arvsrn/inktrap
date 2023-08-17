<main>
    <slot></slot>
</main>

<style>
    main {
        height: 28px;
        width: 100%;

        display: flex;
        flex-direction: column;
        padding: 0px 24px;
        justify-content: center;
        align-items: flex-start;

        color: #ededed;
        font-size: 11px;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
    }

    main:hover {
        background: #181818;
    }
</style>
<script lang="ts">
    import type { Reasoning } from "./Models";

    export const reasoning : Reasoning = {
        assumptions: [],
        justifications: [],
        unfinishedWork: [],
        additionalNotes: []
}

</script>
<div>
    {#if reasoning.assumptions.length > 0}
        <h3>Assumptions Made</h3>
        <ul>
            {#each reasoning.assumptions as assumption}
                <li>{assumption}</li>
            {/each}
        </ul>
    {/if}
    {#if reasoning.justifications.length > 0}
        <h3>Justifications</h3>
        <ul>
            {#each reasoning.justifications as justification}
                <li>{justification}</li>
            {/each}
        </ul>
    {/if}
    {#if reasoning.unfinishedWork.length > 0}
        <h3>Unfinished Work</h3>
        <ul>
            {#each reasoning.unfinishedWork as work}
                <li>{work}</li>
            {/each}
        </ul>
    {/if}
    {#if reasoning.additionalNotes.length > 0}
        <h3>Additional Notes</h3>
        <ul>
            {#each reasoning.additionalNotes as note}
                <li>{note}</li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    h3 {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    ul {
        list-style-type: georgian;
        padding-left: 20px;
    }

    li {
        margin-bottom: 0.5rem;
    }
</style>
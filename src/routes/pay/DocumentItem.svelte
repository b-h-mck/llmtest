<script lang="ts">
    import { onMount } from 'svelte';
    import ActionDetails from './ActionDetails.svelte';
    import type { DocumentInfo } from './Models';

    interface Props {
        document: DocumentInfo;
        actionsFromFullProcess: Action[]
    }

    let { document, actionsFromFullProcess }: Props = $props();

    let processingItems : boolean[] = $state(Array(actionsFromFullProcess.length).fill(false));


    function handleEditName(event: Event) {
        const input = event.target as HTMLInputElement;
        document.name = input.value;
    }

    function handleEditContent(event: Event) {
        const textarea = event.target as HTMLTextAreaElement;
        document.content = textarea.value;
    }

    function handleDoAIMagic() {
        // Logic to trigger AI processing
        console.log('Do AI Magic triggered');
    }
</script>

<input type="text"
    value={document.name}
    oninput={(event) => handleEditName(event)}
/>
<textarea
    rows="5"
    cols="50"
    value={document.content}
    oninput={(event) => handleEditContent(event)}
></textarea>
    <section>
        <button onclick={handleDoAIMagic} class="do-ai-magic" class:psychedelic={proc}>
            {isProcessing ? 'Processing...' : 'Do AI Magic!'}
        </button>
    </section>
<!-- {#if llmOutput?.actions.some(action => action.documentId === document.documentId)}
    <h3>Actions:</h3>
    {#each llmOutput.actions as action, actionIndex}
        {#if action.documentId === document.documentId}
            <ActionDetails
                {llmOutput}
                {llmInput}
                {actionIndex} />
        {/if}
    {/each}
{/if} -->
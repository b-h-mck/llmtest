<script lang="ts">
    import ActionDetails from "./ActionDetails.svelte";
    import ChangeDetails from "./ActionDetails.svelte";
    import type { DocumentInfo, EmployeeHours, LLMInput, LLMOutput } from "./Models";
    import UnfinishedWorkDetails from "./UnfinishedWorkDetails.svelte";

     interface Props {
        llmInput: LLMInput;
        llmOutput: LLMOutput | null;
        onEdit: (documentIndex: number, updatedDocument: DocumentInfo) => void;
    }

    let { llmInput, llmOutput, onEdit }: Props = $props();

    function handleEditName(documentIndex: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.trim();

        if (value) {
            onEdit(documentIndex, { ...llmInput.documents[documentIndex], name: value });
        }
    }
    function handleEditContent(documentIndex: number, event: Event) {
        const textarea = event.target as HTMLTextAreaElement;
        const value = textarea.value.trim();

        if (value) {
            onEdit(documentIndex, { ...llmInput.documents[documentIndex], content: value });
        }
    }

</script>
<ul>
    {#each llmInput.documents as document, documentIndex}
        <li>
            <input
                type="text"
                value={document.name}
                oninput={(event) => handleEditName(documentIndex, event)}
            />
            <textarea
                rows="5"
                cols="50"
                value={document.content}
                oninput={(event) => handleEditContent(documentIndex, event)}
            ></textarea>
            {#if llmOutput?.actions.some(action => action.documentId === document.documentId)}
                <h3>Actions:</h3>
                {#each llmOutput.actions as action, actionIndex}
                    {#if action.documentId === document.documentId}
                        <ActionDetails
                            {llmOutput}
                            {llmInput}
                            {actionIndex} />
                    {/if}
                {/each}
            {/if}
            <!-- {#if llmOutput?.changes.some(change => change.sourceDocumentIndex === documentIndex)}
                <h3>Changes:</h3>
                {#each llmOutput.changes as change, changeIndex}
                    {#if change.sourceDocumentIndex === documentIndex}
                        <ChangeDetails
                            {llmOutput}
                            {llmInput}
                            {changeIndex} />
                    {/if}
                {/each}
            {/if}
            {#if llmOutput?.unfinishedWork.some(unfinishedWork => unfinishedWork.sourceDocumentIndex === documentIndex)}
                <h3>Unfinished:</h3>
                {#each llmOutput.unfinishedWork as unfinishedWork, unfinishedWorkIndex}
                    {#if unfinishedWork.sourceDocumentIndex === documentIndex}
                        <UnfinishedWorkDetails
                            {llmOutput}
                            {llmInput}
                            {unfinishedWorkIndex} />
                    {/if}
                {/each}
            {/if} -->
        </li>
    {/each}
</ul>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--gray-light, #999);
        padding: 0.5rem;
    }

    textarea {
        width: 90%;
        margin-bottom: 0.5rem;
    }

    input[type="text"] {
        width: 90%;
        margin-right: 1rem;
    }

    h3 {
        margin: 0.5rem 0;
    }


</style>
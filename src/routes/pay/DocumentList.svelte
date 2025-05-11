<script lang="ts">
    import DeductionDetails from "./DeductionDetails.svelte";
    import type { DocumentInfo, Deduction, EmployeeHours, LLMOutput } from "./Models";

     interface Props {
        documents: DocumentInfo[];
        employeeHours: EmployeeHours[];
        llmOutput: LLMOutput | null;
        onEdit: (documentIndex: number, updatedDocument: DocumentInfo) => void;
    }

    let { documents, employeeHours, llmOutput, onEdit }: Props = $props();

    function handleEditName(documentIndex: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.trim();

        if (value) {
            onEdit(documentIndex, { ...documents[documentIndex], name: value });
        }
    }
    function handleEditContent(documentIndex: number, event: Event) {
        const textarea = event.target as HTMLTextAreaElement;
        const value = textarea.value.trim();

        if (value) {
            onEdit(documentIndex, { ...documents[documentIndex], content: value });
        }
    }

</script>
<ul>
    {#each documents as document, documentIndex}
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
            {#if llmOutput?.deductions.some(deduction => deduction.sourceDocumentIndexes.includes(documentIndex))}
                <h3>Deduced Facts:</h3>
                <ul>
                    {#each llmOutput.deductions as deduction, deductionIndex}
                        {#if deduction.sourceDocumentIndexes.includes(documentIndex)}
                            <DeductionDetails
                                {llmOutput}
                                {employeeHours}
                                {deductionIndex}
                                {documents} />
                        {/if}
                    {/each}
                </ul>
            {/if}
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
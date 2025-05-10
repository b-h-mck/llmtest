<script lang="ts">
    export let documents: string[] = [];
    export let onEdit: (documents: string[]) => void;

</script>
<ul>
    {#each documents as document}
        <li>
            <textarea
                rows="5"
                cols="50"
                value={document}
                on:input={(event) => {
                    const input = event.target as HTMLTextAreaElement;
                    const newDocuments = [...documents];
                    newDocuments[documents.indexOf(document)] = input.value;
                    onEdit(newDocuments);
                }}
            ></textarea>
            <button
                on:click={() => {
                    const newDocuments = documents.filter((doc) => doc !== document);
                    onEdit(newDocuments);
                }}
            >
                Delete
            </button>
        </li>
    {/each}
    <li>
        <textarea
            rows="6"
            cols="50"
            placeholder="Add new document..."
            on:input={(event) => {
                const input = event.target as HTMLTextAreaElement;
                const newDocuments = [...documents, input.value];
                onEdit(newDocuments);
            }}
        ></textarea>
        <button
            on:click={() => {
                const newDocuments = [...documents, ''];
                onEdit(newDocuments);
            }}
        >
            Add
        </button>
    </li>
</ul>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: row;
    }

    textarea {
        width: 100%;
        margin-bottom: 0.5rem;
    }

    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        height: 2em;
        margin-left: 0.5rem;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>
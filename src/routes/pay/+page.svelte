<script lang="ts">
    import { json } from "@sveltejs/kit";
    import CollapsibleSection from "./CollapsibleSection.svelte";
    import DocumentList from "./DocumentList.svelte";
    import EmployeeTimes from "./EmployeeTimes.svelte";
    import { initialDocuments, initialWorkPatterns } from "./InitialData";
    import type { ReasonedPayHoursList } from "./Models";
    import Reasonings from "./ReasoningDisplay.svelte";

    let workPatterns = initialWorkPatterns;
    let documents = initialDocuments;

    let reasonedPayHours: ReasonedPayHoursList | null = null;

    let isProcessing = false;
    let errorMessage: string | null = null;

    function handleEditHours(index: number, day: number, value: number) {
        workPatterns[index].workHours[day] = value;
        workPatterns = [...workPatterns]; // Trigger reactivity
    }

    function handleEditName(index: number, value: string) {
        workPatterns[index].employee = value;
        workPatterns = [...workPatterns]; // Trigger reactivity
    }

    function handleEditDocuments(newDocuments: string[]) {
        documents = newDocuments;
    }

    async function handleDoAIMagic() {
        isProcessing = true; // Set processing state to true
        try {
            // Send the message to the LLM backend
            const response = await fetch('/api/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workPatterns, documents }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Use the error message from the server response
                throw new Error(data.error || `Error: ${response.status} ${response.statusText}`);
            }

            const replyObject = JSON.parse(data.reply);
            
            console.log('Data:', data);
            console.log('Data.reply:', data.reply);
            console.log('replyObject:', replyObject);
            reasonedPayHours = replyObject;
            errorMessage = null; 

        } catch (error: any) {
            // Add the error message to the chat
            errorMessage = error.message || 'An unknown error occurred';
        } finally {
            isProcessing = false; // Reset processing state
        }
    }
</script>

<section>
    <h1>LLM Payroll Test</h1>
    <h2>Employee Work Patterns</h2>
    <EmployeeTimes {workPatterns} onEdit={handleEditHours} editableNames onEditName={handleEditName} />
    <h2>Documents</h2>
    <DocumentList documents={documents} onEdit={handleEditDocuments} />
    <section>
        <button on:click={handleDoAIMagic} class="do-ai-magic" class:psychedelic={isProcessing}>
            {isProcessing ? 'Processing...' : 'Do AI Magic!'}
        </button>
    </section>
    {#if reasonedPayHours}
    <h2>Hours for Pay</h2>
    <EmployeeTimes payHours={reasonedPayHours.hours} onEdit={handleEditHours} />
    <Reasonings reasoning={reasonedPayHours.reasoning} />
    {/if}
    {#if isProcessing}
        <div class="loading-message">Processing...</div>
    {/if}
    {#if errorMessage}
        <div class="error-message">
            <strong>Error:</strong> {errorMessage}
        </div>
    {/if}
</section>

<style>
    .do-ai-magic {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .psychedelic {
        animation: psychedelic-animation 1s infinite;
        background: linear-gradient(45deg, #ff0000, #ff7300, #ffeb00, #47ff00, #00ffee, #2b65ff, #8000ff, #ff0080);
        background-size: 300% 300%;
        color: black;
    }

    @keyframes psychedelic-animation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .error-message {
        color: red;
        font-weight: bold;
        margin-top: 1em;
    }
</style>
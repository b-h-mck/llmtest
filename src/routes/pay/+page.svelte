<script lang="ts">
    import DocumentList from "./DocumentList.svelte";
    import EmployeeTimes from "./EmployeeTimes.svelte";
    import { initialDocuments, initialEmployeeHours } from "./InitialData";
    import type { DocumentInfo, EmployeeHours, LLMInput, LLMOutput } from "./Models";
    import CellDetails from "./CellDetails.svelte";
    import { json } from "@sveltejs/kit";

    let employeeHours : EmployeeHours[] = $state(initialEmployeeHours);
    let documents : DocumentInfo[] = $state(initialDocuments);
    let isProcessing = $state(false);
    let llmOutput : LLMOutput | null = $state(null);
    let errorMessage: string | null = $state(null);
    let selectedCell: { employeeIndex: number; dayOfWeek: number } | null = $state(null);


    async function handleDoAIMagic() {
        isProcessing = true; // Set processing state to true

        const input : LLMInput = {
            employeeHours,
            documents
        };
        try {
            // Send the message to the LLM backend
            const response = await fetch('/api/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            });

            const data = await response.json();

            if (!response.ok) {
                // Use the error message from the server response
                throw new Error(data.error || `Error: ${response.status} ${response.statusText}`);
            }

            const replyObject = JSON.parse(data.reply);
            
            console.log('input:', JSON.parse(JSON.stringify(input)));
            console.log('output:', replyObject);
            llmOutput = replyObject;
            errorMessage = null; 

        } catch (error: any) {
            // Add the error message to the chat
            errorMessage = error.message || 'An unknown error occurred';
        } finally {
            isProcessing = false; // Reset processing state
        }
    }

    function handleEditEmployee(employeeIndex: number, updatedEmployee: EmployeeHours) {
        employeeHours[employeeIndex] = updatedEmployee;
    }

    function handleSelectCell(employeeIndex: number, dayOfWeek: number) {
        selectedCell = { employeeIndex, dayOfWeek };
    }

    function handleEditDocuments(documentIndex: number, updatedDocument: DocumentInfo) {
        documents[documentIndex] = updatedDocument;
    }

</script>

<section>
    <h1>LLM Payroll Test</h1>
    <h2>Employee Hours</h2>
    <div class="hours-and-sidebars">
        <EmployeeTimes {employeeHours} actions={llmOutput?.actions ?? null} onEdit={handleEditEmployee} onSelect={handleSelectCell} />
        <div class="sidebars">
            {#if selectedCell}
                <CellDetails
                    {selectedCell}
                    llmInput={{documents, employeeHours}}
                    {llmOutput} />
            {/if}
            <div>Test 2</div>
        </div>
    </div>
    <h2>Documents</h2>
    <DocumentList llmInput={{documents, employeeHours}} {llmOutput} onEdit={handleEditDocuments} />
    <section>
        <button onclick={handleDoAIMagic} class="do-ai-magic" class:psychedelic={isProcessing}>
            {isProcessing ? 'Processing...' : 'Do AI Magic!'}
        </button>
    </section>
    {#if errorMessage}
        <div class="error-message">
            <strong>Error:</strong> {errorMessage}
        </div>
    {/if}
</section>

<style>
    .hours-and-sidebars {
        display: flex;
        height: 100%; /* Ensure full height */
    }

    .hours-and-sidebars > :first-child {
        height: 100%; /* Full height */
    }

    .hours-and-sidebars > .sidebars {
        display: flex;
        flex-direction: column; /* Stack the divs in a column */
        width: 300px;
    }

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
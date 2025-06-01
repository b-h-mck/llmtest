<script lang="ts">
    import DocumentList from "./DocumentList.svelte";
    import { initialDocuments, initialEmployees } from "./InitialData";
    import EmployeeList from "./EmployeeList.svelte";
    import { createEmployees, type CalculatedHours, type DocumentInfo, type Employee, type LLMOutput } from "./Models";
    import Timesheet from "./Timesheet.svelte";

    let employees : Employee[] = $state(createEmployees(initialEmployees));
    let documents : DocumentInfo[] = $state(initialDocuments);
    let calculatedHours : CalculatedHours[] = $state([]);

    $inspect(employees);

    function onAIMagicOutput(documentIndex: number, output: LLMOutput) {
        calculatedHours = [...calculatedHours, ...output.calculatedHours];
    }

</script>

<section>
    <h1>LLM Payroll Test</h1>
    <h2>Employees</h2>
    <div>
        <EmployeeList bind:employees />
    </div>
    <h2>Documents</h2>
    <div>
        <DocumentList bind:documents {employees} {onAIMagicOutput} />
    </div>
    <h2>Timesheet</h2>
    <div>
        <Timesheet {employees} {calculatedHours} />
    </div>
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

</style>
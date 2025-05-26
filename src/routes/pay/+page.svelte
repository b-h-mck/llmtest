<script lang="ts">
    import DocumentList from "./DocumentList.svelte";
    import EmployeeTimes from "./EmployeeTimes.svelte";
    import { initialDocuments, initialEmployees } from "./InitialData";
    import CellDetails from "./CellDetails.svelte";
    import { json } from "@sveltejs/kit";
    import EmployeeList from "./EmployeeList.svelte";
    import { createEmployees, type DocumentInfo, type Employee } from "./Models";

    let employees : Employee[] = $state(createEmployees(initialEmployees));
    let documents : DocumentInfo[] = $state(initialDocuments);

    $inspect(employees);

</script>

<section>
    <h1>LLM Payroll Test</h1>
    <h2>Employees</h2>
    <div>
        <EmployeeList bind:employees />
    </div>
    <h2>Documents</h2>
    <div>
        <DocumentList bind:documents {employees} onAIMagicOutput={() => {}} />
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
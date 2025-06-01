<script lang="ts">
    import type { CalculatedHours, Employee } from "./Models";

    interface Props {
        employees: Employee[];
        calculatedHours: CalculatedHours[];
    }

    const { employees, calculatedHours }: Props = $props();

    const dayNames = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];
</script>

<div class="timesheet">
    <h2>Timesheet</h2>
    <table>
        <thead>
            <tr>
                <th></th>
                {#each dayNames as day}
                    <th colspan="2">{day}</th>
                {/each}
            </tr>
            <tr>
                <th>Employee</th>
                {#each dayNames as day}
                    <th>W</th>
                    <th>L</th>
                {/each}

            </tr>
        </thead>
        <tbody>
            {#each employees as employee}
                <tr>
                    <td>{employee.name}</td>
                    {#each dayNames as day}
                        {@const dayHours = calculatedHours.filter(h => h.employeeId === employee.employeeId && h.dayOfWeek === day.toLocaleLowerCase())}
                        <td>{dayHours.find(h => h.hoursType === 'workHours')?.hours ?? '-'}</td>
                        <td>{dayHours.find(h => h.hoursType === 'leaveHours')?.hours ?? '-'}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
<style>
    .timesheet {
        margin: 20px;
        font-family: Arial, sans-serif;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    th {
        background-color: #f2f2f2;
    }

    h2 {
        text-align: center;
    }
</style>

<script lang="ts">
    import { createEmployees, type Employee } from "./Models";

    interface Props {
        employees : Employee[];
    }
    let { employees = $bindable([]) }: Props= $props();

    const controlText = employees.sort((a, b) => a.employeeId - b.employeeId).map(emp => emp.name).join('\n');
    const onControlTextChange = (event: Event) => {
        const input = event.target as HTMLTextAreaElement;
        const names = input.value.split('\n').map(name => name.trim()).filter(name => name);
        employees = createEmployees(names);
    };
</script>

<textarea
    rows="20"
    value={controlText}
    oninput={onControlTextChange}
></textarea>

<style>
    textarea {
        width: 100%;
        font-family: monospace;
        font-size: 14px;
        padding: 10px;
        box-sizing: border-box;
    }
</style>
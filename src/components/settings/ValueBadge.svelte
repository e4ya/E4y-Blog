<script lang="ts">
interface Props {
	value: string | number;
	class?: string;
	updating?: boolean;
}

let { value, class: className = "", updating = false }: Props = $props();
</script>

<div class="setting-value-badge {className} {updating ? 'updating' : ''}">
	{value}
</div>

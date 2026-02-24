<script lang="ts">
interface Props {
	title: string;
	class?: string;
}

let { title, class: className = "" }: Props = $props();
</script>

<div class="flex flex-row gap-2 mb-3 items-center justify-between">
	<div class="setting-section-title {className}">
		{title}
	</div>
</div>

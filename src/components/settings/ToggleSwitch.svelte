<script lang="ts">
interface Props {
	checked: boolean;
	onToggle: () => void;
	class?: string;
	ariaLabel?: string;
}

let {
	checked,
	onToggle,
	class: className = "",
	ariaLabel = "Toggle",
}: Props = $props();
</script>

<button
	aria-label={ariaLabel}
	class="toggle-switch {className} {checked ? 'checked' : 'unchecked'}"
	onclick={onToggle}
>
	<span
		class="toggle-switch-knob {checked ? 'checked' : ''}"
	></span>
</button>

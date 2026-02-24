<script lang="ts">
import Icon from "@iconify/svelte";

interface Props {
	value: number;
	min: number;
	max: number;
	step: number;
	defaultValue: number;
	label: string;
	unit?: string;
	onInput: (value: number) => void;
	onReset: () => void;
	disabled?: boolean;
	class?: string;
	ariaLabel?: string;
}

let {
	value,
	min,
	max,
	step,
	defaultValue,
	label,
	unit = "",
	onInput,
	onReset,
	disabled = false,
	class: className = "",
	ariaLabel,
}: Props = $props();

const isDefaultValue = value === defaultValue;

function handleInput(e: Event) {
	const target = e.target as HTMLInputElement;
	onInput(Number(target.value));
}
</script>

<div class="slider-wrapper {className}">
	<div class="flex justify-between text-sm items-center mb-2">
		<div class="flex items-center gap-2">
			<span class="text-neutral-600 dark:text-neutral-400">{label}</span>
			<button
				aria-label="Reset"
				class="setting-reset-btn {isDefaultValue ? 'hidden' : ''}"
				onclick={onReset}
			>
				<div class="text-[var(--btn-content)]">
					<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]" />
				</div>
			</button>
		</div>
		<div class="setting-value-badge">
			{value}{unit}
		</div>
	</div>
	<input
		aria-label={ariaLabel || label}
		type="range"
		{min}
		{max}
		{step}
		value={value}
		oninput={handleInput}
		class="slider-base slider-default"
		{disabled}
	/>
</div>

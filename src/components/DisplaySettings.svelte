<script lang="ts">
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import {
	applyThemeToDocument,
	getDefaultHue,
	getHue,
	getStoredTheme,
	setHue,
	setTheme,
} from "@utils/setting-utils";
import { onMount } from "svelte";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

interface Props {
	class?: string;
}

let { class: className = "" }: Props = $props();

let hue = $state(315);
const defaultHue = 315;
let mode: LIGHT_DARK_MODE = $state(AUTO_MODE);

onMount(() => {
	hue = getHue();
	mode = getStoredTheme();
	const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
	const changeThemeWhenSchemeChanged: Parameters<
		typeof darkModePreference.addEventListener<"change">
	>[1] = (_e) => {
		applyThemeToDocument(mode);
	};
	darkModePreference.addEventListener("change", changeThemeWhenSchemeChanged);
	return () => {
		darkModePreference.removeEventListener(
			"change",
			changeThemeWhenSchemeChanged,
		);
	};
});

function resetHue() {
	hue = 315;
}

$effect(() => {
	if (hue || hue === 0) {
		setHue(hue);
	}
});

function switchTheme(newMode: LIGHT_DARK_MODE) {
	mode = newMode;
	setTheme(newMode);
}

// Background settings
let backgroundEnabled = $state(false);
let backgroundBlur = $state(10);
let backgroundSettingsExpanded = $state(false);

// Card opacity settings
let cardOpacityEnabled = $state(true);
let cardOpacityLight = $state(65);
let cardOpacityDark = $state(85);
let cardOpacityLightPrev = $state(65);
let cardOpacityDarkPrev = $state(85);
let cardOpacitySettingsExpanded = $state(false);

onMount(() => {
	if (typeof localStorage === "undefined") return;
	const storedBgEnabled = localStorage.getItem("background-enabled");
	const storedBgBlur = localStorage.getItem("background-blur");
	if (storedBgEnabled !== null) {
		backgroundEnabled = storedBgEnabled === "true";
	}
	if (storedBgBlur !== null) {
		backgroundBlur = Number.parseInt(storedBgBlur, 10);
	}

	// Load card opacity settings
	const storedCardOpacityEnabled = localStorage.getItem("card-opacity-enabled");
	const storedCardOpacityLight = localStorage.getItem("card-opacity-light");
	const storedCardOpacityDark = localStorage.getItem("card-opacity-dark");
	if (storedCardOpacityEnabled !== null) {
		cardOpacityEnabled = storedCardOpacityEnabled === "true";
	}
	if (storedCardOpacityLight !== null) {
		cardOpacityLight = Number.parseInt(storedCardOpacityLight, 10);
	}
	if (storedCardOpacityDark !== null) {
		cardOpacityDark = Number.parseInt(storedCardOpacityDark, 10);
	}

	applyBackgroundSettings();
	applyCardOpacitySettings();
});

function toggleBackground() {
	backgroundEnabled = !backgroundEnabled;
	localStorage.setItem("background-enabled", String(backgroundEnabled));
	applyBackgroundSettings();
}

function updateBackgroundBlur() {
	localStorage.setItem("background-blur", String(backgroundBlur));
	applyBackgroundSettings();
}

function resetBackgroundBlur() {
	backgroundBlur = 10;
	localStorage.setItem("background-blur", "10");
	applyBackgroundSettings();
}

function toggleCardOpacity() {
	cardOpacityEnabled = !cardOpacityEnabled;
	localStorage.setItem("card-opacity-enabled", String(cardOpacityEnabled));
	if (!cardOpacityEnabled) {
		// 关闭时保存当前值，并设为 100%
		cardOpacityLightPrev = cardOpacityLight;
		cardOpacityDarkPrev = cardOpacityDark;
		cardOpacityLight = 100;
		cardOpacityDark = 100;
		localStorage.setItem("card-opacity-light", "100");
		localStorage.setItem("card-opacity-dark", "100");
	} else {
		// 重新启用时恢复默认值
		cardOpacityLight = 65;
		cardOpacityDark = 85;
		cardOpacityLightPrev = 65;
		cardOpacityDarkPrev = 85;
		localStorage.setItem("card-opacity-light", "65");
		localStorage.setItem("card-opacity-dark", "85");
	}
	applyCardOpacitySettings();
}

function updateCardOpacityLight() {
	localStorage.setItem("card-opacity-light", String(cardOpacityLight));
	applyCardOpacitySettings();
}

function updateCardOpacityDark() {
	localStorage.setItem("card-opacity-dark", String(cardOpacityDark));
	applyCardOpacitySettings();
}

function resetCardOpacity() {
	cardOpacityLight = 65;
	cardOpacityDark = 85;
	localStorage.setItem("card-opacity-light", "65");
	localStorage.setItem("card-opacity-dark", "85");
	applyCardOpacitySettings();
}

function resetCardOpacityLight() {
	cardOpacityLight = 65;
	localStorage.setItem("card-opacity-light", "65");
	applyCardOpacitySettings();
}

function resetCardOpacityDark() {
	cardOpacityDark = 85;
	localStorage.setItem("card-opacity-dark", "85");
	applyCardOpacitySettings();
}

function applyCardOpacitySettings() {
	const html = document.documentElement;
	if (cardOpacityEnabled) {
		html.style.setProperty(
			"--card-opacity-light",
			String(cardOpacityLight / 100),
		);
		html.style.setProperty(
			"--card-opacity-dark",
			String(cardOpacityDark / 100),
		);
	} else {
		html.style.setProperty("--card-opacity-light", "0.65");
		html.style.setProperty("--card-opacity-dark", "0.85");
	}
}

function applyBackgroundSettings() {
	const html = document.documentElement;
	if (backgroundEnabled) {
		html.style.setProperty("--background-blur", `${backgroundBlur}px`);
		html.style.setProperty("--background-display", "block");
	} else {
		html.style.setProperty("--background-display", "none");
	}
}
</script>

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4">
	<!-- Theme Settings Section -->
	<div class="flex flex-row gap-2 mb-3 items-center justify-between">
		<div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
			before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
			before:absolute before:-left-3 before:top-[0.33rem]">
			主题设置
		</div>
	</div>
	
	<div class="card-base p-3 mb-4">
		<!-- Theme Mode -->
		<div class="flex gap-2 mb-4">
			<button aria-label={i18n(I18nKey.lightMode)} class="flex-1 btn-plain scale-animation rounded-lg h-11 active:scale-95"
					class:current-theme-btn={mode === LIGHT_MODE}
					onclick={() => switchTheme(LIGHT_MODE)}>
				<Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.5rem]"></Icon>
			</button>
			<button aria-label={i18n(I18nKey.darkMode)} class="flex-1 btn-plain scale-animation rounded-lg h-11 active:scale-95"
					class:current-theme-btn={mode === DARK_MODE}
					onclick={() => switchTheme(DARK_MODE)}>
				<Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.5rem]"></Icon>
			</button>
			<button aria-label={i18n(I18nKey.systemMode)} class="flex-1 btn-plain scale-animation rounded-lg h-11 active:scale-95"
					class:current-theme-btn={mode === AUTO_MODE}
					onclick={() => switchTheme(AUTO_MODE)}>
				<Icon icon="material-symbols:radio-button-partial-outline" class="text-[1.5rem]"></Icon>
			</button>
		</div>
		
		<!-- Theme Color -->
		<div class="flex flex-row gap-2 mb-3 items-center justify-between pt-2 border-t border-black/10 dark:border-white/15">
			<div class="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
				{i18n(I18nKey.themeColor)}
				<button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md active:scale-90 will-change-transform"
						class:opacity-0={hue === defaultHue} class:pointer-events-none={hue === defaultHue} onclick={resetHue}>
					<div class="text-[var(--btn-content)]">
						<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
					</div>
				</button>
			</div>
			<div class="flex gap-1">
				<div id="hueValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
				font-bold text-sm items-center text-[var(--btn-content)]">
					{hue}
				</div>
			</div>
		</div>
		<div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
			<input aria-label={i18n(I18nKey.themeColor)} type="range" min="0" max="360" bind:value={hue}
				   class="slider" id="colorSlider" step="5" style="width: 100%">
		</div>
	</div>

	<!-- Background Settings Section -->
	<div class="flex flex-row gap-2 mb-3 items-center justify-between">
		<div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
			before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
			before:absolute before:-left-3 before:top-[0.33rem]">
			背景设置
		</div>
	</div>
	
	<div class="card-base p-3 mb-4">
		<div class="flex items-center justify-between py-2">
			<div class="flex items-center gap-2">
				<button aria-label="Toggle Background Settings" class="btn-plain w-6 h-6 rounded-md active:scale-90 transition-transform" onclick={() => backgroundSettingsExpanded = !backgroundSettingsExpanded}>
					<Icon icon="material-symbols:chevron-right" class="text-[1.25rem] transition-transform" style="transform: rotate({backgroundSettingsExpanded ? 90 : 0}deg)"></Icon>
				</button>
				<span class="font-medium text-neutral-700 dark:text-neutral-300">启用背景图片</span>
			</div>
			<button 
				aria-label="Toggle Background"
				class="relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out"
				class:bg-[var(--primary)]={backgroundEnabled}
				class:bg-[var(--btn-regular-bg)]={!backgroundEnabled}
				onclick={(e) => { e.stopPropagation(); toggleBackground(); }}
			>
				<span 
					class="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out"
					class:translate-x-6={backgroundEnabled}
				></span>
			</button>
		</div>
		
		{#if backgroundSettingsExpanded}
		<div class="space-y-2 pt-3">
			<div class="flex justify-between text-sm items-center">
				<div class="flex items-center gap-2">
					<span class="text-neutral-600 dark:text-neutral-400">模糊强度</span>
					<button aria-label="Reset Blur" class="btn-regular w-7 h-7 rounded-md active:scale-90 will-change-transform"
							class:opacity-0={backgroundBlur === 10} class:pointer-events-none={backgroundBlur === 10} onclick={resetBackgroundBlur}>
						<div class="text-[var(--btn-content)]">
							<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
						</div>
					</button>
				</div>
				<div id="blurValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
				font-bold text-sm items-center text-[var(--btn-content)]">
					{backgroundBlur}px
				</div>
			</div>
			<input 
				aria-label="Background Blur"
				type="range" 
				min="0" 
				max="20" 
				bind:value={backgroundBlur}
				oninput={updateBackgroundBlur}
				class="w-full h-2 bg-[var(--btn-regular-bg)] rounded-lg appearance-none cursor-pointer"
				disabled={!backgroundEnabled}
			/>
		</div>
		{/if}
	</div>

	<!-- Card Opacity Settings Section -->
	<div class="flex flex-row gap-2 mb-3 items-center justify-between">
		<div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
			before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
			before:absolute before:-left-3 before:top-[0.33rem]">
			卡片设置
		</div>
	</div>
	
	<div class="card-base p-3 mb-4">
		<div class="flex items-center justify-between py-2">
			<div class="flex items-center gap-2">
				<button aria-label="Toggle Card Opacity Settings" class="btn-plain w-6 h-6 rounded-md active:scale-90 transition-transform" onclick={() => cardOpacitySettingsExpanded = !cardOpacitySettingsExpanded}>
					<Icon icon="material-symbols:chevron-right" class="text-[1.25rem] transition-transform" style="transform: rotate({cardOpacitySettingsExpanded ? 90 : 0}deg)"></Icon>
				</button>
				<span class="font-medium text-neutral-700 dark:text-neutral-300">启用卡片不透明度</span>
			</div>
			<button 
				aria-label="Toggle Card Opacity"
				class="relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out"
				class:bg-[var(--primary)]={cardOpacityEnabled}
				class:bg-[var(--btn-regular-bg)]={!cardOpacityEnabled}
				onclick={(e) => { e.stopPropagation(); toggleCardOpacity(); }}
			>
				<span 
					class="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out"
					class:translate-x-6={cardOpacityEnabled}
				></span>
			</button>
		</div>
		
		{#if cardOpacitySettingsExpanded}
		<div class="space-y-3 pt-3">
			<div class="space-y-2">
				<div class="flex justify-between text-sm items-center">
					<div class="flex items-center gap-2">
						<span class="text-neutral-600 dark:text-neutral-400">亮色模式不透明度</span>
						<button aria-label="Reset Light Opacity" class="btn-regular w-6 h-6 rounded-md active:scale-90 will-change-transform transition-opacity"
								class:opacity-0={cardOpacityLight === 65 || !cardOpacityEnabled} class:pointer-events-none={cardOpacityLight === 65 || !cardOpacityEnabled} onclick={resetCardOpacityLight}>
							<div class="text-[var(--btn-content)]">
								<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.75rem]"></Icon>
							</div>
						</button>
					</div>
					<div class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
					font-bold text-sm items-center text-[var(--btn-content)]">
						{cardOpacityLight}%
					</div>
				</div>
				<input 
					aria-label="Card Opacity Light"
					type="range" 
					min="0" 
					max="100" 
					bind:value={cardOpacityLight}
					oninput={updateCardOpacityLight}
					class="w-full h-2 bg-[var(--btn-regular-bg)] rounded-lg appearance-none cursor-pointer"
					disabled={!cardOpacityEnabled}
				/>
			</div>
			
			<div class="space-y-2">
				<div class="flex justify-between text-sm items-center">
					<div class="flex items-center gap-2">
						<span class="text-neutral-600 dark:text-neutral-400">暗色模式不透明度</span>
						<button aria-label="Reset Dark Opacity" class="btn-regular w-6 h-6 rounded-md active:scale-90 will-change-transform transition-opacity"
								class:opacity-0={cardOpacityDark === 85 || !cardOpacityEnabled} class:pointer-events-none={cardOpacityDark === 85 || !cardOpacityEnabled} onclick={resetCardOpacityDark}>
							<div class="text-[var(--btn-content)]">
								<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.75rem]"></Icon>
							</div>
						</button>
					</div>
					<div class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
					font-bold text-sm items-center text-[var(--btn-content)]">
						{cardOpacityDark}%
					</div>
				</div>
				<input 
					aria-label="Card Opacity Dark"
					type="range" 
					min="0" 
					max="100" 
					bind:value={cardOpacityDark}
					oninput={updateCardOpacityDark}
					class="w-full h-2 bg-[var(--btn-regular-bg)] rounded-lg appearance-none cursor-pointer"
					disabled={!cardOpacityEnabled}
				/>
			</div>
		</div>
		{/if}
	</div>
</div>


<style lang="stylus">
#display-setting
  input[type="range"]
    -webkit-appearance none
    height 1.5rem
    background-image var(--color-selection-bar)
    transition background-image 0.15s ease-in-out

    /* Input Thumb */
    &::-webkit-slider-thumb
      -webkit-appearance none
      height 1rem
      width 0.5rem
      border-radius 0.125rem
      background rgba(255, 255, 255, 0.7)
      box-shadow none
      &:hover
        background rgba(255, 255, 255, 0.8)
      &:active
        background rgba(255, 255, 255, 0.6)

    &::-moz-range-thumb
      -webkit-appearance none
      height 1rem
      width 0.5rem
      border-radius 0.125rem
      border-width 0
      background rgba(255, 255, 255, 0.7)
      box-shadow none
      &:hover
        background rgba(255, 255, 255, 0.8)
      &:active
        background rgba(255, 255, 255, 0.6)

    &::-ms-thumb
      -webkit-appearance none
      height 1rem
      width 0.5rem
      border-radius 0.125rem
      background rgba(255, 255, 255, 0.7)
      box-shadow none
      &:hover
        background rgba(255, 255, 255, 0.8)
      &:active
        background rgba(255, 255, 255, 0.6)

</style>

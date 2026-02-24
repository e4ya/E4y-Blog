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

import SettingSection from "./settings/SettingSection.svelte";
import ToggleSwitch from "./settings/ToggleSwitch.svelte";
import ValueBadge from "./settings/ValueBadge.svelte";

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
	hue = defaultHue;
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

let backgroundEnabled = $state(true);
let backgroundBlur = $state(10);
let backgroundSettingsExpanded = $state(false);

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

function updateBackgroundBlur(value: number) {
	backgroundBlur = value;
	localStorage.setItem("background-blur", String(value));
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
		cardOpacityLightPrev = cardOpacityLight;
		cardOpacityDarkPrev = cardOpacityDark;
		cardOpacityLight = 100;
		cardOpacityDark = 100;
		localStorage.setItem("card-opacity-light", "100");
		localStorage.setItem("card-opacity-dark", "100");
	} else {
		cardOpacityLight = 65;
		cardOpacityDark = 85;
		cardOpacityLightPrev = 65;
		cardOpacityDarkPrev = 85;
		localStorage.setItem("card-opacity-light", "65");
		localStorage.setItem("card-opacity-dark", "85");
	}
	applyCardOpacitySettings();
}

function updateCardOpacityLight(value: number) {
	cardOpacityLight = value;
	localStorage.setItem("card-opacity-light", String(value));
	applyCardOpacitySettings();
}

function updateCardOpacityDark(value: number) {
	cardOpacityDark = value;
	localStorage.setItem("card-opacity-dark", String(value));
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
	html.style.setProperty(
		"--card-opacity-light",
		String(cardOpacityLight / 100),
	);
	html.style.setProperty("--card-opacity-dark", String(cardOpacityDark / 100));
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

<div
	id="display-setting"
	class="float-panel float-panel-closed absolute w-80 max-w-[calc(100vw-2rem)] right-4 px-4 py-4"
>
	<SettingSection title="主题设置" />

	<div class="card-base p-3 mb-4">
		<div class="flex gap-2 mb-4">
			<button
				aria-label={i18n(I18nKey.lightMode)}
				class="flex-1 btn-plain scale-animation rounded-lg h-11 active:scale-95"
				class:current-theme-btn={mode === LIGHT_MODE}
				onclick={() => switchTheme(LIGHT_MODE)}
			>
				<Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.5rem]" />
			</button>
			<button
				aria-label={i18n(I18nKey.darkMode)}
				class="flex-1 btn-plain scale-animation rounded-lg h-11 active:scale-95"
				class:current-theme-btn={mode === DARK_MODE}
				onclick={() => switchTheme(DARK_MODE)}
			>
				<Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.5rem]" />
			</button>
			<button
				aria-label={i18n(I18nKey.systemMode)}
				class="flex-1 btn-plain scale-animation rounded-lg h-11 active:scale-95"
				class:current-theme-btn={mode === AUTO_MODE}
				onclick={() => switchTheme(AUTO_MODE)}
			>
				<Icon icon="material-symbols:radio-button-partial-outline" class="text-[1.5rem]" />
			</button>
		</div>

		<div
			class="flex flex-row gap-2 mb-3 items-center justify-between pt-2 border-t border-black/10 dark:border-white/15"
		>
			<div class="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
				{i18n(I18nKey.themeColor)}
				<button
					aria-label="Reset to Default"
					class="setting-reset-btn {hue === defaultHue ? 'hidden' : ''}"
					onclick={resetHue}
				>
					<div class="text-[var(--btn-content)]">
						<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]" />
					</div>
				</button>
			</div>
			<ValueBadge value={hue} />
		</div>

		<div class="slider-color mb-2">
			<input
				aria-label={i18n(I18nKey.themeColor)}
				type="range"
				min="0"
				max="360"
				bind:value={hue}
				class="slider-base slider-color w-full"
				step="5"
			/>
		</div>
	</div>

	<SettingSection title="背景设置" />

	<div class="card-base p-3 mb-4">
		<div class="flex items-center justify-between py-2">
			<div class="flex items-center gap-2">
				<button
					aria-label="Toggle Background Settings"
					class="btn-plain w-6 h-6 rounded-md active:scale-90 transition-transform"
					onclick={() => (backgroundSettingsExpanded = !backgroundSettingsExpanded)}
				>
					<Icon
						icon="material-symbols:chevron-right"
						class="setting-chevron {backgroundSettingsExpanded ? 'expanded' : ''}"
					/>
				</button>
				<span class="font-medium text-neutral-700 dark:text-neutral-300">启用背景图片</span>
			</div>

			<ToggleSwitch
				checked={backgroundEnabled}
				onToggle={toggleBackground}
				ariaLabel="Toggle Background"
			/>
		</div>

		<div class="setting-expand-wrapper">
			<div class="setting-expand-content {backgroundSettingsExpanded ? 'expanded' : ''}">
				<div class="flex justify-between text-sm items-center mb-2">
					<div class="flex items-center gap-2">
						<span class="text-neutral-600 dark:text-neutral-400">模糊强度</span>
						<button
							aria-label="Reset Blur"
							class="setting-reset-btn {backgroundBlur === 10 ? 'hidden' : ''}"
							onclick={resetBackgroundBlur}
						>
							<div class="text-[var(--btn-content)]">
								<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]" />
							</div>
						</button>
					</div>
					<ValueBadge value="{backgroundBlur}px" />
				</div>
				<input
					aria-label="Background Blur"
					type="range"
					min="0"
					max="20"
					value={backgroundBlur}
					oninput={(e) => updateBackgroundBlur(Number((e.target as HTMLInputElement).value))}
					class="slider-base slider-default"
					disabled={!backgroundEnabled}
				/>
			</div>
		</div>
	</div>

	<SettingSection title="卡片设置" />

	<div class="card-base p-3 mb-4">
		<div class="flex items-center justify-between py-2">
			<div class="flex items-center gap-2">
				<button
					aria-label="Toggle Card Opacity Settings"
					class="btn-plain w-6 h-6 rounded-md active:scale-90 transition-transform"
					onclick={() => (cardOpacitySettingsExpanded = !cardOpacitySettingsExpanded)}
				>
					<Icon
						icon="material-symbols:chevron-right"
						class="setting-chevron {cardOpacitySettingsExpanded ? 'expanded' : ''}"
					/>
				</button>
				<span class="font-medium text-neutral-700 dark:text-neutral-300">启用卡片不透明度</span>
			</div>

			<ToggleSwitch
				checked={cardOpacityEnabled}
				onToggle={toggleCardOpacity}
				ariaLabel="Toggle Card Opacity"
			/>
		</div>

		<div class="setting-expand-wrapper">
			<div class="setting-expand-content {cardOpacitySettingsExpanded ? 'expanded' : ''}">
				<div class="space-y-4">
					<div>
						<div class="flex justify-between text-sm items-center mb-2">
							<div class="flex items-center gap-2">
								<span class="text-neutral-600 dark:text-neutral-400">亮色模式不透明度</span>
								<button
									aria-label="Reset Light Opacity"
									class="setting-reset-btn small {cardOpacityLight === 65 || !cardOpacityEnabled ? 'hidden' : ''}"
									onclick={resetCardOpacityLight}
								>
									<div class="text-[var(--btn-content)]">
										<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.75rem]" />
									</div>
								</button>
							</div>
							<ValueBadge value="{cardOpacityLight}%" />
						</div>
						<input
							aria-label="Card Opacity Light"
							type="range"
							min="0"
							max="100"
							value={cardOpacityLight}
							oninput={(e) =>
								updateCardOpacityLight(Number((e.target as HTMLInputElement).value))}
							class="slider-base slider-default"
							disabled={!cardOpacityEnabled}
						/>
					</div>

					<div>
						<div class="flex justify-between text-sm items-center mb-2">
							<div class="flex items-center gap-2">
								<span class="text-neutral-600 dark:text-neutral-400">暗色模式不透明度</span>
								<button
									aria-label="Reset Dark Opacity"
									class="setting-reset-btn small {cardOpacityDark === 85 || !cardOpacityEnabled ? 'hidden' : ''}"
									onclick={resetCardOpacityDark}
								>
									<div class="text-[var(--btn-content)]">
										<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.75rem]" />
									</div>
								</button>
							</div>
							<ValueBadge value="{cardOpacityDark}%" />
						</div>
						<input
							aria-label="Card Opacity Dark"
							type="range"
							min="0"
							max="100"
							value={cardOpacityDark}
							oninput={(e) =>
								updateCardOpacityDark(Number((e.target as HTMLInputElement).value))}
							class="slider-base slider-default"
							disabled={!cardOpacityEnabled}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

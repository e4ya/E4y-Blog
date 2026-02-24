import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "E4y の Blog",
	subtitle: "Ciallo～(∠・ω< )⌒★",
	lang: "zh_CN",
	themeColor: {
		hue: 315,
		fixed: false,
	},
	banner: {
		enable: false,
		src: "assets/images/banner.png",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	background: {
		enable: true,
		blur: 10,
	},
	favicon: [
		{
			src: "/favicon/头像.png",
			sizes: "32x32",
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png",
	name: "E4y",
	bio: "一个兴趣使然的高中生",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/e4ya",
		},
		{
			name: "Bilibili",
			icon: "simple-icons:bilibili",
			url: "https://space.bilibili.com/565141214",
		},
		{
			name: "QQ 群",
			icon: "fa6-brands:qq",
			url: "https://qm.qq.com/q/hZSA1GYmha",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

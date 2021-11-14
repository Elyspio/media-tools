import { Feature, FeatureOptions } from "../../main/services/projects/types";

export const featureMap: { [key in string]: Feature[] } = {
	"254979456": [
		{
			name: "desktop",
			take: ["src", "config", "test", "package.json", "readme.md", ".gitignore"],
			options: [FeatureOptions.wrap],
		},
	],
	"268172666": [
		{ name: "web-back", take: ["back", ".gitignore"] },
		{
			name: "web-front",
			take: ["front", ".gitignore"],
		},
	],
	"298989283": [{ name: "mobile", take: [], options: [FeatureOptions.wrap] }],
	"311066157": [{ name: "watch", take: [], options: [FeatureOptions.wrap] }],
};

// {id: 254979456, name: "Elyspio/electron-react-ts"}
// {id: 268172666, name: "Elyspio/express-react-ts"}
// {id: 309214334, name: "Elyspio/mobile-watch-react-typescript"}

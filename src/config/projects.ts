import { Feature } from '../main/services/projects/types';

export const featureMap: {[key in string]: Feature[]} = {
    "254979456": ["desktop"],
    "268172666": ["web-back", "web-front"],
    "309214334": ["mobile", "watch"]
}


// {id: 254979456, name: "Elyspio/electron-react-ts"}
// {id: 268172666, name: "Elyspio/express-react-ts"}
// {id: 309214334, name: "Elyspio/mobile-watch-react-typescript"}

/**
 * fill and import variables from "./projects.private.ts" file
 */
export  const githubToken = "";
export const dockerToken = "";

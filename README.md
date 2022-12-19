# Bawk Board

This is the repository for the BunnyBots 2022 scoring system: Bawk Board

Make a data folder, containing an teams.json and matches.json files with: [] in them.

You also need to create a event.json file inside your data foler, containing: {currentMatchID:"qm1"}.

Make a secrests.js file, containing:

    export const origin_url = "";
    export const auth_secret = "[auth_secret]";
    export const tba_secret_id = "";
    export const tba_secret = "";
    export const port="[port]"
    export const backend_url="//localhost:[port]"


Make sure to install all dependencies, then run:

    npm run dev

The frontend is written in Svelte and TypeScript, while the backend is vite and TypeScript.

## Match Control
Match control communication is done via sockets.

## Scoring
When judges count scores for both alliances, the scores for each alliance are stored in a MatchScoreBreakdown data structure.
The match data is commited to the internal database when the commit button is pushed. This is done with a simple socket emission by the frontend.

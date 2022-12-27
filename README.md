# Bawk Board

This is the repository for the BunnyBots 2022 scoring system: BAWK

Bunnybots Automated Webcast Kit

THe same basic infrastructue will be inn place for future BunnyBots competitions, simply reworked for the new game.

Make a data folder, containing an teams.json and matches.json files with: [] in them.

You also need to create a event.json file inside your data foler, containing: {currentMatchID:"qm1"}. This indicates that the first match will be the first qualifying match.

Make a secrests.js file, containing:

    export const origin_url = "";
    export const auth_secret = "[auth_secret]";
    export const tba_secret_id = "";
    export const tba_secret = "";
    export const port="[port]"
    export const backend_url="//localhost:[port]"


Make sure to install all dependencies, then run:

    npm run dev

or 
    
    npm run prod

The frontend is written in Svelte and TypeScript, while the backend is vite and TypeScript.

## Match Control

Match control communication is done via sockets.

## Scoring

When judges count scores for both alliances, the scores for each alliance are stored in a MatchScoreBreakdown data structure.

Svelte is really cool and allows real-time updates of scores as they are being counted.

The match data is commited by whoever is running Match Control, to the internal database when the commit button is pushed. This is done with a simple socket emission by the frontend.

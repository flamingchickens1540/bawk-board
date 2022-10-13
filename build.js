import {buildSync} from "esbuild"

buildSync({
    entryPoints: ["backend/index.ts"],
    outfile: "dist/backend.cjs",
    bundle: true,
    sourcemap: true,
    platform: "node"
})
import {writable} from 'svelte/store'
import {readable} from 'svelte/store'
export let redScore = writable(0);
export let blueScore = writable(0);
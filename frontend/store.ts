import {writable, type Writable} from 'svelte/store'
import {readable} from 'svelte/store'
export const redScore:Writable<number[]> = writable([]);
export const blueScore:Writable<number[]> = writable([]);
export const redAlliance:Writable<string[]> = writable([])
export const blueAlliance:Writable<string[]> = writable([])
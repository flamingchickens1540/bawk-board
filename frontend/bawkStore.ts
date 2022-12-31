import type { MatchData, TeamData } from "common/types";
import type { ClientToServerEvents } from "common/ws_types";
import { derived, get, readable, writable, type Readable, type Writable } from "svelte/store";
import structuredClone from '@ungap/structured-clone';

import { socket } from "./socket";
import { matchID } from "./store";
import isEqual from "lodash.isequal"

export interface BawkReadable<T, I> {
    asReadable:Readable<T>
    /**
     * Sets the value of the store, updates subscribers, does not send the value to the server
     * @param data The value to set the store to. Will be passed into the converter to get the result
     * @returns 
     */
    updateLocal: (data:I) => void

    /**
     * Sets the value of the store, updates subscribers, does not send the value to the server
     * @param data The value to set the store to. Will not be converted
     * @returns 
     */
    updateLocalRaw: (data:T) => void
}

export interface BawkMatchStore<T> extends BawkReadable<T, MatchData>{
    asWritable: () => Writable<T>
}

export interface BawkDataStore<T, I> extends BawkReadable<T, I>{
    asWritable: () => Writable<T>
}

export function dedupe<T>(store: Readable<T>): Readable<T> {
    let previous: T = {} as any
    return derived(store, ($value, set) => {
      if (!isEqual($value, previous)) {
        previous = structuredClone($value) // Avoid copy by reference, otherwise they will always be equal
        set($value)
      }
    })
  }

export function bawkMatchStore<T extends keyof MatchData>(property: T):BawkMatchStore<MatchData[T]> {
    const store = writable(null)
    const readableStore = dedupe(store)
    let ignoreUpdates = false;
    let hasBeenMadeWritable = false;
    return {
        asReadable: readableStore,
        updateLocal: (data) => {
            ignoreUpdates = true
            store.set(data[property])
            ignoreUpdates = false
        },
        updateLocalRaw: (data) => {
            ignoreUpdates = true
            store.set(data)
            ignoreUpdates = false
        },
        asWritable: () => {
            if (!hasBeenMadeWritable) {
                console.debug("SUBSCRIBING", property)
                readableStore.subscribe((value) => {
                    if (!ignoreUpdates && hasBeenMadeWritable && value !== null) {
                        console.debug("SENDING", property)
                        socket.emit("matchData", { 
                            [property]: value,
                            id: get(matchID.asReadable)
                        })
                    }
                })
                hasBeenMadeWritable = true
            } else {
                
            }
            
            return store
        }
    }
}



export function bawkDataStore<T, Input, EmitEvent extends keyof ClientToServerEvents,>(initial:Input, converter:(data:Input) => T, event:EmitEvent, emitCallback:(input:T) => Parameters<ClientToServerEvents[EmitEvent]>):BawkDataStore<T,Input> {
    const store = writable(converter(initial))
    let hasBeenMadeWritable = false;
    let ignoreUpdates = false;
    return {
        asReadable: {
            subscribe:store.subscribe,
        },
        updateLocal: (data) => {
            ignoreUpdates = true
            store.set(converter(data))
            ignoreUpdates = false
        },
        updateLocalRaw: (data) => {
            ignoreUpdates = true
            store.set(data)
            ignoreUpdates = false
        },
        asWritable: () => {
            if (!hasBeenMadeWritable) {
                console.log("SUBSCRIBING", event)
                store.subscribe((value) => {
                    if (!ignoreUpdates && hasBeenMadeWritable && value !== null) {
                        console.log("SENDING", event, value)
                        socket.emit(event, ...emitCallback(value))
                    } else {
                        console.log("IGNORING", event, value)
                    }
                })
                hasBeenMadeWritable = true
            } else {
                
            }
            
            return store
        }

    }
}

// export function makeWritable<T,I,EmitEvent extends keyof ClientToServerEvents>(store:BawkReadable<T,I>,event:EmitEvent, emitCallback:(input:T) => Parameters<ClientToServerEvents[EmitEvent]>):Writable<T> {
//     const socketStore = writableSocketStore(get(store.store), event, emitCallback)
//     return {
//         set: socketStore.set,
//         subscribe:socketStore.subscribe,
//         update: socketStore.update,
//     }
// }


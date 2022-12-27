import { writable, type Readable, type Writable, readable, type Subscriber } from 'svelte/store';

import type { ServerToClientEvents } from '../common/ws_types';

import { socket } from './socket';
import type { ClientToServerEvents } from '../common/ws_types';

type ListenCallback<ListenEvent extends keyof ServerToClientEvents, F> =(input:Parameters<ServerToClientEvents[ListenEvent]>) => F
type EmitCallback<EmitEvent extends keyof ClientToServerEvents, F> = (input:F) => Parameters<ClientToServerEvents[EmitEvent]>

export interface SocketStore<T> extends Readable<T> {
    set: (data:T) => void
}
export function socketStore<ListenEvent extends keyof ServerToClientEvents, EmitEvent extends keyof ClientToServerEvents, InitialEvent extends keyof ClientToServerEvents,F>(
    listenEvent:ListenEvent,   listen_cb:ListenCallback<ListenEvent, F>, 
    emitEvent:EmitEvent,       emit_cb :EmitCallback<EmitEvent, F>, 
    initialEvent:InitialEvent, initialCB:(data) => F):SocketStore<F> {
        
        let store = callbackSocketStore(emitEvent, emit_cb)        
        const initialCallback = [(data) => {
            const formattedData = initialCB(data)
            store.set(formattedData)
        }]
        socket.emit(initialEvent, ...initialCallback as any)
        const listenCallback = (data: Parameters<ServerToClientEvents[ListenEvent]>) => {
            console.debug("RECIEVING", listenEvent.toLocaleUpperCase(), ...data)
            store.setSilent(listen_cb(data))
        }
        socket.on(listenEvent, listenCallback as any)
        return store
    }
    
    export function socketReadableStore<ListenEvent extends keyof ServerToClientEvents,InitialEvent extends keyof ClientToServerEvents,F>(listenEvent:ListenEvent, listen_cb:ListenCallback<ListenEvent, F>, initialEvent:InitialEvent,initialCB:(data) => F):Readable<F> {
        return readable(null, (set) => {
            const initialCallback = [(data) => {
                const formattedData = initialCB(data)
                set(formattedData)
            }]
            socket.emit(initialEvent, ...initialCallback as any)
            const listenCallback = (data: Parameters<ServerToClientEvents[ListenEvent]>) => {
                console.debug("RECIEVING", listenEvent.toLocaleUpperCase(), ...data)
                set(listen_cb(data))
            }
            socket.on(listenEvent, listenCallback as any)
            return () => {
                socket.off(listenEvent, listenCallback as any)
            }
        })
    }
    
    export function callbackSocketStore<T, EmitEvent extends keyof ClientToServerEvents,>(event:EmitEvent, emitCallback:EmitCallback<EmitEvent, T>) {
        let writableStore:Writable<T> = writable(null)
        
        let isBlocking = false;
        
        
        const setSilent = (data:T)=> {
            isBlocking = true;
            writableStore.set(data)
            isBlocking = false;
        }
        writableStore.subscribe((value) => {
            if (!isBlocking) {
                const formattedValue= [emitCallback(value)]
                console.debug("EMITTING", event.toLocaleUpperCase(), ...formattedValue)
                socket.emit(event, ...(formattedValue as any))
            } else {
                console.debug("IGNORING VALUE CHANGE", value)
            }
        })
        return {
            set:writableStore.set,
            setSilent,
            subscribe:writableStore.subscribe,
            update:writableStore.update
        }
    }
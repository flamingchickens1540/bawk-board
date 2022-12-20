import { writable, type Readable, type Writable, readable, type Subscriber } from 'svelte/store';

import type { ServerToClientEvents } from '../common/ws_types';
import { socket } from './socket';
import {Mutex} from "async-mutex"
import type { ClientToServerEvents } from '../common/ws_types';
import { listen } from 'svelte/internal';
type ListenCallback<ListenEvent extends keyof ServerToClientEvents, F> =(input:Parameters<ServerToClientEvents[ListenEvent]>) => F
type EmitCallback<EmitEvent extends keyof ClientToServerEvents, F> = (input:F) => Parameters<ClientToServerEvents[EmitEvent]>
export interface SocketStore<T> extends Readable<T> {
    set: (data:T) => void
}
export function socketStore<ListenEvent extends keyof ServerToClientEvents, EmitEvent extends keyof ClientToServerEvents, InitialEvent extends keyof ClientToServerEvents,F>(
    listenEvent:ListenEvent,   listen_cb:ListenCallback<ListenEvent, F>, 
    emitEvent:EmitEvent,       emit_cb :EmitCallback<EmitEvent, F>, 
    initialEvent:InitialEvent, initialCB:(data) => F):SocketStore<F> {
        let writableStore:Writable<F> = writable(null)
        
        const initialCallback = [(data) => {
            const formattedData = initialCB(data)
            writableStore.set(formattedData)
        }]
        let isBlocking = false;
        socket.emit(initialEvent, ...initialCallback as any)
        const listenCallback = (data: Parameters<ServerToClientEvents[ListenEvent]>) => {
            isBlocking = true;
            console.debug("RECIEVING", listenEvent.toLocaleUpperCase(), ...data)
            writableStore.set(listen_cb(data))
            isBlocking = false;
        }
        socket.on(listenEvent, listenCallback as any)
        writableStore.subscribe((value) => {
            
            if (!isBlocking&&value!= null) {
                
                const formattedValue= [emit_cb(value)]
                console.debug("EMITTING", emitEvent.toLocaleUpperCase(), ...formattedValue)
                socket.emit(emitEvent, ...(formattedValue as any))
            } else {
                console.debug("IGNORING VALUE CHANGE", value)
            }
        })
        return writableStore
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
    
    export function callbackSocketStore<T, InputData, EmitEvent extends keyof ClientToServerEvents,>(event:EmitEvent, emitCallback:EmitCallback<EmitEvent, T>, initialCallback: () => T, dataCallback: (data:InputData) => T) {
        let writableStore:Writable<T> = writable(null)
        
        let isBlocking = false;
        writableStore.set(initialCallback())
        
        const setSilent = (data:InputData)=> {
            isBlocking = true;
            writableStore.set(dataCallback(data))
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
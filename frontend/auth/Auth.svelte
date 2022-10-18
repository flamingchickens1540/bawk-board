<script lang=ts>
    import { getCookie, setCookie } from 'typescript-cookie'
    import {writable} from "svelte/store"

    const key = writable(getCookie("auth"))

    key.subscribe((value) => {setCookie("auth", value)})

</script>
<main>
    <h1>Authorization</h1>
    Auth Key
    <table>
        <tr>
            <input placeholder="Auth Key" type=string bind:value={$key}>
            <button on:click={() => window.location.assign("/")} id=submit class=green>Submit</button>
        </tr>
    </table>
    
</main>

<style>
    input {
        /* width:100%; */
        height:30px;
        border-radius:5px;
        padding:5px 10px;
    }
    button {
        margin:10px;
    }
</style>
<script lang="ts">
  import { MatchState } from "../../../common/types";
    import { calculateScore, getFoulPoints, getHybridScore, getTeleopScore } from "../../../common/calculations";
    import {redScore, blueScore, matches, matchID} from "../../store"
    const defaultData = {
        zones:[],
        autoTubes:0,
        foulPoints:0
    }
</script>

<table cellspacing=0 cellpadding=10px>
    <thead>
        <tr>
            <th>Type</th>
            <th>Red</th>
            <th>Blue</th>
        </tr>
    </thead>
    <tbody>
        <tr></tr>
        <tr>
            <th>Hybrid</th>
            <td>{getHybridScore($redScore ?? defaultData)}</td>
            <td>{getHybridScore($blueScore ?? defaultData)}</td>
        </tr>
        <tr>
            <th>Tubes</th>
            <td>{getTeleopScore($redScore ?? defaultData)}</td>
            <td>{getTeleopScore($blueScore ?? defaultData)}</td>
        </tr>
        <tr>
            <th>Penalty</th>
            <td>{getFoulPoints($redScore ?? defaultData)}</td>
            <td>{getFoulPoints($blueScore ?? defaultData)}</td>
        </tr>
        <tr>
            <th>Total</th>
            <td>{calculateScore($redScore ?? defaultData)}</td>
            <td>{calculateScore($blueScore ?? defaultData)}</td>
        </tr>
    </tbody>
</table>


<style lang="scss">
    tr {
        > *:nth-child(2){
            background-color: hsl(358, 55%, 35%)
        }
        > *:nth-child(3){
            background-color: hsl(206, 55%, 35%)
        }
        > *:nth-child(1){
            background-color: hsl(206, 0%, 35%)
        }
        tbody > &:nth-last-child(1) {
            font-weight:900;
        }
        &:nth-child(odd) {
            filter:brightness(0.85)
        }
        thead > &:nth-child(1) {
            filter:brightness(0.75)
        }
    }
    td, th {
        padding: 15px 30px;
        font-size:25px;
    }
</style>
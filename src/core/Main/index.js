import React, { useEffect, useState } from 'react'
import mainicon from 'assets/mainicon.jpg'
import { generateDeck, getCardsFromDeck } from 'common/cards'
import 'App.css';
import {AddPlayer} from 'common/components'

export function Main (props) {
    const {} = props;
    const [players, setPlayers] = useState({});
    const [gameOn, setGameOn] = useState(false);
    const [activePlayers, setActivePlayers] = useState([]);

    useEffect(() => {
        console.log('activePlayers was updated', activePlayers)
    }, [
        activePlayers
    ])

    const handleNewPlayer = (player) => {
        // add new players to game
        if (players[player.name]) {
            // player already in the game
            return true;
        }
        setPlayers(a => ({...a, [player.name]: player}))
        // set player as active if game is not on and player not yet active
        if (!gameOn && !activePlayers.includes(player.name)) {
            setActivePlayers(a => [...a, player.name])
        }
    }

    const onStartSubmit = (e) => {
        e.preventDefault()
        var deck = generateDeck(7)
    }

    return (
        <div className="mainStyle">
            <img style={{width:"200px", height:"200px"}} src={mainicon}></img>
            <div style={{display:"block"}}>
                <AddPlayer handleNewPlayer={handleNewPlayer} />
                <div>
                    <label>Players in the rooom</label>
                    <ul>
                        {Object.keys(players).map(function (pl) {
                            console.log('pl', pl)
                            var player = players[pl]
                            return <li>{player.name}: {player.wallet}$</li>
                        })}
                    </ul>
                </div>
                <div>
                    <label>Player sitting at the table</label>
                    <ul>
                        {activePlayers.length>0 && activePlayers.map(pl => {
                            return <li>{pl}</li>
                        })}
                    </ul>
                </div>
            </div>
            <form onSubmit={onStartSubmit}>
                <input type="submit" value="Play" />
            </form>
        </div>
    );
}
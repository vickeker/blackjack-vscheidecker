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
    const [deck, setDeck] = useState([])
    const [dealer, setDealer] = useState({})
    const [action, setAction] = useState('')

    const dealCardsToDealer = () => { 
        // deal dealer cards
        let res = getCardsFromDeck(deck, 2)
        setDealer(a => ({...a, cards: res.cards}))
        setDeck(a => a.filter(b => {
            let boo = true
            res.cards.forEach(c => {
                if(c.id==b.id) {
                    boo = false
                }
            })
            return boo
        }))
    }

    const dealCardsToPlayers = () => {
        // deal players
        let ct_player = activePlayers.length
        let res = getCardsFromDeck(deck, ct_player*2)
        activePlayers.forEach((p,i) => {
            let cards = []
            cards.push(res.cards[(i*2)])
            cards.push(res.cards[(i*2)+1])
            console.log('p', p)
            console.log('i',i)
            let player = players[p]
            player.cards = cards
            setPlayers(({...players, [p]:player}))
        })
        setDeck(a => a.filter(b => {
            let boo = true
            res.cards.forEach(c => {
                if(c.id==b.id) {
                    boo = false
                }
            })
            return boo
        }))
    }

    useEffect(() => {
        // new deck needed
        if (deck.length==0) {
            console.log('new deck')
            var newDeck = generateDeck(7)
            setDeck(a => [...a,...newDeck])
        }

        switch(action) {
            case 'deal':
                if (!dealer.cards) {
                    dealCardsToDealer()
                }

                if (dealer.cards && dealer.cards.length==2) {
                    dealCardsToPlayers()
                    setAction('player')
                }
                break
            
            case 'player':
                break
        }


    }, [
        gameOn,
        deck
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
        setAction('newPlayer')
    }

    const onStartSubmit = (e) => {
        e.preventDefault()
        // init players
        setActivePlayers([])
        Object.keys(players).forEach(pl => {
            let player = players[pl]
            setActivePlayers(a => [...a,player.name])
        })

        // game on
        setAction('deal')
        setGameOn(true)
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
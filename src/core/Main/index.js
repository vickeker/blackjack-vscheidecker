import React, { useEffect, useState } from 'react'
import mainicon from 'assets/mainicon.jpg'
import { generateDeck, getCardsFromDeck, getWinner, isBusted, isBlackjack } from 'common/cards'
import 'App.css';
import {AddPlayer} from 'common/components'
import {PlayerActions} from 'common/components'


export function Main (props) {
    const {} = props;
    const [players, setPlayers] = useState({});
    const [gameOn, setGameOn] = useState(false);
    const [activePlayers, setActivePlayers] = useState([]);
    const [deck, setDeck] = useState([])
    const [dealer, setDealer] = useState({})
    const [action, setAction] = useState('')
    const [actionPlayer, setActionPlayer] = useState(-1)


    const dealCardsToDealer = () => { 
        // deal dealer cards
        let res = getCardsFromDeck(deck, 2)
        setDealer(a => ({...a, cards: res.cards}))
        setDeck(a => a.filter(b => {
            let boo = true
            console.log(res.cards)
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

    const dealCardToActivePlayer = () => {
        // deal players
        let res = getCardsFromDeck(deck, 1)
        let playerName = activePlayers[actionPlayer]
        let player = players[playerName]
        let cards = player.cards
        cards.push(res.cards[0])
        player.cards = cards
        setPlayers(({...players, [playerName]:player}))
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

        if (gameOn) {
            // new deck needed
            if (deck.length==0) {
                console.log('new deck')
                var newDeck = generateDeck(7)
                setDeck(a => [...a,...newDeck])
            } else {

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
                        if(actionPlayer < 0) {
                            setActionPlayer(0)
                        } else {
                            // validate that player can still play (not busted)
                            let player = players[activePlayers[actionPlayer]]
                            if(player && isBusted(player.cards) || isBlackjack(player.cards)) {
                                // next player
                                console.log('next', isBusted(player.cards))
                                nextPlayer()
                            }   
                        }

                        break

                    case 'hands':
                        activePlayers.forEach(p => {
                            let winner = getWinner(dealer.cards, players[p].cards)
                            if (winner == 'player') {
                                // give money to player bet x 2 
                            } else if (winner == 'dealer') {
                                // give money to dealer
                            } else {
                                // no winner get bet back
                            }
                        })
                        setGameOn(false)
                        setAction('')
                        break
                }
            }
        }
    }, [
        gameOn,
        deck,
        actionPlayer
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

    const nextPlayer = () => {
        var nextPlayer = actionPlayer + 1
        if (nextPlayer<activePlayers.length) {
            setActionPlayer(nextPlayer)
        } else {
            // last player
            setAction('hands')
            setActionPlayer(-1)
        }
    }

    const handleOnClickKeep = (e) => {
        e.preventDefault()
        // next player
        nextPlayer()
    }

    const handleOnClickHit = (e) => {
        e.preventDefault()
        // deal new card
        dealCardToActivePlayer()
    }

    const handleOnClickDouble = (e) => {
        e.preventDefault()
        // double bet
        // deal new card
        dealCardToActivePlayer()
        nextPlayer()
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
                <form onSubmit={onStartSubmit}>
                    <input type="submit" value="Play" />
                </form>
                {actionPlayer>=0 && 
                <PlayerActions 
                    handleOnClickHit={handleOnClickHit}
                    handleOnClickKeep={handleOnClickKeep}
                    handleOnClickDouble={handleOnClickDouble}/>
                }
            </div>
        </div>
    );
}
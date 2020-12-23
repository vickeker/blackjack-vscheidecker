const localstorage = localStorage;

const setPlayers = async (players) => {
    var data = JSON.stringify(players);
    await localstorage.setItem('players', data);
    return true;
}

const getPlayers = async () => {
    const players = await localstorage.getItem('players');
    return JSON.parse(players) || {};
}

const getPlayer = async (player) => {
    var players = await getPlayers()
    if (players[player] == undefined) {
        // player doesnt exist: init player
        const newPlayer = {
            name: player,
            wallet: 1000,
            win: 0
        }
        players = {
            ...players,
            [player]: newPlayer
        }
        // save new set of players
        setPlayers(players)
    } 
    return players[player];
}


export { setPlayers, getPlayers, getPlayer }
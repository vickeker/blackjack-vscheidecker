
// generate deck of decks.
// a integer is the number of decks used
const generateDeck = (a) => {
    var deck = []
    const suits = ['diamond','heart','clover','spade'];
    var id = 0
    for(let i=0; i<a;i++) {
        for(let j=0;j<4;j++) {
            let s = suits[j]
            for(let k=0;k<13;k++) {
                let v = 0
                if (k == 0) {
                    v = 11
                } else if (k < 10) {
                    v = k+1
                } else {
                    v = 10
                }
                id = id+1
                deck.push({id: id, suit: s,value: v, img: s+' ('+(k+1)+').jpg'})
            }
        }
    }
    deck = shuffleArray(deck)
    return deck
}

// select cards from deck
// deck array is the deck to get the card from
// a integer is the number of card to select
const getCardsFromDeck = (deck, a) => {
    var cards = []
    for(let i=0;i<a;i++) {
        let card = deck.shift()
        cards.push(card)
    }
    return {cards, deck}
}

// shuffle deck
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

// calculate hands (hand1 = dealer)
const getWinner = (hand1, hand2) => {
    if(isBlackjack(hand1) || isBlackjack(hand2) && isBlackjack(hand1)==isBlackjack(hand2) ) {
        return false
    } else if (isBlackjack(hand1)) {
        return 'dealer'
    } else if (isBlackjack(hand2)) {
        return 'player'
    } else {
        var value1 = 0 
        hand1.forEach(c => value1 = value1 + c.value)
        var value2 = 0 
        hand2.forEach(c => value2 = value2 + c.value)
        if(value2<=21  && (value1>21 || value1<value2)) {
            return 'player'
        } else if (value1<=21  && (value2>21 || value2<value1)) {
            return 'dealer'
        } else if (value1==value1) {
            return false
        } else {
            return 'dealer'
        }
    }
}


const isBlackjack = (hand) => {
    return hand.length==2 && hand[0].value+hand[1].value==21
}

const isBusted = (hand) => {
    var value = 0
    hand.forEach(c => value = value + c.value)
    return value>21
}

export { generateDeck, getCardsFromDeck, getWinner, isBlackjack, isBusted }
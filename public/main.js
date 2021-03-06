let textArea = document.getElementById('text-area')
let newGameButton = document.getElementById('new-game-button')
let hitButton = document.getElementById('hit-button')
let stayButton = document.getElementById('stay-button')

hitButton.style.display = 'none'
stayButton.style.display = 'none'

let gameStart = false,
  gameOver = false,
  playWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  playerStays = false,
  deck = []

newGameButton.addEventListener('click', function() {
  var list = document.getElementById('playerDiv')
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)
  }
  gameStarted = true
  gameOver = false
  playerWon = false
  playerStays = false

  deck = createDeck()
  deck = shuffleDeck(deck)
  dealerCards = [getNextCard(), getNextCard()]
  show_image('dealerDiv', '/images/backofcard.png')
  show_image('dealerDiv', '/images/backofcard.png')
  playerCards = [getNextCard(), getNextCard()]
  show_image('playerDiv', '/images/' + playerCards[0][4])
  show_image('playerDiv', '/images/' + playerCards[1][4])

  newGameButton.style.display = 'none'
  hitButton.style.display = 'inline'
  stayButton.style.display = 'inline'
  checkScore()
  showStatus()
})

function createDeck() {
  deckOfCards = [
    [1, 'Clubs', 'Ten', 10, '10_of_clubs.svg'],
    [2, 'Diamonds', 'Ten', 10, '10_of_diamonds.svg'],
    [3, 'Hearts', 'Ten', 10, '10_of_hearts.svg'],
    [4, 'Spades', 'Ten', 10, '10_of_spades.svg'],
    [5, 'Clubs', 'Two', 2, '2_of_clubs.svg'],
    [6, 'Diamonds', 'Two', 2, '2_of_diamonds.svg'],
    [7, 'Hearts', 'Two', 2, '2_of_hearts.svg'],
    [8, 'Spades', 'Two', 2, '2_of_spades.svg'],
    [9, 'Clubs', 'Three', 3, '3_of_clubs.svg'],
    [10, 'Diamonds', 'Three', 3, '3_of_diamonds.svg'],
    [11, 'Hearts', 'Three', 3, '3_of_hearts.svg'],
    [12, 'Spades', 'Three', 3, '3_of_spades.svg'],
    [13, 'Clubs', 'Four', 4, '4_of_clubs.svg'],
    [14, 'Diamonds', 'Four', 4, '4_of_diamonds.svg'],
    [15, 'Hearts', 'Four', 4, '4_of_hearts.svg'],
    [16, 'Spades', 'Four', 4, '4_of_spades.svg'],
    [17, 'Clubs', 'Five', 5, '5_of_clubs.svg'],
    [18, 'Diamonds', 'Five', 5, '5_of_diamonds.svg'],
    [19, 'Hearts', 'Five', 5, '5_of_hearts.svg'],
    [20, 'Spades', 'Five', 5, '5_of_spades.svg'],
    [21, 'Clubs', 'Six', 6, '6_of_clubs.svg'],
    [22, 'Diamonds', 'Six', 6, '6_of_diamonds.svg'],
    [23, 'Hearts', 'Six', 6, '6_of_hearts.svg'],
    [24, 'Spades', 'Six', 6, '6_of_spades.svg'],
    [25, 'Clubs', 'Seven', 7, '7_of_clubs.svg'],
    [26, 'Diamonds', 'Seven', 7, '7_of_diamonds.svg'],
    [27, 'Hearts', 'Seven', 7, '7_of_hearts.svg'],
    [28, 'Spades', 'Seven', 7, '7_of_spades.svg'],
    [29, 'Clubs', 'Eight', 8, '8_of_clubs.svg'],
    [30, 'Diamonds', 'Eight', 8, '8_of_diamonds.svg'],
    [31, 'Hearts', 'Eight', 8, '8_of_hearts.svg'],
    [32, 'Spades', 'Eight', 8, '8_of_spades.svg'],
    [33, 'Clubs', 'Nine', 9, '9_of_clubs.svg'],
    [34, 'Diamonds', 'Nine', 9, '9_of_diamonds.svg'],
    [35, 'Hearts', 'Nine', 9, '9_of_hearts.svg'],
    [36, 'Spades', 'Nine', 9, '9_of_spades.svg'],
    [37, 'Clubs', 'Ace', 11, 'ace_of_clubs.svg'],
    [38, 'Diamonds', 'Ace', 11, 'ace_of_diamonds.svg'],
    [39, 'Hearts', 'Ace', 11, 'ace_of_hearts.svg'],
    [40, 'Spades', 'Ace', 11, 'ace_of_spades.svg'],
    [41, 'Clubs', 'Jack', 10, 'jack_of_clubs.svg'],
    [42, 'Diamonds', 'Jack', 10, 'jack_of_diamonds.svg'],
    [43, 'Hearts', 'Jack', 10, 'jack_of_hearts.svg'],
    [44, 'Spades', 'Jack', 10, 'jack_of_spades.svg'],
    [45, 'Clubs', 'King', 10, 'king_of_clubs.svg'],
    [46, 'Diamonds', 'King', 10, 'king_of_diamonds.svg'],
    [47, 'Hearts', 'King', 10, 'king_of_hearts.svg'],
    [48, 'Spades', 'King', 10, 'king_of_spades.svg'],
    [49, 'Clubs', 'Queen', 10, 'queen_of_clubs.svg'],
    [50, 'Diamonds', 'Queen', 10, 'queen_of_diamonds.svg'],
    [51, 'Hearts', 'Queen', 10, 'queen_of_hearts.svg'],
    [52, 'Spades', 'Queen', 10, 'queen_of_spades.svg']
  ]

  return deckOfCards
}
function shuffleDeck(deck) {
  let myDeck = []
  for (i = 0; i < 52; i++) {
    let random = Math.floor(Math.random() * (deck.length - 0)) + 0
    tmpArray = deck[random]
    myDeck.push(tmpArray)
    deck.splice(random, 1)
  }
  return myDeck
}

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard())
  let nextCardImg = '/images/' + playerCards[playerCards.length - 1][4]
  show_image('playerDiv', nextCardImg)
  checkScore()
  showStatus()
})

stayButton.addEventListener('click', function() {
  playerStays = true
  while (dealerScore < 18 && dealerScore !== playerScore) {
    dealerCards.push(getNextCard())
    console.log(dealerScore)
    checkScore()
    if (dealerScore > 21 || dealerScore == playerScore) playerWon = true
  }
  endOfGame()
})

function showStatus() {
  /* if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!'
    return
  }*/
  /*
  let playerCardString = ''
  for (let i = 0; i < playerCards.length; i++) {
    //playerCardString += playerCards[i][2] + ' of ' + playerCards[i][1] + '\n'
  }
  document.getElementById('text-area').innerText = 'Player has:\n' + playerCardString + '(score: ' + playerScore + ')\n\n'
  //textArea.innerText +=
   // 'Player has:\n' + playerCardString + '(score: ' + playerScore + ')\n\n'
   */
}

function getScore(cardArray) {
  let score = 0
  for (let i = 0; i < cardArray.length; i++) {
    score += cardArray[i][3]
  }
  return score
}

function updateScores() {
  dealerScore = getScore(dealerCards)
  playerScore = getScore(playerCards)
}

function getNextCard() {
  return deck.shift()
}

function checkScore() {
  updateScores()
  if (playerScore == 21) {
    playerWon = true
    showStatus()
    endOfGame()
    //End Game
  }

  if (playerScore > 21) {
    playerWon = false
    showStatus()
    endOfGame()
  }

  if (dealerScore > 21) {
    playerWon = true
    showStatus()
    endOfGame()
  }
  return
}

function endOfGame() {
  console.log('Got to end of game')
  updateScores()
  let dealerCardString = ''
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += dealerCards[i][2] + ' of ' + dealerCards[i][1] + '\n'
  }

  /*textArea.innerText +='Dealer has:\n' +dealerCardString +'(score: ' +dealerScore +')\n\n'
    if ((playerWon == true || playerScore > dealerScore) && playerScore<22) {
      textArea.innerText += 'YOU WIN!'
    } else {
      textArea.innerText += 'DEALER WINS'
    }*/
  newGameButton.style.display = 'inline'
  hitButton.style.display = 'none'
  stayButton.style.display = 'none'
  //console.log(textArea.innerText)
}

function show_image(targetdiv, src) {
  var img = document.createElement('img')
  img.src = src
  img.width = 100
  img.height = 200
  document.getElementById(targetdiv).appendChild(img)
}

function Card (suit, value) {
    this.suit = suit;
    this.value = value;
}

// expects an array of suits, card values
function Deck (suits, values) {
	// if suits and values are not arrays, then set to null
    this.suits = (typeof suits !== 'undefined' && suits && suits.constructor === Array) ? suits : null;
    this.values = (typeof values !== 'undefined' && values && values.constructor === Array) ? values : null;
    this.cards = [];

    this.hasSuitsAndValues = function () {
		return this.suits && this.values;
    };

    this.isEmptyDeck = function () {
    	return (this.cards.length === 0);
    };


	// method to create some integer of decks, based on the arrays of suits and values
    this.newDeck = function(numberOfDecks) {
    	if (this.hasSuitsAndValues()) {
    		var allCards = [];
    		var deckCount = (parseInt(numberOfDecks) !== numberOfDecks || numberOfDecks < 1) ? 1 : parseInt(numberOfDecks);

			for (var i = 0; i < this.suits.length; i++) {
				// suits must be non null and have some length
				if (this.suits[i] !== null || this.suits[i] !== "") {
					for (var j = 0; j < this.values.length; j++) {
						// values must be non null and have some length.
						if (this.values[j] !== null && this.values[j] !== "") {
				    		// console.log("Suit:" + this.suits[i] + ", Value:" + this.values[j]);
							allCards.push(new Card(suits[i], values[j]));
						}						
					}					
				}
			}

			var tempDeck = allCards.slice(0);
			for (var j = 1; j < deckCount ; j++) {
				allCards = allCards.concat(tempDeck);
			}

			this.cards = allCards;
    	}
    };

	// debug function.  not really useful in a deck.
    this.outputDeck = function(){
    	for (idx = 0; idx < this.cards.length; idx++) {
	    	var output = this.cards[idx].suit + ' - ' + this.cards[idx].value; 
    		console.log(output);	    			
    	}
    };

    // outputs the "first" card value and removes it from the list
    // uses shift, but could also use pop.  when shuffled, it does not matter.
    this.draw = function(numberOfCards) {
    	var drawnCards = [];
    	if (!this.isEmptyDeck()) {		    		
	    	var drawCount = (parseInt(numberOfCards) !== numberOfCards || numberOfCards < 1) ? 1 : parseInt(numberOfCards);
	    	for (i = 0; i < drawCount ; i++) {
		    	drawnCards.push(this.cards.shift());
	    	}
	    }
    	return drawnCards;
    };

	// shuffles all of the cards
    this.shuffle = function() {
		// Fisher-Yates Shuffle
	    var i = this.cards.length, j, temp;
	    while(--i > 0){
	        j = Math.floor(Math.random() * (i+1));
	        temp = this.cards[j];
	        this.cards[j] = this.cards[i];
	        this.cards[i] = temp;
	    }
    };

	// picks a random card from the deck
	// replacement is optional
    this.drawRandom = function(isReplaced) {
    	if (!this.isEmptyDeck()) {
		    var i = this.cards.length;
		    var j = Math.floor(Math.random() * (i));
		    if (isReplaced) {
				return this.cards[j];		    	
		    } else {
				return this.cards.splice(j, 1);		    	
		    }
		}
		else {
			return null;
		}
    };

    // allow for addition of special cards, like Wilds
    this.addCard = function(card, numberOfCards) {
    	var drawCount = (parseInt(numberOfCards) !== numberOfCards || numberOfCards < 1) ? 1 : parseInt(numberOfCards);
    	 for (var i = 0; i < drawCount ; i++) {
    	 	this.cards.push(card);
    	 }
    };

    // allow for addition of different decks, to assist in building more complex deck types
    this.addCards = function(cards) {
    	if (typeof cards !== 'undefined' && cards && cards.constructor === Array) {
	    	this.cards = this.cards.concat(cards);
	    }
    };
}

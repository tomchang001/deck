define(['jquery', 'deck'], function($) {

	describe('createCardUsingEmptyConstructor', function() {
		it('Should return a new card with members', function(){
			var card = new Card();
			expect(card.suit).toBe(undefined);
			expect(card.value).toBe(undefined);
		});
	});


	describe('createCardUsingPopulatedConstructor', function() {
		it('Should return a new card with members', function(){
			var card = new Card("Hearts", 2);
			expect(card.suit).toBe("Hearts");
			expect(card.value).toBe(2);
		});
	});

	describe('addCardToDeck', function() {
		var deck = new Deck();
		var card = new Card("Hearts", 1);

		deck.addCard(card);

		it('Should add the card to the deck', function(){
			// deck.outputDeck();
			expect(deck.cards.length).toBe(1);
		});
	});

	describe('addNonCardToDeck', function() {
		var deck = new Deck();
		var card = "Not a Card";

		deck.addCard(card);

		it('Should not add the card to the deck', function(){
			// deck.outputDeck();
			expect(deck.cards.length).toBe(0);
		});
	});

	describe('addCardsToDeck', function() {
		var deck = new Deck();
		var card1 = new Card("Hearts", 1);
		var card2 = new Card("Hearts", 2)
		var cardArray = [card1 , card2];

		deck.addCards(cardArray);

		it('Should add the cards to the deck', function(){
			// deck.outputDeck();
			expect(deck.cards.length).toBe(2);
		});
	});

	describe('addNonCardsToDeck', function() {
		var deck = new Deck();
		var card1 = "Not a card.";
		var card2 = "Still not a card";
		var card3 = new Card("Hearts", 1);
		var cardArray = [card1 , card2, card3];

		deck.addCards(cardArray);

		it('Should only add the valid cards to the deck', function(){
			// deck.outputDeck();
			expect(deck.cards.length).toBe(1);
		});
	});


	describe('createDeckUsingConstructor', function() {
		var deck = new Deck(["Hearts", "Spades"], [1, 2, 3]);

		it('Should be able to make a new deck', function(){
			deck.newDeck();
			expect(deck.cards.length).toBe(6);
		});

		it('Should have the first card of Hearts 1', function(){
			expect(deck.cards[0].suit).toBe("Hearts");
			expect(deck.cards[0].value).toBe(1);
		});

		it('Should have the last card of Spades 3', function(){
			expect(deck.cards[5].suit).toBe("Spades");
			expect(deck.cards[5].value).toBe(3);
		});

		it('Should still shuffle an empty deck', function(){
			deck.shuffle();
			expect(deck.cards.length).toBe(6);
		});

		it('Should return a card when drawing from the deck', function(){
			var cards = deck.draw();
			expect(cards.length).toBe(1);
			expect(deck.cards.length).toBe(5);
		});

		it('Should return cards when drawing multiple from the deck', function(){
			var cards = deck.draw(2);
			expect(cards.length).toBe(2);
			expect(deck.cards.length).toBe(3);
		});

		it('Should return a random card when drawing from the deck with replacement', function(){
			expect(deck.drawRandom(true) !== null).toBe(true);
			expect(deck.cards.length).toBe(3);
		});

		it('Should return a random card when drawing from the deck without replacement', function(){
			expect(deck.drawRandom(false) !== null).toBe(true);
			expect(deck.cards.length).toBe(2);
		});

	});

	describe('createDeckUsingBadConstructor', function() {
		var deck = new Deck("Hearts", 1);

		it('Should be able to make a new empty deck', function(){
			deck.newDeck();
			expect(deck.cards.length).toBe(0);
		});

		it('Should not return a card when drawing from an empty deck', function(){
			expect(deck.draw().length).toBe(0);
		});

		it('Should still shuffle an empty deck', function(){
			deck.shuffle();
			expect(deck.cards.length).toBe(0);
		});

		it('Should return null when drawing a random card from an empty deck', function(){
			expect(deck.drawRandom(false)).toBe(null);
			expect(deck.drawRandom()).toBe(null);
		});

	});

	describe('shuffleDeck', function() {
		var deck = new Deck(["Diamonds", "Clubs"], [1, 2, 3]);
		deck.newDeck();
		it('Should have have six cards in the deck', function(){
			expect(deck.cards.length).toBe(6);
		});

		var deck2 = new Deck();
		deck2.addCards(deck.cards);

		it('Should have identical decks', function(){
			expect(deck.cards.length).toBe(deck2.cards.length);

			var different = false;
			for (var i = 0 ; i < deck.cards.length ; i++) {
				if (deck.cards[i] !== deck2.cards[i]) {
					different = true;
				}
			}

			expect(different).toBe(false);
		});

		it('Should have different card ordering upon shuffling', function(){
			deck2.shuffle();

			var different = false;
			for (var i = 0 ; i < deck.cards.length ; i++) {
				if (deck.cards[i] !== deck2.cards[i]) {
					different = true;
				}
			}

			expect(different).toBe(true);
		});

	});


});

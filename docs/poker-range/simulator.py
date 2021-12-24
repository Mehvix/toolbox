import random

CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
SUITS = ['Spades', 'Clubs', 'Heart', 'Diamonds']

class Card:
    def __init__(self, i, j) -> None:
        if (i > 13) or (j> 4) or (i<0) or j<0:
            raise Exception('Index when initializing Card class out of range!')
        self.value: str = CARDS[i]
        self.suit: str = SUITS[j]
    
    def print(self) -> None:
        print(self.suit + " " + self.value)


class Deck:        
    def __init__(self) -> None:
        self.cards = []
        for j in range(len(SUITS)):
            for i in range(len(CARDS)):
                self.cards.append(Card(i,j))

    def deal(self) -> Card:
        return self.cards.pop()

    def shuffle(self) -> None:
        random.shuffle(self.cards)

    def print(self) -> None:
        for card in self.cards:
            card.print()


if __name__ == "__main__":
    DECK = Deck()
    DECK.shuffle()``
    
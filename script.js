document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'card1', img: 'images/card1.png' },
        { name: 'card2', img: 'images/card2.png' },
        { name: 'card3', img: 'images/card3.png' },
        { name: 'card4', img: 'images/card4.png' },
        { name: 'card1', img: 'images/card1.png' },
        { name: 'card2', img: 'images/card2.png' },
        { name: 'card3', img: 'images/card3.png' },
        { name: 'card4', img: 'images/card4.png' }
    ];

    cardsArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.querySelector('#game-board');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        for (let i = 0; i < cardsArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].classList.add('matched');
            cards[optionTwoId].classList.add('matched');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].classList.remove('flipped');
            cards[optionTwoId].classList.remove('flipped');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardsArray.length / 2) {
            alert('Вы нашли все пары!');
        }
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardsArray[cardId].name);
        cardsChosenId.push(cardId);

        this.style.backgroundImage = `url(${cardsArray[cardId].img})`;
        this.classList.add('flipped');

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();

    document.getElementById('feedback-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        fetch('/send_feedback', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Сообщение успешно отправлено!');
                this.reset();
            } else {
                alert('Произошла ошибка при отправке сообщения.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
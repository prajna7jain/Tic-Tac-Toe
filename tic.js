let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newgameBtn = document.querySelector("#new-btn");
let msgCon = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");

let turnO = true; // Player O's turn
let count = 0; // To track the number of moves for draw condition

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBtn(); // Re-enable all boxes and clear their text
    msgCon.classList.add("hidden"); // Hide the message container
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // Disable the clicked box
        count++;

        let isWinner = checkWinner();

        //  draw only if no winner is found after 9 moves
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw";
    msgCon.classList.remove("hidden");
    disBtn(); // Disable all buttons on draw
};

const disBtn = () => {
    for (let box of boxes) {
        box.disabled = true; // disable each individual box
    }
};

const enableBtn = () => {
    for (let box of boxes) {
        box.disabled = false; // enable each individual box
        box.innerText = ""; // Clear the text inside each box
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, ${winner} You Won`;
    msgCon.classList.remove("hidden");
    disBtn(); // Disable all buttons when there's a winner
};

const checkWinner = () => {
    for (let pattern of winPatterns) { 
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                showWinner(posVal1);
                return true; //winner found
            }
        }
    }
    return false; // No winner found
};

newgameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
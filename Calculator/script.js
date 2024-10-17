const inputValue = document.getElementById("user-input");

// Add event listeners to number buttons
document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerHTML.trim();
    });
});

// Add event listeners to operation buttons
document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const lastChar = inputValue.innerText.slice(-1);
        const isOperator = ["+", "-", "*", "/", "%"].includes(lastChar);

        if (e.target.innerHTML === "=") {
            try {
                inputValue.innerText = eval(inputValue.innerText.replace(/%/g, "/100"));
            } catch (error) {
                inputValue.innerText = "Error";
            }
        } else if (e.target.innerHTML === "AC") {
            inputValue.innerText = "0";
        } else if (e.target.innerHTML === "DEL") {
            inputValue.innerText = inputValue.innerText.slice(0, -1);
            if (inputValue.innerText.length === 0) {
                inputValue.innerText = "0";
            }
        } else if (e.target.innerHTML === "%") {
            const inputStr = inputValue.innerText;
            const lastNumberMatch = inputStr.match(/(\d+)(?!.*\d)/);
            if (lastNumberMatch) {
                const lastNumber = lastNumberMatch[0];
                const percentageValue = parseFloat(lastNumber) / 100;
                inputValue.innerText = inputStr.slice(0, lastNumberMatch.index) + percentageValue;
            }
        } else {
            if (!isOperator || (isOperator && !isNaN(e.target.innerHTML))) {
                inputValue.innerText += e.target.innerHTML.trim();
            }
        }
    });
});
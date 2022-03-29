let theNumbers = document.querySelectorAll('.number')
let theOperators = document.querySelectorAll('.operator')
let previous = document.querySelector('.previousvalue')
let current = document.querySelector('.currentvalue')
let isekai = document.querySelectorAll('.clear, .clearEntry')
let plusMinus = document.querySelector('#signChange')
let output = document.querySelector('.equals')

let itemArray = []
let equationArray = []
let numberFlag = false

function main() {
    theNumbers.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const newInput = event.target.textContent;
            if (numberFlag) {
                current.value = newInput;
                numberFlag = false;
            } else {
                current.value =
                    current.value == 0 ? newInput : `${current.value}${newInput}`
            }

        })
    });
    theOperators.forEach(btn => {
        btn.addEventListener('click', (event) => {
            if (numberFlag) {
                previous.textContent = '';
                itemArray = [];
            }
            const newOperator = event.target.textContent;
            const currentVal = current.value;
            if (!itemArray.length && currentVal == 0) return;

            if (!itemArray.length) {
                itemArray.push(currentVal, newOperator);
                previous.textContent = `${currentVal} ${newOperator}`;
                return numberFlag = true;
            }
            if (itemArray.length) {
                itemArray.push(currentVal);
                const equationOp = {
                    num1: parseFloat(itemArray[0]),
                    num2: parseFloat(currentVal),
                    op: itemArray[1],
                }
                equationArray.push(equationOp);
                const equationStrings = `${equationOp['num1']} ${equationOp['op']} ${equationOp['num2']}`
                const newValue = calculate(equationStrings, current);
                previous.textContent = `${newValue} ${newOperator}`;
                itemArray = [newValue, newOperator]
                numberFlag = true;
            }
        });
    });

    output.addEventListener('click', () => {
        const currentVal = current.value;
        let equationOp;
        if (!itemArray.length && equationArray.length) {
            const final = equationArray[equationArray.length - 1]
            equationOp = {
                num1: parseFloat(currentVal),
                num2: final.num2,
                op: final.op
            }
        } else if (!itemArray.length) {
            return currentVal;
        } else {
            itemArray.push(currentVal);
            equationOp = {
                num1: parseFloat(itemArray[0]),
                num2: parseFloat(currentVal),
                op: itemArray[1]
            }
        }
        equationArray.push(equationOp)
        const equtionStrings = `${equationOp['num1']}${equationOp['op']}${equationOp['num2']}`;
        calculate(equtionStrings, current);
        previous.textContent = `${equtionStrings} =`;
        numberFlag = true;
        itemArray = [];
    });

    isekai.forEach(btn => {
        btn.addEventListener('click', (event) => {
            current.value = 0;
            if (event.target.classList.contains('clear')) {
                previous.textContent = '';
                itemArray = [];
            };
        });
    });
    plusMinus.addEventListener('click', () => {
        current.value = parseFloat(current.value) * -1;
    })
};

document.addEventListener("DOMContentLoaded", main);

const calculate = (equation, current) => {
    const reg = /(^[*/=])|(\s)/g;
    equation.replace(reg, '');
    const divideByZero = /(\/0)/.test(equation);
    if (divideByZero) return current.value = 0;
    return current.value = eval(equation);
}
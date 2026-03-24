const buttons = [
    {
        label: "AC",
        style: "triple",
        type: "clear"
    },
    {
        label: "/",
        style: "operation",
        type: "operation"
    },
    {
        label: "7",
        type: "digit"
    },
    {
        label: "8",
        type: "digit"
    },
    {
        label: "9",
        type: "digit"
    },
    {
        label: "*",
        style: "operation",
        type: "operation"
    },
    {
        label: "4",
        type: "digit"
    },
    {
        label: "5",
        type: "digit"
    },
    {
        label: "6",
        type: "digit"
    },
    {
        label: "-",
        style: "operation",
        type: "operation"
    },
    {
        label: "1",
        type: "digit"
    },
    {
        label: "2",
        type: "digit"
    },
    {
        label: "3",
        type: "digit"
    },
    {
        label: "+",
        style: "operation",
        type: "operation"
    },
    {
        label: "0",
        style: "double",
        type: "digit"
    },
    {
        label: ".",
        type: "digit"
    },
    {
        label: "=",
        style: "operation",
        type: "operation"
    }
]
const displayEl = document.querySelector('#display')
const calculatorEl = document.querySelector('#calculator')


let displayValue = '0'
let actualOperation = null
let values = [0, 0]
let currentIndex = 0

let shouldCleanDisplay = false

function updateDisplay(value) {
    displayEl.textContent = value
}

function clearMemory() {
    displayValue = '0'
    actualOperation = null
    values = [0, 0]
    currentIndex = 0

    updateDisplay(displayValue)
}

function setOperation(operation) {
    if (operation === '-' && (values[currentIndex] === 0 || isNaN(values[currentIndex]))) {
        addDigit('-')
        return;
    }
    if (currentIndex === 0) {
        actualOperation = operation
        currentIndex = 1
    }
    else if (currentIndex === 1) {

        let result

        switch (actualOperation) {
            case '+':
                result = values[0] + values[1]
                break;
            case '-':
                result = values[0] - values[1]
                break;
            case '/':
                result = values[0] / values[1]
                break;
            case '*':
                result = values[0] * values[1]
                break;
            default:
                break;
        }

        let newValues = [result ?? values[0], 0]

        values = [...newValues]
        displayValue = result ?? displayValue
        actualOperation = operation === '=' ? null : operation
        updateDisplay(displayValue)
    }

    shouldCleanDisplay = true
}

function addDigit(digit) {
    if ((digit === '.' && displayValue.toString().includes('.')) || (digit === '-' && displayValue.toString().includes('-') && (values[currentIndex] !== 0)))
        return

    const newValue = (displayValue === '0' || shouldCleanDisplay) && digit !== '.' ? digit : displayValue + digit
    shouldCleanDisplay = false
    displayValue = newValue

    if (digit !== '.') {
        let newValues = [...values]
        newValues[currentIndex] = parseFloat(newValue)
        values = [...newValues]
    }

    updateDisplay(displayValue)
}


buttons.map(button => {

    const buttonEl = document.createElement('button')
    buttonEl.classList.add('button')
    buttonEl.value = button.label
    buttonEl.textContent = button.label

    if (button.style)
        buttonEl.classList.add(button.style)

    switch (button.type) {
        case 'clear':
            buttonEl.addEventListener('click', () => clearMemory())
            break
        case 'operation':
            buttonEl.addEventListener('click', (e) => setOperation(e.target.value))
            break
        case 'digit':
            buttonEl.addEventListener('click', (e) => addDigit(e.target.value))
            break
    }

    calculatorEl.appendChild(buttonEl)
})

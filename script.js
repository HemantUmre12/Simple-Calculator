const $ = query => document.querySelector(query);
const $$ = query => [...document.querySelectorAll( query )];

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = "";
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return; 
        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if(!this.currentOperand) return;
        if(this.operation) {
            this.compute();
            this.updateDisplay();
        }
        this.operation = operation;
        if(this.previousOperand) {
            return;
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        if(!this.currentOperand || !this.previousOperand){
            return;
        }
        let result;
        if(this.operation === '+') {
            result = +this.previousOperand + +this.currentOperand;
        }
        else if(this.operation === '-') {
            result = +this.previousOperand - +this.currentOperand;
        }
        else if(this.operation === '*') {
            result = +this.previousOperand * +this.currentOperand;
        }
        else if(this.operation === '÷') {
            result = +this.previousOperand / +this.currentOperand;
        }
        this.currentOperand = result;
        this.previousOperand = "";
        this.operation = "";
    }

    // getDisplayNumber( number ) {
    //     const floatNumber = +number;
    //     if(isNaN(floatNumber)) return "";
    //     return floatNumber.toLocaleString('en');
    // }

    getDisplayNumber (number) {
        return number;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }
}

const numberButtons = $$('[data-number]');
const operationButtons = $$('[data-operant]');
const equalsButton = $('[data-equals]');
const clearButton = $('[data-allClear]');
const deleteButton = $('[data-delete]');
const previousOperandTextElement = $('[data-previousOperand]');
const currentOperandTextElement = $('[data-currentOperand]');

const myCalculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        myCalculator.appendNumber(button.innerText);
        myCalculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        myCalculator.chooseOperation(button.innerText);
        myCalculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    myCalculator.compute();
    myCalculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    myCalculator.clear();
    myCalculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    myCalculator.delete();
    myCalculator.updateDisplay();
})


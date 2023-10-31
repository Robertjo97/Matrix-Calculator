let display = document.getElementById('display');
let result = document.getElementById('result');

result.value = ' ';
display.value = ' ';

function buttonPress(value) {
    result.value += value;
}

function ce() {
    result.value = ' ';
    display.value = ' ';
}

function calculate() {
    let input = result.value;
    let ans = eval(input);
    display.value += input + '=';
    result.value = ans;
}

function sign() {
    let str = result.value;
    let num = [];
    let i = str.length - 1;
    let newResult = str;

    if (result.value == ' ' || str[str.length - 1] == '+' || str[str.length - 1] == '*' || str[str.length - 1] == '/') {
        result.value += '-';
    }

    else if (str[str.length - 1] == '-') {
        result.value += ' (-1)*';
    }

    else if (result.value != ' ') {
        if (i > 0) {
            while (i > -1) {
                if (str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/') {
                    break;
                }
                num.push(str[i]);
                newResult = newResult.slice(0, -1);
                i--;
            }
        }
        let number = num.reverse().join("");
        number = number * -1;
        result.value = newResult + '(' + number + ')';
    }
}

function squareRoot() {
    let ans = 0;
    let squareStr = result.value;
    let temp = squareStr;
    let sqrNum = [];
    let i = squareStr.length - 1;
    while (i >= 0) {
        if (squareStr[i] == '+' || squareStr[i] == '-' || squareStr[i] == '*' || squareStr[i] == '/') {
            break;
        }
        sqrNum.push(squareStr[i]);
        temp = temp.slice(0, -1);
        i--;
    }
    let number = sqrNum.reverse().join("");
    ans = Math.sqrt(number);
    result.value = temp + ans;
}
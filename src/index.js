function getValue(arr) {
    var v1, v2;
    var value = null;
    var values = [];
    for (var i = 0; i < arr.length; i++) {
        value = arr[i];
        switch (value) {
            case '+':
                v2 = values.pop();
                v1 = values.pop();
                values.push(v1 + v2);
                break;
            case '-':
                v2 = values.pop();
                v1 = values.pop();
                values.push(v1 - v2);
                break;
            case '*':
                v2 = values.pop();
                v1 = values.pop();
                values.push(v1 * v2);
                break;
            case '/':
                v2 = values.pop();
                v1 = values.pop();
                values.push(v1 / v2);
                break;
            case '^':
                v2 = values.pop();
                v1 = values.pop();
                values.push(Math.pow(v1, v2));
                break;
            default:
                values.push(parseFloat(value));
        }
    }
    return values[0];
}

function getReversePolishNotation(p) {
    var operator = null;
    var operators = [];
    var output = [];
    var value = null;
    for (var i = 0; i < p.length; i++) {
        value = p[i];
        switch (value) {
            case '+':
            case '-':
                if (operators.length) {
                    operator = operators.pop();
                    while (operator) {
                        output.push(operator);
                        operator = operators.pop();
                    }
                    if (operator) {
                        operators.push(operator);
                    }
                }
                operators.push(value);
                console.log("operators " + operators);
                console.log("output " + output);
                break;
            case '*':
            case '/':
                if (operators.length) {
                    operator = operators.pop();
                    while (operator && operator !== '+' && operator !== '-') {
                        output.push(operator);
                        operator = operators.pop();
                    }
                    if (operator) {
                        operators.push(operator);
                    }
                }
                operators.push(value);
                console.log("operators " + operators);
                console.log("output " + output);
                break;
            case '^':
                operators.push(value);
                break;
            default:
                output.push(value);
                console.log("operators " + operators);
                console.log("output " + output);
        }
    }
    while (operators.length) {
        output.push(operators.pop());
    }
    return output;
}

class SmartCalculator {

    constructor(initialValue) {
        this.initialValue = "" + initialValue;
        this.values = [];
        this.values.push(initialValue);
    }

    add(number) {
        this.initialValue += " + " + number;
        this.values.push("+");
        this.values.push(number);
        return this;
    }

    subtract(number) {
        this.initialValue += " - " + number;
        this.values.push("-");
        this.values.push(number);
        return this;
    }

    multiply(number) {
        this.initialValue += " * " + number;
        this.values.push("*");
        this.values.push(number);
        return this;
    }

    devide(number) {
        this.initialValue += " / " + number;
        this.values.push("/");
        this.values.push(number);
        return this;
    }

    pow(number) {
        this.initialValue += " ^ " + number;
        this.values.push("^");
        this.values.push(number);
        return this;
    }

    result() {
        let rpn = getReversePolishNotation(this.values);
        var result = getValue(rpn);
        return result;
    }
}

SmartCalculator.prototype.toString = function () {
    return this.result();
};
SmartCalculator.prototype.valueOf = function () {
    return this.result();
};

module.exports = SmartCalculator;

let n1 = 0;
let m1 = 0;
let n2 = 0;
let m2 = 0;

let created = false;
let resultCreated = false;

function getData() {
    n1 = document.getElementById('n1').value;
    m1 = document.getElementById('m1').value;
    n2 = document.getElementById('n2').value;
    m2 = document.getElementById('m2').value;
}

function createMatrices() {
    if (created) {
        alert("Please clear the current matrices.");
        return;
    }
    let table1 = document.createElement('table');
    let tbody1 = document.createElement('tbody');

    let table2 = document.createElement('table');
    let tbody2 = document.createElement('tbody');

    document.getElementById('matrix-container').appendChild(table1);
    table1.id = 'matrix1';
    table1.appendChild(tbody1);

    let transpose1 = document.createElement('button');
    transpose1.type = "button";
    transpose1.id = 'submit';
    transpose1.onclick = function hook() {
        transposeMatrix('matrix1');
    }
    transpose1.innerHTML = 'Transpose';
    document.getElementById('matrix1').appendChild(transpose1);

    let trace1 = document.createElement('button');
    trace1.type = "button";
    trace1.id = 'submit';
    trace1.onclick = function test1() { traceMatrix('matrix1'); }
    trace1.innerHTML = 'Trace';
    document.getElementById('matrix1').appendChild(trace1);

    for (let i = 0; i < n1; i++) {
        let tr1 = document.createElement('tr');
        tbody1.appendChild(tr1);
        for (let j = 0; j < m1; j++) {
            let td1 = document.createElement('td');
            tr1.appendChild(td1);
            td1.innerHTML = '<input type="text" id="cell"></input>';
        }
    }

    document.getElementById('matrix-container').appendChild(table2);
    table2.id = 'matrix2';
    table2.appendChild(tbody2);
    for (let i = 0; i < n2; i++) {
        let tr2 = document.createElement('tr');
        tbody2.appendChild(tr2);
        for (let j = 0; j < m2; j++) {
            let td2 = document.createElement('td');
            tr2.appendChild(td2);
            td2.innerHTML = '<input type="text" id="cell"></input>';
        }
    }
    let transpose2 = document.createElement('button');
    transpose2.type = "button";
    transpose2.id = 'submit';
    transpose2.onclick = function hook() { transposeMatrix('matrix2') }
    transpose2.innerHTML = 'Transpose';
    document.getElementById('matrix2').appendChild(transpose2);

    let trace2 = document.createElement('button');
    trace2.type = "button";
    trace2.id = 'submit';
    trace2.onclick = function test1() { traceMatrix('matrix2'); }
    trace2.innerHTML = 'Trace';
    document.getElementById('matrix2').appendChild(trace2);
    created = true;
}

function clearMatrices() {
    if (!created) {
        return;
    }

    n1 = 0;
    m1 = 0;
    n2 = 0;
    m2 = 0;

    document.getElementById('matrix1').remove();
    document.getElementById('matrix2').remove();

    document.getElementById('n1').value = null;
    document.getElementById('m1').value = null;
    document.getElementById('n2').value = null;
    document.getElementById('m2').value = null;

    let resultTable = document.getElementById('resultMatrix');
    if (resultTable) {
        resultTable.remove();
    }

    created = false;
    resultCreated = false;
}

function operation() {
    let x = document.getElementById('op');

    if (resultCreated == true) {
        alert('Please clear current matrices.');
        return;
    }
    if (x.value == '+') {
        if (n1 == n2 && m1 == m2) {
            add();
        }
        else alert("Error: Dimensions must match");
    }
    else if (x.value == '-') {
        if (n1 == n2 && m1 == m2) {
            sub();
        }
        else alert("Error: Dimensions must match.");
    }
    else if (x.value == '*') {
        mult();
    }
}

function add() {
    if (!created) {
        alert("Please create matrices first.");
        return;
    }

    let resultMatrix = new Array(n1);
    for (let i = 0; i < n1; i++) {
        resultMatrix[i] = new Array(m1);
    }

    let matrix1 = document.getElementById('matrix1');
    let matrix2 = document.getElementById('matrix2');

    for (let i = 0; i < n1; i++) {
        for (let j = 0; j < m1; j++) {
            let cell1 = parseFloat(matrix1.rows[i].cells[j].querySelector('input').value);
            let cell2 = parseFloat(matrix2.rows[i].cells[j].querySelector('input').value);

            if (!isNaN(cell1) && !isNaN(cell2)) {
                resultMatrix[i][j] = cell1 + cell2;
            } else {
                alert("Invalid input. Please enter numeric values in all cells.");
                return;
            }
        }
    }

    let resultTable = document.createElement('table');
    resultTable.id = 'resultMatrix';
    let resultTbody = document.createElement('tbody');

    document.getElementById('matrix-container').appendChild(resultTable);
    resultTable.appendChild(resultTbody);

    for (let i = 0; i < n1; i++) {
        let resultRow = document.createElement('tr');
        resultTbody.appendChild(resultRow);

        for (let j = 0; j < m1; j++) {
            let resultCell = document.createElement('td');
            let resultInput = document.createElement('input');
            resultRow.appendChild(resultCell);
            resultCell.appendChild(resultInput);
            resultInput.id = 'cell';
            resultInput.value = resultMatrix[i][j];
        }
    }

    let transpose = document.createElement('button');
    transpose.type = "button";
    transpose.id = 'submit';
    transpose.onclick = function hook() {
        transposeMatrix('resultMatrix');
    }
    transpose.innerHTML = 'Transpose';
    document.getElementById('resultMatrix').appendChild(transpose);

    let trace = document.createElement('button');
    trace.type = "button";
    trace.id = 'submit';
    trace.onclick = function test1() { traceMatrix('resultMatrix') }
    trace.innerHTML = 'Trace';
    document.getElementById('resultMatrix').appendChild(trace);

    resultCreated = true;
}

function sub() {
    if (!created) {
        alert("Please create matrices first.");
        return;
    }

    let resultMatrix = new Array(n1);
    for (let i = 0; i < n1; i++) {
        resultMatrix[i] = new Array(m1);
    }

    let matrix1 = document.getElementById('matrix1');
    let matrix2 = document.getElementById('matrix2');

    for (let i = 0; i < n1; i++) {
        for (let j = 0; j < m1; j++) {
            let cell1 = parseFloat(matrix1.rows[i].cells[j].querySelector('input').value);
            let cell2 = parseFloat(matrix2.rows[i].cells[j].querySelector('input').value);

            if (!isNaN(cell1) && !isNaN(cell2)) {
                resultMatrix[i][j] = cell1 - cell2;
            } else {
                alert("Invalid input. Please enter numeric values in all cells.");
                return;
            }
        }
    }

    let resultTable = document.createElement('table');
    resultTable.id = 'resultMatrix';
    let resultTbody = document.createElement('tbody');

    document.getElementById('matrix-container').appendChild(resultTable);
    resultTable.appendChild(resultTbody);

    for (let i = 0; i < n1; i++) {
        let resultRow = document.createElement('tr');
        resultTbody.appendChild(resultRow);

        for (let j = 0; j < m1; j++) {
            let resultCell = document.createElement('td');
            let resultInput = document.createElement('input');
            resultRow.appendChild(resultCell);
            resultCell.appendChild(resultInput);
            resultInput.id = 'cell';
            resultInput.value = resultMatrix[i][j];
        }
    }

    let transpose = document.createElement('button');
    transpose.type = "button";
    transpose.id = 'submit';
    transpose.onclick = function hook() {
        transposeMatrix('resultMatrix');
    }
    transpose.innerHTML = 'Transpose';
    document.getElementById('resultMatrix').appendChild(transpose);

    let trace = document.createElement('button');
    trace.type = "button";
    trace.id = 'submit';
    trace.onclick = function test1() { traceMatrix('resultMatrix'); }
    trace.innerHTML = 'Trace';
    document.getElementById('resultMatrix').appendChild(trace);

    resultCreated = true;
}

function mult() {
    if (!created) {
        alert("Please create matrices first.");
        return;
    }

    let matrix1 = document.getElementById('matrix1');
    let matrix2 = document.getElementById('matrix2');

    let rows1 = matrix1.rows.length;
    let cols1 = matrix1.rows[0].cells.length;
    let rows2 = matrix2.rows.length;
    let cols2 = matrix2.rows[0].cells.length;

    if (cols1 !== rows2) {
        alert("Error: Improper dimensions.");
        return;
    }

    let resultMatrix = new Array(rows1);
    for (let i = 0; i < rows1; i++) {
        resultMatrix[i] = new Array(cols2);
    }

    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            let sum = 0;
            for (let k = 0; k < cols1; k++) {
                let cell1 = parseFloat(matrix1.rows[i].cells[k].querySelector('input').value);
                let cell2 = parseFloat(matrix2.rows[k].cells[j].querySelector('input').value);

                if (isNaN(cell1) || isNaN(cell2)) {
                    alert("Invalid input. Please enter numeric values in all cells.");
                    return;
                }
                sum += cell1 * cell2;
            }
            resultMatrix[i][j] = sum;
        }
    }

    let resultTable = document.createElement('table');
    resultTable.id = 'resultMatrix';
    let resultTbody = document.createElement('tbody');

    document.getElementById('matrix-container').appendChild(resultTable);
    resultTable.appendChild(resultTbody);

    for (let i = 0; i < rows1; i++) {
        let resultRow = document.createElement('tr');
        resultTbody.appendChild(resultRow);

        for (let j = 0; j < cols2; j++) {
            let resultCell = document.createElement('td');
            let resultInput = document.createElement('input');
            resultRow.appendChild(resultCell);
            resultCell.appendChild(resultInput);
            resultInput.id = 'cell';
            resultInput.value = resultMatrix[i][j];
        }
    }

    let transpose = document.createElement('button');
    transpose.type = "button";
    transpose.id = 'submit';
    transpose.onclick = function hook() {
        transposeMatrix('resultMatrix');
    }
    transpose.innerHTML = 'Transpose';
    document.getElementById('resultMatrix').appendChild(transpose);

    let trace = document.createElement('button');
    trace.type = "button";
    trace.id = 'submit';
    trace.onclick = function test1() { traceMatrix('resultMatrix') }
    trace.innerHTML = 'Trace';
    document.getElementById('resultMatrix').appendChild(trace);

    resultCreated = true;
}

function transposeMatrix(matrixId) {
    if (!created && !resultCreated) {
        alert("Please create matrices first.");
        return;
    }

    let matrix;
    if (matrixId === 'matrix1') {
        matrix = document.getElementById('matrix1');
    } else if (matrixId === 'matrix2') {
        matrix = document.getElementById('matrix2');
    } else if (matrixId === 'resultMatrix') {
        matrix = document.getElementById('resultMatrix');
    } else {
        alert("Invalid matrix ID.");
        return;
    }

    let rows = matrix.rows.length;
    let cols = matrix.rows[0].cells.length;

    let transposedMatrix = new Array(cols);
    for (let i = 0; i < cols; i++) {
        transposedMatrix[i] = new Array(rows);
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cellValue = parseFloat(matrix.rows[i].cells[j].querySelector('input').value);
            if (!isNaN(cellValue)) {
                transposedMatrix[j][i] = cellValue;
            } else {
                alert("Invalid input. Please enter numeric values in all cells.");
                return;
            }
        }
    }

    let transposedTable = document.createElement('table');
    let transposedTbody = document.createElement('tbody');

    transposedTable.appendChild(transposedTbody);

    for (let i = 0; i < cols; i++) {
        let transposedRow = document.createElement('tr');
        transposedTbody.appendChild(transposedRow);

        for (let j = 0; j < rows; j++) {
            let transposedCell = document.createElement('td');
            let transposedInput = document.createElement('input');
            transposedInput.id = 'cell';
            transposedRow.appendChild(transposedCell);
            transposedCell.appendChild(transposedInput);
            transposedInput.value = transposedMatrix[i][j];
        }
    }

    matrix.parentNode.replaceChild(transposedTable, matrix);
    transposedTable.id = matrixId;

    let transpose = document.createElement('button');
    transpose.type = "button";
    transpose.id = 'submit';
    transpose.onclick = function hook() { transposeMatrix(matrixId) }
    transpose.innerHTML = 'Transpose';
    document.getElementById(matrixId).appendChild(transpose);

    let trace = document.createElement('button');
    trace.type = "button";
    trace.id = 'submit';
    trace.onclick = function test1() { traceMatrix(matrixId) }
    trace.innerHTML = 'Trace';
    document.getElementById(matrixId).appendChild(trace);
}

function traceMatrix(matrixId) {
    if (!created && !resultCreated) {
        alert("Please create matrices first.");
        return;
    }

    let matrix;
    if (matrixId === 'matrix1') {
        matrix = document.getElementById('matrix1');
    } else if (matrixId === 'matrix2') {
        matrix = document.getElementById('matrix2');
    } else if (matrixId === 'resultMatrix') {
        matrix = document.getElementById('resultMatrix');
    } else {
        alert("Invalid matrix ID.");
        return;
    }

    let rows = matrix.rows.length;
    let cols = matrix.rows[0].cells.length;

    if (rows !== cols) {
        alert("Error: Matrix not square");
        return;
    }

    let trace = 0;
    for (let i = 0; i < rows; i++) {
        let cellValue = parseFloat(matrix.rows[i].cells[i].querySelector('input').value);
        if (!isNaN(cellValue)) {
            trace += cellValue;
        } else {
            alert("Error: Invalid input.");
            return;
        }
    }

    alert("Trace of the matrix: " + trace);
}


function main() {
    getData();
    createMatrices();
}
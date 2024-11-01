/**
 * Author: [Evan Kuczynski]
 * Date Completed: [10/27]
 * Time spent: 8 hrs
 * Description: [File contains 2 functions: one for when the submit button is clicked
 *              and another to generate the dynamic multiplication table]
 *
 * Additional notes: []
 */



// Select the id of "dataForm" then add the eventListener
// The eventListener waits until the id of "submit" has been activated and then calls function
document.getElementById("dataForm").addEventListener("submit", function (event) {
    
    
    // prevents the norm behavior of the form
    event.preventDefault();


    // clear the table container if any
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ''; // Clear the previous table if any
    
    
    // retrieve input values and parse them as ints from strings
    const colmNumStart = parseFloat(document.getElementById('colmNumStart').value);
    const colmNumEnd = parseFloat(document.getElementById('colmNumEnd').value);
    const minRowValue = parseFloat(document.getElementById('minRowValue').value);
    const maxRowValue = parseFloat(document.getElementById('maxRowValue').value);



    // check if any fields are empty
    if (!colmNumStart) {
        document.getElementById('errorColmNumStart').textContent = "Starting column number is required.";
    }
    if (!colmNumEnd) {
        document.getElementById('errorColmNumEnd').textContent = "Ending column number is required.";
    }
    if (!minRowValue) {
        document.getElementById('errorMinRowValue').textContent = "Starting row number is required.";
    }
    if (!maxRowValue) {
        document.getElementById('errorMaxRowValue').textContent = "Ending row number is required.";
    }
    
    
    
    // check if values are numbers
    if (isNaN(colmNumStart) || isNaN(colmNumEnd) || isNaN(minRowValue) || isNaN(maxRowValue)) {
        document.getElementById('errorColmNumber1').textContent = "Please enter valid numbers.";
        return;
    }
    
    
    // clear previous error messages if there are any
    document.getElementById('errorColmNumStart').textContent = '';
    document.getElementById('errorColmNumEnd').textContent = '';
    document.getElementById('errorMinRowValue').textContent = '';
    document.getElementById('errorMaxRowValue').textContent = '';

    // **************************************************************  Lambda function section
    // check if entered inputs are within the allowable range 
    // set flag to false if inputs are not within valid range
    // LAMBDA EXPRESSION FOR FUN
    // excepts value and id as parameters then checks if value is in the bounds if not return false
    // if input meets bounds return true
    const validateInput = (value, errorId) => {
        if (isNaN(value)) {
            document.getElementById(errorId).textContent = "Must be a valid number.";
            return false;
        }
        if (value < -50 || value > 50) {
            document.getElementById(errorId).textContent = "Must be between -50 and 50.";
            return false;
        }
        return true;
    };

    const inputs = [
        { value: colmNumStart, errorId: 'errorColmNumStart' },
        { value: colmNumEnd, errorId: 'errorColmNumEnd' },
        { value: minRowValue, errorId: 'errorMinRowValue' },
        { value: maxRowValue, errorId: 'errorMaxRowValue' },
    ];

    let valid = inputs.every(({ value, errorId }) => validateInput(value, errorId));

    // check if the end values are smaller than the starting values
    // ex. colm start is 20 but column end is 10 won't work
    if (colmNumStart >= colmNumEnd) {
        document.getElementById('errorColmNumStart').textContent = "Column end must be greater than column start.";
        valid = false;
    }
    if (minRowValue >= maxRowValue) {
        document.getElementById('errorMinRowValue').textContent = "Row end must be greater than row start.";
        valid = false;
    }
    // *************************************************************** End of Lambda function
    
    // log the values and generate the table if all checks pass
    // if this is not valid then error message will appear
    if (valid) {
        console.log('colmNumber1:', minRowValue);
        console.log('colmNumber2:', maxRowValue);
        console.log('minRowValue:', minRowValue);
        console.log('maxRowValue:', maxRowValue);

        // GENERATE THE MULTIPLICATION TABLE
        generateTable(colmNumStart, colmNumEnd, minRowValue, maxRowValue);
    }
});




// Function to generate the multiplication table
function generateTable(colmNumStart, colmNumEnd, minRowValue, maxRowValue) {

    
    // Create table element inside the "tableContainer" div
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ''; // Clear the previous table if any

    
    // Create the <table> element
    const table = document.createElement("table");

    
    // Insert a new row into the table and return a reference to that row
    const headerRow = table.insertRow();

    
    // Create the first header cell
    const headerCell1 = document.createElement("th");
    
    
    headerCell1.textContent = "R|C"; // Give the table header a name


    // Append the header cell to the header row
    headerRow.appendChild(headerCell1);

    
    // Create header cells for each column number
    for (let i = colmNumStart; i <= colmNumEnd; i++) {
        const headerCell = document.createElement("th");
        headerCell.textContent = i; // Correctly set the text content
        headerRow.appendChild(headerCell); // Append the new header cell
    }

    
    // create the actual table
    for (let row = minRowValue; row <= maxRowValue; row++) {
        const newRow = table.insertRow(); // create new row for each row value

        // first cell for first row label
        const rowLabelCell = newRow.insertCell();
        rowLabelCell.textContent = row; // set label for this row

        // create cells for multiplication values 
        for (let col = colmNumStart; col <= colmNumEnd; col++) {
            const cell = newRow.insertCell();
            cell.textContent = row * col; // set the multiplication cell value 
        }
    }
    

    // Finally, append the table to the container
    tableContainer.appendChild(table); // Add the populated table to the container
}



// end of scripts.js file
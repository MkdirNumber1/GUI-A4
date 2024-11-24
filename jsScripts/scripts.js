/**
 * Author: [Evan Kuczynski]
 * Date Completed: [10/27]
 * Time spent: 8 hrs
 * Description: [File contains 2 functions: one for when the submit button is clicked
 *              and another to generate the dynamic multiplication table]
 *
 * Additional notes: []
 */


$(document).ready(function () {
    // jQuery Validation Plugin to the form

    // validate all availbile user input for required value, must be a integer, be in range of -50 50
    $("#dataForm").validate({
        rules: {
            colmNumStart: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            colmNumEnd: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThan: "#colmNumStart" // Ensure column end is greater than column start
            },
            minRowValue: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxRowValue: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThan: "#minRowValue" // Ensure row end is greater than row start
            }
        },

        // error messages for the user if they enter bad input
        messages: {
            colmNumStart: {
                required: "Please enter a starting column number.",
                number: "Please enter a valid number.",
                range: "Please enter a value between -50 and 50."
            },
            colmNumEnd: {
                required: "Please enter an ending column number.",
                number: "Please enter a valid number.",
                range: "Please enter a value between -50 and 50.",
                greaterThan: "Ending column must be greater than starting column."
            },
            minRowValue: {
                required: "Please enter a starting row number.",
                number: "Please enter a valid number.",
                range: "Please enter a value between -50 and 50."
            },
            maxRowValue: {
                required: "Please enter an ending row number.",
                number: "Please enter a valid number.",
                range: "Please enter a value between -50 and 50.",
                greaterThan: "Ending row must be greater than starting row."
            }
        },


        // submit handler if validation passes
        submitHandler: function () {
            const colmNumStart = parseFloat($('#colmNumStart').val());
            const colmNumEnd = parseFloat($('#colmNumEnd').val());
            const minRowValue = parseFloat($('#minRowValue').val());
            const maxRowValue = parseFloat($('#maxRowValue').val());

            // call function to generate the table
            generateTable(colmNumStart, colmNumEnd, minRowValue, maxRowValue);
        }
    });

    // custom method to check if one value is greater than another (for range validation)
    $.validator.addMethod("greaterThan", function (value, element, param) {
        return parseFloat(value) > $(param).val();
    }, "This value must be greater than the other column or row.");
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
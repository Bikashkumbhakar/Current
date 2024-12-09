// Hide result and feedback sections initially
document.getElementById("loadingSpinner").style.display = "none";
document.getElementById("resultBox").style.display = "none";
document.getElementById("feedbackForm").style.display = "none";

// Helper function to map income slab to numerical range
function getIncomeRange(slab) {
    switch (slab) {
        case "upTo10":
            return { min: 0, max: 1000000 };
        case "10to18":
            return { min: 1000001, max: 1800000 };
        case "more18":
            return { min: 1800001, max: Infinity };
        default:
            return null;
    }
}

// Handle predict button click
document.getElementById("predictButton").addEventListener("click", function () {
    const age = parseInt(document.getElementById("age").value);
    const employment = document.getElementById("employment").value;
    const incomeSlab = document.getElementById("income").value;
    const gender = document.getElementById("gender").value;
    const preference = document.getElementById("preference").value;

    if (!age || !employment || !incomeSlab || !gender || !preference) {
        alert("Please fill out all fields.");
        return;
    }

    // Map income slab to numerical range
    const incomeRange = getIncomeRange(incomeSlab);
    if (!incomeRange) {
        alert("Invalid income selection.");
        return;
    }

    // Hide the form and show loading spinner
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("loadingSpinner").style.display = "block";

    // Simulate a delay for prediction processing
    setTimeout(() => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("resultBox").style.display = "block";

        let result = "General Savings Account";

        // Apply account prediction conditions
        if (incomeRange.max <= 1000000) {
            result = "Active CA";
        } else if (incomeRange.max <= 1800000) {
            result = "Ascent CA";
        } else if (incomeRange.min > 1800000) {
            result = "Max Advantage CA";
        }

        // Display prediction result
        document.getElementById("resultText").innerText = `Your recommended HDFC product is: ${result}`;
    }, 5000); // 5-second delay
});

// Handle close button click in the result box
document.getElementById("closeResult").addEventListener("click", function () {
    document.getElementById("resultBox").style.display = "none";
    document.getElementById("feedbackForm").style.display = "block";
});

// Handle feedback form submission
document.getElementById("submitFeedback").addEventListener("click", function () {
    const rating = document.getElementById("rating").value;
    const feedback = document.getElementById("feedback").value;

    if (!rating || !feedback) {
        alert("Please provide both a rating and feedback.");
        return;
    }

    // Create the content for the file
    const feedbackData = `Rating: ${rating}\nFeedback: ${feedback}\n\n`;

    // Create a Blob and a link to download the data
    const blob = new Blob([feedbackData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedback.txt";

    // Simulate a click to download the file
    link.click();

    alert("Thank you for your feedback! It has been saved to a file.");

    // Reset feedback form and show the main form
    document.getElementById("feedbackForm").style.display = "none";
    document.getElementById("formContainer").style.display = "block";

    // Clear form fields
    document.getElementById("predictForm").reset();
    document.getElementById("rating").value = "";
    document.getElementById("feedback").value = "";
});

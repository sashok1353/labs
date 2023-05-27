document.getElementById("simplify-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const expressionInput = document.getElementById("expression");
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    errorDiv.classList.add("hidden");
    resultDiv.textContent = "Loading...";

    const expression = encodeURIComponent(expressionInput.value);

    try {
        const response = await fetch(`/api?expression=${expression}`);
        const data = await response.json();

        resultDiv.textContent = `Simplified expression: ${data.result}`;
    } catch (error) {
        resultDiv.textContent = "";
        errorDiv.textContent = "Error: Unable to simplify the expression.";
        errorDiv.classList.remove("hidden");
    }
});
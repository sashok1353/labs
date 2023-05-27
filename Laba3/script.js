document.getElementById("start-sort").addEventListener("click", function () {
    const arrayInput = document.getElementById("array-input").value;
    const array = arrayInput.split(",").map(item => parseInt(item));
    console.log(arrayInput.split(","))
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    function displayArray(arr, a, b) {
        const div = document.createElement("div");

        for (let i = 0; i < arr.length; i++) {
            const span = document.createElement("span");
            span.className = "array-item";
            if (i === a || i === b) {
                span.classList.add("black");
                span.textContent = arr[a]
            }
            span.textContent = arr[i];
            div.appendChild(span);
        }
        resultDiv.appendChild(div);
    }

    function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > key) {
                displayArray(arr, j, j + 1);
                arr[j + 1] = arr[j];
                j = j - 1;
                arr[j + 1] = key;
            }
            if (j !== i - 2) {
                displayArray(arr, j, j + 1);
            }
        }
    }

    insertionSort(array);
});
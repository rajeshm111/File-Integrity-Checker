const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

const checkButton = document.getElementById("checkButton");

const loading = document.getElementById("loading");
const result = document.getElementById("result");

const resultFileName = document.getElementById("resultFileName");
const hashValue = document.getElementById("hashValue");

const copyButton = document.getElementById("copyButton");


fileInput.addEventListener("change", function () {

    if (fileInput.files.length > 0) {

        fileName.textContent = fileInput.files[0].name;

        result.classList.add("hidden");

    } else {

        fileName.textContent = "No file selected";

    }

});


checkButton.addEventListener("click", async function () {

    if (fileInput.files.length === 0) {

        alert("Please select a file first.");

        return;
    }


    const file = fileInput.files[0];

    const formData = new FormData();

    formData.append("file", file);


    result.classList.add("hidden");

    loading.classList.remove("hidden");


    try {

        const response = await fetch("/calculate-hash", {

            method: "POST",

            body: formData

        });


        const data = await response.json();


        if (data.success) {

            resultFileName.textContent = data.filename;

            hashValue.textContent = data.hash;

            result.classList.remove("hidden");

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert("Something went wrong.");

        console.error(error);

    }


    loading.classList.add("hidden");

});


copyButton.addEventListener("click", async function () {

    const hash = hashValue.textContent;

    await navigator.clipboard.writeText(hash);

    copyButton.textContent = "Copied!";

    setTimeout(() => {

        copyButton.textContent = "Copy Hash";

    }, 1500);

});
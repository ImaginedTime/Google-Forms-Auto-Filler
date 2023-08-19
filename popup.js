window.onload = function () {
    // Add click listeners to add and save button
    document.getElementById("addNewEntryButton").addEventListener("click", e => addNewEntry());

    document.getElementById("saveDataButton").addEventListener("click", saveData);


    // List saved form data
    var formData = {};
    chrome.storage.sync.get("formData", function (result) {
        formData = result["formData"];

        if (objectIsEmpty(formData))
            addNewEntry();
        else
            for (key in formData)
                addNewEntry(key, formData[key]);
    });
}


function addNewEntry(key = "", val = "") {
    const tBody = document.getElementsByTagName("tbody")[0];

    // Create input row
    const tr = document.createElement("tr");
    tBody.appendChild(tr);


    // Create key input
    var tdKey = document.createElement("td");
    var inputKey = document.createElement("input");
    inputKey.type = "text";
    inputKey.value = key;

    tdKey.appendChild(inputKey);
    tr.appendChild(tdKey);


    // Create value input
    var tdValue = document.createElement("td");
    var inputValue = document.createElement("input");
    inputValue.type = "text";
    inputValue.value = val;

    tdValue.appendChild(inputValue);
    tr.appendChild(tdValue);

    return false;
}



/**
* Saves the data on table
*/
function saveData() {
    var saveButton = document.getElementById("saveDataButton");
    var savedText = document.getElementById("savedText");
    saveButton.disabled = true;

    // Get datas from inputs and remove empty inputs
    var inputs = document.querySelectorAll('input[type="text"]');
    var formData = {};
    for (var i = 0; i < inputs.length / 2; i++) {
        if (inputs[i * 2].value && inputs[i * 2 + 1].value) {
            formData[inputs[i * 2].value.trim()] = inputs[i * 2 + 1].value.trim();
        } else {
            inputs[i * 2].parentNode.parentNode.remove();
        }
    }

    // Save data
    chrome.storage.sync.set({ "formData": formData }, function () {
        console.log("Form data saved: " + formData);

        // Fill forms with new data
        chrome.tabs.executeScript({
            code: "FillGoogleForms();"
        });
    });


    // Saved text animation
    saveButton.disabled = false;
    savedText.style.opacity = 1;
    var opacityInterval = setInterval(() => {
        savedText.style.opacity -= 0.01;
        if (savedText.style.opacity == 0)
            clearInterval(opacityInterval);
    }, 10);

}


function objectIsEmpty(object) {

    if (!object || JSON.stringify(object) == JSON.stringify({}))
        return true;
    return false;

}
/**
* Fills inputs on forms page with the data
*/
function FillGoogleForms() {
    chrome.storage.sync.get("formData", function(result) {
        formData = result["formData"];
        var FormElement = document.getElementsByTagName("form")[0];
        
        // Fill text fields
        var selectorStr = "input[type='text'], input[type='email'], input[type='number'], input[type='tel'], input[type='url']";
        var fields = FormElement.querySelectorAll(selectorStr);
        fields.forEach(function(item) {
            var formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
            var answer = formData[formTitle.trim()];
            if (answer) {
                item.value = answer;
                item.setAttribute("data-initial-value", answer);
                item.setAttribute("badinput", "false");
                item.nextSibling.style.display = "none";
            }
        });


        // Fill textareas
        var fields = FormElement.querySelectorAll("textarea");
        fields.forEach(function(item) {
            var formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
            var answer = formData[formTitle.trim()];
            if (answer) {
                item.value = answer;
                item.setAttribute("data-initial-value", answer);
                item.setAttribute("badinput", "false");
                item.parentElement.previousSibling.style.display = "none";
            }
        });

    });
}


window.onload = FillGoogleForms();
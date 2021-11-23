addEventListener("load", init)

//declare the input variables, so we can use them in every function
let naamInput
let emailInput
let form

function init() {
    naamInput = document.querySelector("#naam");            //select the naam input
    emailInput = document.querySelector("#email");          //select the email input
    form = document.querySelector(".personaliseringsform"); //select the form itself

    style()     //add the correct background colors to the inputs and make the span text color red

    naamInput.addEventListener("keyup", validateName);          //add a listener for the keyup event on naamInput
    emailInput.addEventListener("blur", validateEmail);         //add a listener for the blur event on emailInput
    form.addEventListener("submit", handleForm);                //add a listener for the submit event on form

}

function style() {
    naamInput.style.backgroundColor = "yellow";
    emailInput.style.backgroundColor = "orange";
    naamInput.style.color = "black";            //change text color to black to improve readability
    emailInput.style.color = "black";
    let spans = document.querySelectorAll(".personaliseringsform span")     //select all spans
    for (const span of spans) {                 //loop over spans
        span.style.color = "red";               //change span text color to red
        if (span.id === "submitValidatie") {    //if the span is the one under the submit button
            span.style.alignSelf = "center";    //align span to center under button
        }
    }
}

function validateName() {
    let naamSpan = document.querySelector("#naamValidatie");    //select the span element under naamInput

    if (naamInput.value.length < 5) {   //if the given name has less than 5 characters
        naamSpan.innerHTML = "Je ingevoerde waarde is kleiner dan 5 tekens.";   //give the error message in the span element
        return false;   //return false for the submit validation
    } else {
        naamSpan.innerHTML = "";    //if the given name has more than 5 characters, empty the error span
    }
    return true;    //return true for the submit validation
}

function validateEmail() {
    let regex = /^(\w+\.)+\w+@(student\.)?kdg\.be/gi    //regex to validate the e-mail

    let emailSpan = document.querySelector("#emailValidatie");  //select the span element under emailInput

    if (emailInput.value.search(regex) === 0 && emailInput.value.length > 0) {  //if the given e-mail matches the regex and the emailInput is not empty
        emailSpan.innerHTML = "";       //if the given e-mail is correct, empty the error span
        return true;                    //return true for submit validation
    } else {
        emailSpan.innerHTML = "Je ingevoerde e-mail behoort niet tot het KdG domein."   //give the error message in the span element
        return false;                    //return false for submit validation
    }
}

function handleForm(event) {
    let submitSpan = document.querySelector("#submitValidatie");    //select the span element under the submit button

    //validate each input before checking in the if statement, to ensure they both get run
    //if you do if (!validateName() || !validateEmail()), only validateName() will be run, so an incorrect e-mail will not be flagged
    let naamGevalideerd = validateName();
    let emailGevalideerd = validateEmail();

    if (!naamGevalideerd || !emailGevalideerd) {    //check if both inputs validated correctly
        event.preventDefault();                     //prevent the submit event actually happening, if one of the validations went wrong
        submitSpan.innerHTML = "Niet alle velden zijn correct ingevuld.";   //give the error message in the span element
    } else {
        submitSpan.innerHTML = "";      //empty the error span, if both inputs validated correctly
    }
}

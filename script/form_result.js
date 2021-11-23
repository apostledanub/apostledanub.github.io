addEventListener("load", init);

function init() {
    let table = {};     //declare a dictionary to save the data in
    let items = location.search.substring(1).split("&");    //remove the first '?' and split the rest of the string on '&'
    for (const item of items) {     //loop over the key=value pairs of the string
        let temp = item.split("=");     //split the key value pairs
        let tempValue = temp[1].replace(/\+/g, " ");    //change the '+' signs back into spaces
        tempValue = tempValue.replace(/%40/g, "@");     //add back the '@' sign for the e-mail
        tempValue = tempValue.replace(/%23/g, "#");     //add back the '#' sign for the RGB color value
        table[temp[0]] = tempValue;     //save the value under the correct key (form input name) in the table dictionary
    }

    let elementen = document.querySelectorAll(".informatie p span");    //get all the span elements in which we want to write the data
    for (const element of elementen) {      //loop over all the span elements
        //each span element has an id in the form of 'form_[corresponding input id]'
        element.innerHTML = table[element.id.substring(5)];     //get rid of the 'form_' in front and use the rest as a key to get the correct value out of the table
    }
}
"use strict";
var LocalStorage;
(function (LocalStorage) {
    class TodoElement {
        interpret;
        price;
        date;
        constructor(interpret, price, date) {
            this.interpret = interpret;
            this.price = price;
            this.date = date;
        }
    }
    const inputFeld = document.getElementById("input-element");
    const saveButton = document.getElementById("save-button");
    const loadButton = document.getElementById("load-button");
    const display = document.getElementById("display");
    const interpretInput = document.getElementById("interpret");
    const datetimeInput = document.getElementById("datetime");
    const priceInput = document.getElementById("price");
    const entereventButton = document.getElementById("enterevent");
    const eventtabelle = document.getElementById("eventtabelle");
    let elementID = 0;
    saveButton.addEventListener("click", saveButtonHandler);
    loadButton.addEventListener("click", loadButtonHandler);
    entereventButton.addEventListener("click", enterEvent);
    if (localStorage.length > 0) {
        load();
    }
    console.log("Test");
    function load() {
        let key = 0;
        for (let i = 0; i < localStorage.length; i++) {
            let interpret;
            let price;
            let date;
            //search vor the key number
            while (localStorage.getItem(key.toString()) === null) {
                key++;
            }
            interpret = (JSON.parse(localStorage.getItem(key.toString()))).interpret;
            price = (JSON.parse(localStorage.getItem(key.toString()))).price;
            date = new Date((JSON.parse(localStorage.getItem(key.toString()))).date);
            localStorage.removeItem(key.toString());
            localStorage.setItem(i.toString(), JSON.stringify(new TodoElement(interpret, price, date)));
            createEvent(interpret, price, date);
            key++;
        }
    }
    function enterEvent() {
        let interpret = interpretInput.value;
        let price = parseInt(priceInput.value);
        let datetime = new Date(datetimeInput.value);
        console.log(interpret + "\n" + priceInput + "\n" + datetime);
        let todoElement = new TodoElement(interpret, price, datetime);
        let json = JSON.stringify(todoElement);
        localStorage.setItem(elementID.toString(), json);
        createEvent(interpret, price, datetime);
    }
    function createEvent(interpret, price, datetime) {
        let tr = document.createElement("tr");
        let interpretElement = document.createElement("td");
        let priceElement = document.createElement("td");
        let datetimeElement = document.createElement("td");
        let l??schenElement = document.createElement("td");
        let l??schenButton = document.createElement("button");
        tr.id = "l??schen" + elementID.toString();
        l??schenButton.id = elementID.toString();
        interpretElement.innerText = interpret;
        priceElement.innerText = price + "";
        datetimeElement.innerText = datetime + "";
        l??schenButton.innerHTML = "l??schen";
        l??schenElement.append(l??schenButton);
        l??schenElement.addEventListener("click", eventL??schen);
        tr.appendChild(interpretElement);
        tr.appendChild(priceElement);
        tr.appendChild(datetimeElement);
        tr.appendChild(l??schenElement);
        eventtabelle.appendChild(tr);
        elementID++;
    }
    function eventL??schen(eventL??schen) {
        let eventID = eventL??schen.target.id;
        console.log(eventID);
        let tr = document.getElementById("l??schen" + eventID);
        localStorage.removeItem(eventID.toString());
        tr.remove();
    }
    function saveButtonHandler() {
        console.log("Save Button clicked");
        console.log("aktuelle Input: " + inputFeld.value);
        localStorage.setItem("Abgabe4", inputFeld.value);
    }
    function loadButtonHandler() {
        console.log("Load Button clicked");
        let valueFromLocalStorage = localStorage.getItem("Abgabe4");
        console.log("aktueller Wert im Local Storage: " + valueFromLocalStorage);
        display.textContent = valueFromLocalStorage;
    }
})(LocalStorage || (LocalStorage = {}));
//# sourceMappingURL=LocalStorage.js.map
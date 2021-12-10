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
    if (localStorage.getItem(elementID.toString()) !== null) {
        load();
    }
    console.log("Test");
    function load() {
        for (let i = 0; i < localStorage.length; i++) {
            let interpret = interpretInput.value;
            let price = parseInt(priceInput.value);
            let datetime = new Date(datetimeInput.value);
            interpret = (JSON.parse(localStorage.getItem(i.toString()))).interpret;
            price = (JSON.parse(localStorage.getItem(i.toString()))).price;
            datetime = (JSON.parse(localStorage.getItem(i.toString()))).datetime;
            createEvent(interpret, price, datetime);
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
        let löschenElement = document.createElement("td");
        let löschenButton = document.createElement("button");
        tr.id = "löschen" + elementID.toString();
        löschenButton.id = elementID.toString();
        interpretElement.innerText = interpret;
        priceElement.innerText = price + "";
        datetimeElement.innerText = datetime + "";
        löschenButton.innerHTML = "löschen";
        löschenElement.append(löschenButton);
        löschenElement.addEventListener("click", eventLöschen);
        tr.appendChild(interpretElement);
        tr.appendChild(priceElement);
        tr.appendChild(datetimeElement);
        tr.appendChild(löschenElement);
        eventtabelle.appendChild(tr);
        elementID++;
    }
    function eventLöschen(eventLöschen) {
        let eventID = eventLöschen.target.id;
        console.log(eventID);
        let tr = document.getElementById("löschen" + eventID);
        tr.remove();
        localStorage.removeItem(eventID.toString());
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
namespace LocalStorage {

    class TodoElement {
        interpret: string;
        price: number;
        date: Date;

        constructor(interpret: string, price: number, date: Date) {
            this.interpret = interpret;
            this.price = price;
            this.date = date;
        }
    }


    const inputFeld: HTMLInputElement = <HTMLInputElement>document.getElementById("input-element");
    const saveButton: HTMLElement = <HTMLButtonElement>document.getElementById("save-button");
    const loadButton: HTMLElement = <HTMLButtonElement>document.getElementById("load-button");
    const display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");

    const interpretInput: HTMLInputElement = <HTMLInputElement>document.getElementById("interpret");
    const datetimeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("datetime");
    const priceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("price");
    const entereventButton: HTMLElement = <HTMLButtonElement>document.getElementById("enterevent");
    const eventtabelle: HTMLElement = <HTMLElement>document.getElementById("eventtabelle");

    let elementID: number = 0;

    saveButton.addEventListener("click", saveButtonHandler);
    loadButton.addEventListener("click", loadButtonHandler);
    entereventButton.addEventListener("click", enterEvent);

    if (localStorage.getItem(elementID.toString()) !== null) {
        load();
    }

    console.log("Test");

    function load(): void {
        for (let i: number = 0; i < localStorage.length; i++) {

            let interpret: string = interpretInput.value;
            let price: number = parseInt(priceInput.value);
            let datetime: Date = new Date(datetimeInput.value);

            interpret = (JSON.parse(localStorage.getItem(i.toString()))).interpret;
            price = (JSON.parse(localStorage.getItem(i.toString()))).price;
            datetime = (JSON.parse(localStorage.getItem(i.toString()))).datetime;

            createEvent(interpret, price, datetime);
        }
    }

    function enterEvent(): void {
        let interpret: string = interpretInput.value;
        let price: number = parseInt(priceInput.value);
        let datetime: Date = new Date(datetimeInput.value);
        console.log(interpret + "\n" + priceInput + "\n" + datetime);

        let todoElement: TodoElement = new TodoElement(interpret, price, datetime);
        let json: string = JSON.stringify(todoElement);
        localStorage.setItem(elementID.toString(), json);

        createEvent(interpret, price, datetime);
    }

    function createEvent(interpret: string, price: number, datetime: Date): void {
        let tr: HTMLElement = document.createElement("tr");
        let interpretElement: HTMLElement = document.createElement("td");
        let priceElement: HTMLElement = document.createElement("td");
        let datetimeElement: HTMLElement = document.createElement("td");
        let löschenElement: HTMLElement = document.createElement("td");
        let löschenButton: HTMLElement = document.createElement("button");

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

    function eventLöschen(eventLöschen: Event): void {

        let eventID: string = (<HTMLElement>eventLöschen.target).id;
        console.log(eventID);
        let tr: HTMLElement = document.getElementById("löschen" + eventID);
        tr.remove();
        localStorage.removeItem(eventID.toString());
    }

    function saveButtonHandler(): void {
        console.log("Save Button clicked");
        console.log("aktuelle Input: " + inputFeld.value);
        localStorage.setItem("Abgabe4", inputFeld.value);
    }

    function loadButtonHandler(): void {
        console.log("Load Button clicked");
        let valueFromLocalStorage: string = localStorage.getItem("Abgabe4");
        console.log("aktueller Wert im Local Storage: " + valueFromLocalStorage);
        display.textContent = valueFromLocalStorage;
    }
}
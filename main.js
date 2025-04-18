const makeDiv = (className) => { //Arrow function létrehozása aminek a className a bemeneti paramétere
    const div = document.createElement("div"); //div elem létrehozása
    div.className = className; //className adása a div elemnek
    return div; //Visszatérés a divvel
}
const containerDiv = makeDiv("container"); //containerdiv létrehozása, aminek a container lesz a classa
document.body.appendChild(containerDiv); //containerdiv hozzáadása a bodyhoz

const tableDiv = makeDiv("table"); //tablediv létrehozása, aminek a table lesz a classa

const tableelement = document.createElement('table'); //table elem létrehozása és eltárolása egy változóba
tableDiv.appendChild(tableelement); //tableelement hozzáadása a tableDivhez
 
const head = document.createElement('thead'); //thead elem létrehozása és eltárolása egy változóba
tableelement.appendChild(head); //head hozzáadása a tableelementhez
 
const headrow =  document.createElement('tr'); //tr elem létrehozása és eltárolása egy változóba
head.appendChild(headrow) //headrow hozzáadása a headhez
 
const headcell = ['szerző', 'műfaj', 'cím']; //tömb a fejléc tartalmával
for(const cell of headcell){ //headcell tömb bejárása
    const thcell = document.createElement('th'); //th elem létrehozása és eltárolása egy változóba
    thcell.innerText = cell; //thcell tartalma a cellában lévő elem lesz
    headrow.appendChild(thcell); //thcell hozzáadása a headrowhoz
}

const tbody = document.createElement('tbody'); //tbody elem létrehozása és eltárolása egy változóba
tableelement.appendChild(tbody); //tbody hozzáadása a tableelementhez

containerDiv.appendChild(tableDiv); //tablediv hozzáadása a containerdivhez
 
const formDiv = makeDiv("form"); //formdiv létrehozása, aminek a form lesz a classa
const formSim = document.createElement('form'); //form létrehozása
formDiv.appendChild(formSim); //formSim hozzáadása a formDivhez
 
const fieldElementList = [{ //tömb létrehozása, benne 3 objektummal
    fieldid: 'szerzo', //1. objektum idja
    fieldLabel: 'szerző' //1. objektum labelje
},
{
    fieldid: 'mufaj', //2. objektum idja
    fieldLabel: 'műfaj' //2. objektum labelje
},
{
    fieldid: 'cim', //3. objektum idja
    fieldLabel: 'cím' //3. objektum labelje
}];
 
for(const fieldElement of fieldElementList){ //fieldElementList tömb bejárása
    const field = makeDiv('field'); //field létrehozása
    formSim.appendChild(field); //field hozzáadása a formSimhez
 
    const label = document.createElement('label'); //label létrehozása
    label.htmlFor = fieldElement.fieldid; //beállítja hogy melyik inputhoz tartozik
    label.textContent = fieldElement.fieldLabel; //label szövegének beállítása
    field.appendChild(label); //label hozzáadása a fieldhez

    const input = document.createElement('input'); //sima input mező létrehozása
    input.id = fieldElement.fieldid; //id beállítása
    field.appendChild(document.createElement('br')); //sortörés, hogy az input új sorba legyen
    field.appendChild(input); //input hozzáadása a fieldhez
}

const buttonFormSim = document.createElement('button'); //gomb létrehozása
buttonFormSim.textContent = 'hozzáadás'; //gomb szövegének beállítása(hozzáadás)
formSim.appendChild(buttonFormSim); //buttonFormSim hozzáadása a formSimhez

containerDiv.appendChild(formDiv); //formdiv hozzáadása a containerdivhez
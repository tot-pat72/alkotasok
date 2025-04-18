const array = [];
const makeDiv = (className) => { //Arrow function létrehozása aminek a className a bemeneti paramétere
    const div = document.createElement("div"); //div elem létrehozása
    div.className = className; //className adása a div elemnek
    return div; //Visszatérés a divvel
}
const filter = (dataArray, callback) => { //Arrow function létrehozása aminek a dataArray és a callback a bemeneti paramétere
    const result = []; //üres tömb létrehozása, a szürt elemeknek
    for(const element of dataArray){ //dataArray bejárása
        if(callback(element)){ //ha a callback függvény truet ad vissza
            result.push(element); //result hozzáadása a tömbhöz
        }
    }
    return result; //visszatérés resulttal
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

    field.appendChild(document.createElement('br')); //sortörés hozzáadása a fieldhez
    const error = document.createElement('span'); //span létrehozása a hiba üzenetnek
    error.className = 'error'; //className adása az error elemnek, ami az error lesz
    field.appendChild(error); //error hozzáadása a fieldhez
}

const buttonFormSim = document.createElement('button'); //gomb létrehozása
buttonFormSim.textContent = 'hozzáadás'; //gomb szövegének beállítása(hozzáadás)
formSim.appendChild(buttonFormSim); //buttonFormSim hozzáadása a formSimhez

formSim.addEventListener('submit', (e)=> { //form elküldésével fut le
    e.preventDefault(); //az oldal újra frissülésének megakadályozása
    const valueObject = {}; //üres objektum létrehozása, a mezők értékeinek az eltárolása
    const inputFields = e.target.querySelectorAll('input'); //az összes input mező lekérése a formból
    let valid = true; //valid változó létrehozása, aminek az kezdő értéke igaz
    for(const inputField of inputFields){ //inputFields bejárása
        const error = inputField.parentElement.querySelector('.error'); //error classal rendelkező elem eltárolása egy változóban
        if(!error){ //ha nem létezik ilyen mező
            console.error('nincs errorfield'); //nincs errorfield hibaüzenet kiírása a konzolra
            return; //visszatérés
        }
        error.textContent = ''; //hibaüzenet mező kiürítése
        if(inputField.value === ''){ //ha az inputField üres
            error.textContent = 'Kötelező megadni!'; //hibaüzenetet kiírása
            valid = false; //valid értéke false lesz
        }
        valueObject[inputField.id] = inputField.value; //A mező idje lesz a kulcs az objektumban, az aktuális input mező értékének a hozzárendelése.
    }
    if(valid){ //ha a valid értéke true
    array.push(valueObject); //adatok hozzáadása a tömbhöz

    const tableBodyRow = document.createElement('tr'); //új sor létrehozása
    tbody.appendChild(tableBodyRow); //tableBodyRow hozzáadása a tbodyhoz
 
    const szerzoCell = document.createElement('td'); //új cella létrehozása a szerzőnek
    szerzoCell.textContent = valueObject.szerzo; //cella tartalma a szerző értéke
    tableBodyRow .appendChild(szerzoCell); //szerzoCell hozzáadása a tableBodyRowhoz

    const mufajCell = document.createElement('td'); //új cella létrehozása a műfajnak
    mufajCell.textContent = valueObject.mufaj; //cella tartalma a műfaj értéke
    tableBodyRow .appendChild(mufajCell); //mufajCell hozzáadása a tableBodyRowhoz
 
    const cimCell = document.createElement('td'); //új cella létrehozása a címnek
    cimCell.textContent = valueObject.cim; //cella tartalma a cím értéke
    tableBodyRow .appendChild(cimCell); //cimCell hozzáadása a tableBodyRowhoz
    }
})

containerDiv.appendChild(tableDiv); //tablediv hozzáadása a containerdivhez
containerDiv.appendChild(formDiv); //formdiv hozzáadása a containerdivhez

const fileInput = document.createElement('input'); //input létrehozása
containerDiv.appendChild(fileInput); //fileInput hozzáadása a containerDivhez
fileInput.id = 'fileinput'; //fileInput idje fileinput lesz
fileInput.type = 'file'; //fileInput típusa file lesz
fileInput.addEventListener('change', (e) => { //eseménykezelő létrehozása a fileInput elemhez
    const file = e.target.files[0]; //első fájl kiválasztása
    const fileReader = new FileReader(); //FileReader osztály létrehozása
    fileReader.onload = () => { //fájl betöltődése
        const fileLines = fileReader.result.split('\n'); //tömb tartalmának a sorokra bontása
        const removedLines = fileLines.slice(1); //fejléc eltávolítása a tömbből
        for (const line of removedLines) { //removedLines bejárása
            const trimmedLine  = line.trim(); //felesleges szóközöket kiszedése
            const fields = trimmedLine .split(';'); //sorok szétszedése a pontosvesszők mentén
            const adat = { //objektum létrehozása
                szerzo: fields[0], //objektum 1.eleme
                mufaj: fields[1], //objektum 2.eleme
                cim: fields[2] //objektum 3.eleme
            };
            array.push(adat); //adatok hozzáadása a tömbhöz
            const tableBodyRow = document.createElement('tr'); //új sor létrehozása
            tbody.appendChild(tableBodyRow); //tableBodyRow hozzáadása a tbodyhoz
 
            const szerzoCell = document.createElement('td'); //új cella létrehozása a szerzőnek
            szerzoCell.textContent = adat.szerzo; //cella tartalma a szerző értéke
            tableBodyRow .appendChild(szerzoCell); //szerzoCell hozzáadása a tableBodyRowhoz
        
            const cimCell = document.createElement('td'); //új cella létrehozása a címnek
            cimCell.textContent = adat.cim; //cella tartalma a cím értéke
            tableBodyRow .appendChild(cimCell); //cimCell hozzáadása a tableBodyRowhoz

            const mufajCell = document.createElement('td'); //új cella létrehozása a műfajnak
            mufajCell.textContent = adat.mufaj; //cella tartalma a műfaj értéke
            tableBodyRow .appendChild(mufajCell); //mufajCell hozzáadása a tableBodyRowhoz
        }
    };
    fileReader.readAsText(file); //fájl beolvasása szövegként
});

const exportButton = document.createElement('button'); //új gomb létrehozása
exportButton.textContent = 'Letöltés'; //gomb szövege a Letöltés lesz
containerDiv.appendChild(exportButton); //exportButton hozzáadása a containerDivhez
exportButton.addEventListener('click', () => { //eseménykezelő létrehozása az exportButton elemhez
    const link = document.createElement('a'); //link elem létrehozása
    const contentArray = ['szerzo;mufaj;cim'] //contentArray tömb létrehozása, aminek első sora a fejléc
    for(const data of array){ //array bejárása
        contentArray.push(`${data.szerzo};${data.mufaj};${data.cim}`); //sorok hozzáadása a tömbhöz
    }
    const content = contentArray.join('\n'); //tömb átalakítása szöveggé(string), elválasztás soronként
    const file = new Blob([content]) //Blob létrehozása
    link.href = URL.createObjectURL(file);// A fájlhoz tartozó ideiglenes URL létrehozása, hogy letölthető legyen a fájl
    link.download = 'newdata.csv' //letöltött fájl nevének megadása
    link.click(); //linkre kattintásnál elindul a letöltés
    URL.revokeObjectURL(link.href); //ideiglenes URL visszavonása
})

const filterFormDiv = makeDiv('filterForm') //filterFormDiv létrehozása, aminek a filterForm lesz a classa
containerDiv.appendChild(filterFormDiv); //filterFormDiv hozzáadása a containerDivhez
 
const formForFilter = document.createElement('form'); //form létrehozása
filterFormDiv.appendChild(formForFilter); //formForFilter hozzáadása a filterFormDivhez
 
const select = document.createElement('select'); //legördülő lista létrehozása
formForFilter.appendChild(select); //select hozzáadása a formForFilterhez
 
const options = [{ //tömb létrehozása, benne objektummal
    value: '', //lista 1.értéke
    innerText: '' //üres szöveg
},
{
    value: 'szerzo', //lista 2.értéke
    innerText: 'szerző' //szövege: szerző
},
{
    value: 'mufaj', //lista 3.értéke
    innerText: 'műfaj' //szövege: műfaj
},
{
    value: 'cim', //lista 4.értéke
    innerText: 'cím' //szövege: cím
}]
 

for(const option of options){ //options tömb bejárása
    const optionElement = document.createElement('option'); //optionElement létrehozása
    optionElement.value = option.value; //érték beállítása
    optionElement.innerText = option.innerText //megjelenő szöveg beállítása
    select.appendChild(optionElement); //optionElement hozzáadása a selecthez
}
 
const filterInputField = document.createElement('input'); //input létrehozása
filterInputField.id = 'filterInput'; //filterInputField idje filterInput lesz
formForFilter.appendChild(filterInputField); //filterInputField hozzáadása a formForFilterhez
 
const button = document.createElement('button'); //új gomb létrehozása
button.innerText = 'Szűrés'; //gomb szövege a Szűrés lesz
formForFilter.appendChild(button); //button hozzáadása a formForFilterhez
 
formForFilter.addEventListener('submit', (e) => { //eseménykezelő létrehozása a formForFilter submit eseményére
    e.preventDefault(); //az oldal újra frissülésének megakadályozása
    const filterInput = e.target.querySelector('#filterInput'); //filterinput classal rendelkezö elem kiválasztása
    const select = e.target.querySelector('select'); //select classal rendelkezö elem kiválasztása
    const filteredArray = filter(array, (element) => { //filteredArray létrehozása a megadott mező és érték alapján
        if(select.value == 'szerzo'){ //ha a kiválasztott mező a szerzo
            if(filterInput.value === element.szerzo){ //ha a filterInput értéke egyenlő a szerzo értékével
                return true; //visszatérés igazzal
            }
        }
        else if(select.value == 'mufaj'){ //ha a kiválasztott mező az mufaj
            if(filterInput.value === element.mufaj){ //ha a filterInput értéke egyenlő a mufaj értékével
                return true; //visszatérés igazzal
            }
        }
        else if(select.value == 'cim'){ //ha a kiválasztott mező a cim
            if(filterInput.value === element.cim){ //ha a filterInput értéke egyenlő a cim értékével
                return true; //visszatérés igazzal
            }
        }
        else{
            return true; //visszatérés igazzal
        }
    })
    tbody.innerHTML = ''; //táblázat kiürítése
    for(const filteredElement of filteredArray){ //filteredArray bejárása
        const tableBodyRow = document.createElement('tr'); //új sor létrehozása
            tbody.appendChild(tableBodyRow); //tableBodyRow hozzáadása a tbodyhoz
 
            const szerzoCell = document.createElement('td'); //új cella létrehozása a szerzőnek
            szerzoCell.textContent = filteredElement.szerzo; //cella tartalma a szerző értéke
            tableBodyRow .appendChild(szerzoCell); //szerzoCell hozzáadása a tableBodyRowhoz
        
            const cimCell = document.createElement('td'); //új cella létrehozása a címnek
            cimCell.textContent = filteredElement.cim; //cella tartalma a cím értéke
            tableBodyRow .appendChild(cimCell); //cimCell hozzáadása a tableBodyRowhoz

            const mufajCell = document.createElement('td'); //új cella létrehozása a műfajnak
            mufajCell.textContent = filteredElement.mufaj; //cella tartalma a műfaj értéke
            tableBodyRow .appendChild(mufajCell); //mufajCell hozzáadása a tableBodyRowhoz
    }
})
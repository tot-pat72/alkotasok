class Area{ //Area osztály létrehozása
    #div //privát változó létrehozása
    #manager //privát változó létrehozása

    /**
     * @returns {HTMLDivElement}
     */
    get div(){ //get létrehozása, hogy el lehessen érni a divet
        return this.#div //Visszatérés a divvel
    }

    /**
     * @returns {Manager}
     */
    get manager(){ //get létrehozása, hogy el lehessen érni a managert
        return this.#manager //Visszatérés a managerrel
    }
    /**
     * 
     * @param {string} className
     * @param {Manager} manager
     */
    constructor(className, manager){ //constructor létrehozása aminek a className és a manager a bemeneti paramétere
        this.#manager = manager; //manager értéke a bemeneti paraméter
        const container = this.#getContainerDiv(); //#getContainerDiv meghívása és ennek eltárolása egy változóba
        this.#div = document.createElement("div"); //új privát div elem létrehozása
        this.#div.className = className; //className adása a div elemnek
        container.appendChild(this.#div); //div hozzáadása a containerhez
    }
        
    #getContainerDiv(){
        let containerDiv = document.querySelector(".containeroop"); //containeroop classal rendelkező elem eltárolása egy változóban
        if(!containerDiv){ //Ha nincs ilyen elem
            containerDiv = document.createElement("div"); //div elem létrehozása
            containerDiv.className = "containeroop"; //className adása a div elemnek
            document.body.appendChild(containerDiv); //containerdiv hozzáadása a bodyhoz
        }
        return containerDiv; //Visszatérés a containerDivvel
    }
}

class Table extends Area{ //Table osztály létrehozása, ami az Area leszármazottja
    /**
     * 
     * @param {string} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager){ //constructor létrehozása aminek két bemeneti paramétere van
        super(cssClass, manager); //Area osztály constructorának meghívása
        const tbody = this.#createTable(); //createTable visszatérési értékének az eltárolása egy változóba
        this.manager.setAddDataCallback((datas) => { //arrow function létrehozása 
        const tableBodyRow = document.createElement('tr'); //új sor létrehozása
        tbody.appendChild(tableBodyRow); //tableBodyRow hozzáadása a tbodyhoz
 
        const szerzoCell = document.createElement('td'); //új cella létrehozása a szerzőnek
        szerzoCell.textContent = datas.szerzo; //cella tartalma a szerző értéke
        tableBodyRow .appendChild(szerzoCell); //szerzoCell hozzáadása a tableBodyRowhoz
    
        const cimCell = document.createElement('td'); //új cella létrehozása a címnek
        cimCell.textContent = datas.cim; //cella tartalma a cím értéke
        tableBodyRow .appendChild(cimCell); //cimCell hozzáadása a tableBodyRowhoz

        const mufajCell = document.createElement('td'); //új cella létrehozása a műfajnak
        mufajCell.textContent = datas.mufaj; //cella tartalma a műfaj értéke
        tableBodyRow .appendChild(mufajCell); //mufajCell hozzáadása a tableBodyRowhoz
        })
    }

    #createTable(){ //táblázat létrehozása
        const table = document.createElement('table'); //table elem létrehozása és eltárolása egy változóba
        this.div.appendChild(table); //table hozzáadása az Area által létre hozoztt divhez
 
        const head = document.createElement('thead'); //thead elem létrehozása és eltárolása egy változóba
        table.appendChild(head); //head hozzáadása a tableelementhez
 
        const headrow =  document.createElement('tr'); //tr elem létrehozása és eltárolása egy változóba
        head.appendChild(headrow) //headrow hozzáadása a headhez

        const headcell = ['szerző', 'műfaj', 'cím']; //tömb a fejléc tartalmával
        for(const cell of headcell){ //headcell tömb bejárása
            const thcell = document.createElement('th'); //th elem létrehozása és eltárolása egy változóba
            thcell.innerText = cell; //thcell tartalma a cellában lévő elem lesz
            headrow.appendChild(thcell); //thcell hozzáadása a headrowhoz
        }
 
        const tbody = document.createElement('tbody'); //tbody elem létrehozása és eltárolása egy változóba
        table.appendChild(tbody); //tbody hozzáadása a tableelementhez
        return tbody; //Visszatérés a tbodyval
    }
}

class Form extends Area{ //Form osztály létrehozása, ami az Area leszármazottja
    #formField //privát változó létrehozása
    /**
     * @param {string} cssClass
     */
    constructor(cssClass, fieldConfig, manager){ //constructor létrehozása aminek három bemeneti paramétere van
        super(cssClass, manager) //Area osztály constructorának meghívása
        this.#formField = []; //üres tömb létrehozása
 
        const form = document.createElement('form'); //form létrehozása
        this.div.appendChild(form); //form hozzáadása az Area által létre hozoztt divhez
         
        for(const fieldElement of fieldConfig){ //fieldConfig tömb bejárása
            const formField = new FormField(fieldElement.fieldid, fieldElement.fieldLabel); //új FormField objektum létrehozása
            this.#formField.push(formField); //formfield eltárolása a tömbben
            form.appendChild(formField.getDiv()); //formFieldhez tartozó elemek hozzáadása a formhoz
        }

        const button = document.createElement('button'); //gomb létrehozása
        button.textContent = 'hozzáadás'; //gomb szövegének beállítása(hozzáadás)
        form.appendChild(button); //button hozzáadása a formhoz

        form.addEventListener('submit', (e)=> { //form elküldésével fut le
            e.preventDefault(); //az oldal újra frissülésének megakadályozása
            const valueObject = {}; //üres objektum létrehozása, a mezők értékeinek az eltárolása
            let valid = true; //valid változó létrehozása, aminek az kezdő értéke igaz
            for(const inputField of this.#formField){ //formField bejárása
                inputField.error = ''; //hibaüzenet mező kiürítése
                if(inputField.value === ''){ //ha az inputField üres
                    inputField.error = 'Kötelező megadni!'; //hibaüzenetet kiírása
                    valid = false; //valid értéke false lesz
                }
                valueObject[inputField.id] = inputField.value; //A mező idje lesz a kulcs az objektumban, az aktuális input mező értékének a hozzárendelése.
            }
            if(valid){ //ha a valid értéke true
                const data = new Data(valueObject.szerzo, valueObject.mufaj, valueObject.cim); //új Data objektum létrehozása a felhasználó által megadott adatokkal
                this.manager.addData(data); //új objektum hozzáadása a managerhez
            }
        })
    }
}

class Upload extends Area { //Upload osztály létrehozása, ami az Area leszármazottja
    constructor(cssClass, manager) { //constructor létrehozása aminek két bemeneti paramétere van
        super(cssClass, manager); //Area osztály constructorának meghívása
        const fileInput = document.createElement('input'); //input létrehozása
        fileInput.id = 'fileinput'; //fileInput idje fileinput lesz
        fileInput.type = 'file'; //fileInput típusa file lesz
        this.div.appendChild(fileInput); //fileInput hozzáadása az Area által létre hozoztt divhez
        fileInput.addEventListener('change', (e) => { //eseménykezelő létrehozása a fileInput elemhez
            const file = e.target.files[0]; //első fájl kiválasztása
            const fileReader = new FileReader(); //FileReader osztály létrehozása
            fileReader.onload = () => { //fájl betöltődése
                const fileLines = fileReader.result.split('\n'); //tömb tartalmának a sorokra bontása
                const removedLines  = fileLines.slice(1); //fejléc eltávolítása a tömbből
                for(const line of removedLines) { //removedLines bejárása
                    const trimmedLine = line.trim(); //felesleges szóközöket kiszedése
                    const fields = trimmedLine.split(';'); //sorok szétszedése a pontosvesszők mentén
                    const adat = new Data(fields[0], (fields[1]), fields[2]); //objektum létrehozása, a fájl elemeivel
                    this.manager.addData(adat); //új objektum hozzáadása a managerhez
                }
            };
            fileReader.readAsText(file); //fájl beolvasása szövegként
        });
    }
}

class FormField { //FormField osztály létrehozása
    #id; //privát változó létrehozása
    #inputElement; //privát változó létrehozása
    #labelElement; //privát változó létrehozása
    #errorElement; //privát változó létrehozása
 
    get id() { //get létrehozása, hogy el lehessen érni az idét
        return this.#id; //Visszatérés az idvel
    }
 
    get value() { //get létrehozása, hogy el lehessen érni a valuet
        return this.#inputElement.value; //Visszatérés a valueval
    }
 
    set error(value) { //set létrehozása, hogy be lehessen állítani a error valuet
        this.#errorElement.textContent = value; //errorElement szövegének beállítása a kapott értékre
    }

    constructor(id, labelContent) { //constructor létrehozása aminek két bemeneti paramétere van
        this.#id = id; //id értéke a bemeneti paraméter
        this.#labelElement = document.createElement('label'); //label elem létrehozása
        this.#labelElement.htmlFor = id; //label beállítása, hogy melyik inputhoz tartozik
        this.#labelElement.textContent = labelContent; //label szövegének beállítása
        this.#inputElement = document.createElement('input'); //input mező létrehozása
        this.#inputElement.id = id; //id beállítása
        this.#errorElement = document.createElement('span'); //span elem létrehozása
        this.#errorElement.className = 'error'; //className adása, ami az error lesz
    }
 
    getDiv() { //metódus, ami visszaadja a teljes mezőt egy div-ben
        const div = makeDiv('field'); //div elem létrehozása, amibe az elemek kerülnek
        const br1 = document.createElement('br'); //első sortörés
        const br2 = document.createElement('br'); //második sortörés
        const elements = [this.#labelElement, br1, this.#inputElement, br2, this.#errorElement]; //tömbbe, az összes elem belerakása
        for (const element of elements) { //elements tömb bejárása
            div.appendChild(element); //element hozzáadása a divhez
        }
        return div; //Visszatérés a divvel
    }
}
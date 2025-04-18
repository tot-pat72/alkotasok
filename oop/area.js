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
    
        const mufajCell = document.createElement('td'); //új cella létrehozása a műfajnak
        mufajCell.textContent = datas.mufaj; //cella tartalma a műfaj értéke
        tableBodyRow .appendChild(mufajCell); //mufajCell hozzáadása a tableBodyRowhoz
     
        const cimCell = document.createElement('td'); //új cella létrehozása a címnek
        cimCell.textContent = datas.cim; //cella tartalma a cím értéke
        tableBodyRow .appendChild(cimCell); //cimCell hozzáadása a tableBodyRowhoz
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
    /**
     * @param {string} cssClass
     */
    constructor(cssClass, fieldConfig, manager){ //constructor létrehozása aminek három bemeneti paramétere van
        super(cssClass, manager) //Area osztály constructorának meghívása
 
        const form = document.createElement('form'); //form létrehozása
        this.div.appendChild(form); //form hozzáadása az Area által létre hozoztt divhez
         
        for(const fieldElement of fieldConfig){ //fieldConfig tömb bejárása
            const field = makeDiv('field'); //field létrehozása
            form.appendChild(field); //field hozzáadása a formhoz
         
            const label = document.createElement('label'); //label létrehozása
            label.htmlFor = fieldElement.fieldid; //beállítja hogy melyik inputhoz tartozik
            label.textContent = fieldElement.fieldLabel; //label szövegének beállítása
            field.appendChild(label); //label hozzáadása a fieldhez
        
            const input = document.createElement('input'); //sima input mező létrehozása
            input.id = fieldElement.fieldid; //id beállítása
            field.appendChild(document.createElement('br')); //sortörés, hogy az input új sorba legyen
            field.appendChild(input); //input hozzáadása a fieldhez
        }

        const button = document.createElement('button'); //gomb létrehozása
        button.textContent = 'hozzáadás'; //gomb szövegének beállítása(hozzáadás)
        form.appendChild(button); //button hozzáadása a formhoz

        form.addEventListener('submit', (e)=> { //form elküldésével fut le
            e.preventDefault(); //az oldal újra frissülésének megakadályozása
            const valueObject = {}; //üres objektum létrehozása, a mezők értékeinek az eltárolása
            const inputFields = e.target.querySelectorAll('input'); //az összes input mezőt lekérése a formból
            for(const inputField of inputFields){ //inputFields bejárása
                valueObject[inputField.id] = inputField.value; //A mező idje lesz a kulcs az objektumban, az aktuális input mező értékének a hozzárendelése.
            }
            const data = new Data(valueObject.szerzo, valueObject.mufaj, valueObject.cim) //új Data objektum létrehozása a felhasználó által megadott adatokkal
            this.manager.addData(data) //új objektum hozzáadása a managerhez
        })
    }
}
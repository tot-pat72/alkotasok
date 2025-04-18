/**
 * @callback addDataCallback
 * @param {HTMLElement} tbody
 * @returns {void}
 * 
 * @callback renderTableCallback
 * @param {HTMLElement} tbody
 * @returns {void}
 */
class Manager { //Manager osztály létrehozása
    /**
     * @type {Data[]}
     */
    #array; //privát változó létrehozása
    /**
     * @type {addDataCallback}
     */
    #addDataCallback; //privát változó létrehozása
    /**
     * @type {renderTableCallback}
     */
    #renderTableCallback; //privát változó létrehozása
 
    constructor() { //constructor létrehozása
        this.#array = []; //privát változó egy üres tömb
    }

    /**
     * 
     * @param {{function(Alkotas): void}} callback - callback függvény, amely adatokat fogad.
     */
    setAddDataCallback(callback) { //callback függvény beállítása
        this.#addDataCallback = callback; //callback függvény eltárolása egy privát változóban
    }
 
    /**
     * 
     * @param {{function(Alkotas): void}} callback - callback függvény, amely egy adat tömböt vár, és rendereli azt a táblázatban.
     */
    setRenderTableCallback(callback){ //callback függvény beállítása
        this.#renderTableCallback = callback; //callback függvény eltárolása egy privát változóban
    }

    /**
     * 
     * @param {Data} data 
     */
    addData(data) { //új adat hozzáaadása a listához
        this.#array.push(data); //az adat belerakása a privát tömbbe
        this.#addDataCallback(data); //callback meghívása és új adat átadása
    }

    /**
     * 
     * @param {{function(Alkotas): void}} callback -callback függvény, amely egy adatot vár paraméterként, és igaz vagy hamis értéket ad vissza.
     */
    filter(callback){ //callback függvény beállítása
        const result = []; //üres tömb létrehozása, a szürt elemeknek
        for(const data of this.#array){ //array bejárása
            if(callback(data)){ //ha a callback függvény truet ad vissza
                result.push(data); //result hozzáadása a tömbhöz
            }
        }
        this.#renderTableCallback(result); //renderTableCallback meghívása a szürt adatokkal
    }

    /**
     * 
     * @returns {string}
     */
    generateExportString(){ //a fájl tartalmának legenerálása szövegként
        const result = ['szerzo;mufaj;cim'] //result tömb létrehozása, aminek első sora a fejléc
        for(const data of this.#array){ //privát array bejárása
            result.push(`${data.szerzo};${data.mufaj};${data.cim}`); //sorok hozzáadása a tömbhöz
        }
        return result.join('\n'); //tömb átalakítása szöveggé(string), elválasztás soronként
    }

    /**
    * 
    * @param {string} property 
    * @param {string} value 
    * @returns {Number}
    */
    counter(property, value){ //counter függvény létrehozása
        let counter = 0; //számláló létrehozása
        for(const alkotas of this.#array){ //privát array bejárása
            if(alkotas[property].toLowerCase().includes(value.toLowerCase())){ //ha az adott mező tartalmazza a keresett értéket
                counter++; //számláló növelése
            }
        }
        return counter; //visszatérés counterrel
    }
}
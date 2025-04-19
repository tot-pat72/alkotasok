/**
 * @callback addDataCallback
 * @param {Data} Data
 * @returns {void}
 * 
 * @callback renderTableCallback
 * @param {Data[]} Data[]
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
     * @param {addDataCallback} callback - callback függvény, amely adatokat fogad.
     */
    setAddDataCallback(callback) { //callback függvény beállítása
        this.#addDataCallback = callback; //callback függvény eltárolása egy privát változóban
    }
 
    /**
     * 
     * @param {renderTableCallback} callback - callback függvény, amely egy adat tömböt vár, és rendereli azt a táblázatban.
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
     * @param {function(string, string): boolean} callback
     * @param {string} property
     * @param {string} value
     * @returns {Number}
     * 
     */
    counter(callback, property, value){ //counter függvény létrehozása
        let counter = 0; //számláló létrehozása
        for(const item of this.#array){ //privát array bejárása
            if(callback(item[property], value)){ //ha a callback függvény igaz értéket ad vissza
                counter++; //számláló növelése
            }
        }
        return counter; //visszatérés counterrel
    }
}
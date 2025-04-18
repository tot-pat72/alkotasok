class Data { //Adat osztály létrehozása
    /**
     * @type {string}
     */
    #szerzo; //privát változó létrehozása
    /**
     * @type {string}
     */
    #mufaj; //privát változó létrehozása
    /**
     * @type {string}
     */
    #cim; //privát változó létrehozása
 
    /**
     * @returns {string}
     */
    get szerzo(){ //get létrehozása, hogy el lehessen érni a szerzőt
        return this.#szerzo; //Visszatérés a szerzővel
    }
 
    /**
     * @returns {string}
     */
    get mufaj(){ //get létrehozása, hogy el lehessen érni az műfajt
        return this.#mufaj; //Visszatérés az műfajjal
    }
 
    /**
     * @returns {string}
     */
    get cim(){ //get létrehozása, hogy el lehessen érni a cimet
        return this.#cim; //Visszatérés a cimmel
    }

    /**
     * 
     * @param {string} szerzo 
     * @param {string} mufaj 
     * @param {string} cim 
     */
    constructor(szerzo, mufaj, cim) { //constructor létrehozása aminek a szerzo, mufaj és a cim a bemeneti paramétere
        this.#szerzo = szerzo; //szerzo értéke a bemeneti paraméter
        this.#mufaj = mufaj; //mufaj értéke a bemeneti paraméter
        this.#cim = cim; //cim értéke a bemeneti paraméter
    }
}
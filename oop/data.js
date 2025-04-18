class Data { //Adat osztály létrehozása
    #szerzo; //privát változó létrehozása
    #mufaj; //privát változó létrehozása
    #cim; //privát változó létrehozása
 
    get szerzo(){ //get létrehozása, hogy el lehessen érni a szerzőt
        return this.#szerzo; //Visszatérés a szerzővel
    }
 
    get mufaj(){ //get létrehozása, hogy el lehessen érni az műfajt
        return this.#mufaj; //Visszatérés az műfajjal
    }
 
    get cim(){ //get létrehozása, hogy el lehessen érni a cimet
        return this.#cim; //Visszatérés a cimmel
    }

    constructor(szerzo, mufaj, cim) { //constructor létrehozása aminek a szerzo, mufaj és a cim a bemeneti paramétere
        this.#szerzo = szerzo; //szerzo értéke a bemeneti paraméter
        this.#mufaj = mufaj; //mufaj értéke a bemeneti paraméter
        this.#cim = cim; //cim értéke a bemeneti paraméter
    }
}
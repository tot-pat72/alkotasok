class Filter extends Area{ //Filter osztály létrehozása, ami az Area leszármazottja
    constructor(cssclass, manager){ //constructor létrehozása aminek a cssClass és a manager a bemeneti paramétere
        super(cssclass, manager); //Area osztály constructorának meghívása

        const formForFilter = document.createElement('form'); //form létrehozása
        this.div.appendChild(formForFilter); //formForFilter hozzáadása a filterFormDivhez
 
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
 
        const button = this.createButton('Szűrés') //gomb létrehozása a createButton segítségével
        formForFilter.appendChild(button); //button hozzáadása a formForFilterhez
 
        formForFilter.addEventListener('submit', (e) => { //eseménykezelő létrehozása a formForFilter submit eseményére
            e.preventDefault(); //az oldal újra frissülésének megakadályozása
            const filterInput = e.target.querySelector('#filterInput'); //filterinput classal rendelkezö elem kiválasztása
            const select = e.target.querySelector('select'); //select classal rendelkezö elem kiválasztása
            this.manager.filter((element) => { //callback függvény, amely minden elemre lefut
                if(select.value == 'szerzo'){ //ha a kiválasztott mező a szerző
                    if(filterInput.value === element.szerzo){ //ha a filterInput értéke egyenlő a szerző értékével
                        return true; //visszatérés igazzal
                    }
                }
                else if(select.value == 'mufaj'){ //ha a kiválasztott mező a műfaj
                    if(filterInput.value === element.mufaj){ //ha a filterInput értéke egyenlő a műfaj értékével
                        return true; //visszatérés igazzal
                    }
                }
                else if(select.value == 'cim'){ //ha a kiválasztott mező a cím
                    if(filterInput.value === element.cim){ //ha a filterInput értéke egyenlő a cím értékével
                        return true; //visszatérés igazzal
                    }
                }
                else{
                    return true; //visszatérés igazzal
                }
            })    
        })
    }
}
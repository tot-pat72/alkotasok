const separator = document.createElement('hr'); //hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator); //separator hozzáadása a bodyhoz
 
const manager = new Manager() //Manager osztály példányosítása
const table = new Table("table", manager); //Table osztály példányosítása, új objektum létrehozása a table classal

const fieldConfig = [{ //tömb létrehozása, benne 3 objektummal
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
const form = new Form("form", fieldConfig, manager); //Form osztály példányosítása, új objektum létrehozása a form classal
const fileUpload = new UploadDownload('upload', manager); //UploadDownload példányosítása
const filterOop = new Filter('filter', manager); //Filter példányosítása
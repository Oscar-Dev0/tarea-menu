const fs = require("fs");
const { join } = require('node:path');

module.exports = class files {

    link = join(__dirname, "../json")
    /**
     * @param {string} archivo Nombre del archivo 
    * @description en esta funcion ya se agregar el formato Json
     */
    constructor(archivo) {
        Object.defineProperty(this, "link", { value: join(this.link, `${archivo}.json`) });
        this.require();
    };

    /**
     * 
     * @param { {
     * name: string;
     * description: string;
     * } } json 
     */
    create(json) {
        let map = this.require();
        const id = map[0] ? map.reduce((ultimo, actual) => { return actual.id > ultimo.id ? actual : ultimo; }).id + 1 : 1;
        map.push({ id, ...json });

        map = map.sort((a, b) => a.id - b.id);

        const string = JSON.stringify(map, null, 2);
        try {
            fs.writeFileSync(this.link, string);
            return true;
        } catch {
            return false;
        };
    };

    /**
    * @description Funcion para editar un dato en la lista.
    * @param {{ id: number; name?: string; description?: string;}} json 
    */
    edit(json) {
        let datos = this.require();
        const find = datos.find((data) => data.id == json.id);
        if(!find) return false;
        if (json.name) find.name = json.name;
        if (json.description) find.description = json.description;

        /// Quitar el anterior dato y guardarlo.
        datos = datos.filter((data) => data.id != json.id);
        datos.push(find);

        datos = datos.sort((a, b) => a.id - b.id);

        const string = JSON.stringify(datos, null, 2);
        try {
            fs.writeFileSync(this.link, string);
            return true;
        } catch {
            return false;
        };
    };

    /**
     * @description en esta funcion se borra un datos en especifico
     * @param {number} id 
     */
    delete(id){
        let datos = this.require();
        datos = datos.filter((data) => data.id != id);
        datos = datos.sort((a, b) => a.id - b.id);

        const string = JSON.stringify(datos, null, 2);
        try {
            fs.writeFileSync(this.link, string);
            return true;
        } catch {
            return false;
        };
    };

    list(){
        let map = this.require();
        map = map.sort((a, b) => a.id - b.id);
        return map;
    };

    /**
    * Esta función Nos dara los datos del archivo
    * @returns {Array<{id: number; name: string; description: string;}>} los datos del archivo
    */
    require() {

        let data = "";

        try {
            //aca requiro existsSync para lo que es buscar si existe el archiovo o ruta del json que vamos a usar como base de datos
            if (fs.existsSync(this.link)) {
                //si existe vamos a definir los datos de la base de datos.
                data = fs.readFileSync(this.link, "utf-8");
            } else {
                //si no vamos a crear la archivo/DB 
                fs.writeFileSync(this.link, JSON.stringify([], null, 2));
                //definimos una semi base de datos vacio.
                data = "[]";
            };
        } catch (error) {
            //aca funciona para atraoar un error y definir una base de datos vacio.
            console.log(error)
            data = "[]";
        }

        try {
            //aca parcemos los datos para hacerlo un Array o un Object depende lo que se saca.
            return JSON.parse(data);
        } catch {
            //si por casualidad da error hacer un cache no mas / base de datis
            return [];
        };
    };
};
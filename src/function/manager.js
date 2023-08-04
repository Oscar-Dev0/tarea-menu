const files = require("./archivos");
const readline = require('readline');
const Console = require("./console");

module.exports = class manager extends Console {


    /**
     * 
     * @param {any} opt 
     * @description Clase de funciones del codigo
     */
    constructor(opt){
        super();
        this.files = new files(opt?.file ?? 'archivos-files');
    };

    async crear() {
        return new Promise((resolve) => {
            console.clear();

            const panel = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const datos = {};

            panel.question(this.print("# Dame el nombre de la tarea #" + "\n", "bright"), (data) => {
                datos.name = data;

                panel.question(this.print("# Descripcion de la tarea #" + "\n", "bright"), (data) => {
                    datos.description = data;
                    panel.close();
                    resolve(datos);
                });
            });
        });
    };

    async Lista() {
        return new Promise(async (resolve) => {
            console.clear();

            const _panel = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const map = this.files.list() ?? [];
            let number = 0;
            _panel.question('Pon el numero de pagina: \n', async (data) => {
                _panel.close();
                try { number = Number(data) } catch { };
                const pagina_num = Math.floor(map.length / 5);
                console.clear();
                if(pagina_num < number) {
                    resolve(await this.message("No hay pagina con ese numero. \n Presiona para salir..."))
                };
                console.log(`# Pagina ${number}/${pagina_num} #`);
                const ar = [];
                for (let index = number * 5; index < map.length; index++) {
                    if((number * 5 + 5) <= index) continue;
                    const data = map[index];
                    ar.push(`${data.id} - ${data.name} \n${data.description}\n`);
                };
                console.log(`${ar.join('\n')}`);
                resolve(await this.message('Presiona para salir...\n'));
                
            });
        });
    };

    async Editar(){
        return new Promise(async (resolve)=>{
            console.clear();

            const panel = readline.createInterface({ input: process.stdin, output: process.stdout });

            panel.question("# Dame la id de la tarea por cambiar #\n", async (data)=>{
                panel.close();
                let numb = undefined;
                try{numb = parseInt(data)}catch{};
                if(!numb) resolve(await this.message("No se puso Id o se puso una letra.\n Presiona para salir..."));
                const find = this.files.list().find((tarea)=> tarea.id == numb);
                if(!find) resolve(await this.message("No existe la tarea con esta id.\n Presiona para salir..."));
                const name = await this.message("# Nuevo nombre de la tarea #\n");
                const description = await this.message('# Nueva descripcion de la tarea #\n');
                
                const save = this.files.edit({ id: numb, name, description });
                if(save) resolve(await this.message(`Ya se a editado la tarea ${numb} \n Presiona para salir...`));
                else resolve(await this.message(`No se pudo guardar el dato de la tarea \nPresiona para salir...`))
            });

        });
    };

    async Borrar(){
        return new Promise((resolve)=>{
            console.clear();
            const panel = readline.createInterface({ input: process.stdin, output: process.stdout });

            panel.question("# Dame la id de la tarea por cambiar #\n", async (data)=>{
                panel.close();
                let numb = undefined;
                try{numb = parseInt(data)}catch{};
                if(!numb) resolve(await this.message("No se puso Id o se puso una letra.\n Presiona para salir..."));

                const find = this.files.list().find((tarea)=> tarea.id == numb);
                if(!find) resolve(await this.message("No existe la tarea con esta id.\n Presiona para salir..."));

                const del = this.files.delete(numb);

                if(del) resolve(await this.message(`Ya se a borrado la tarea ${numb} \n Presiona para salir...`));
                else resolve(await this.message(`No se pudo Borrar los datos de la tarea \nPresiona para salir...`))

            });
        });
    }
};
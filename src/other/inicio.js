const manager = require("../function/manager");

module.exports = class Incio extends manager {

    /**
     * 
     * @param { { file?: string }} options
     * @description File es el nombre que tendra el archivo de guardado
     */
    constructor(options){
        super(options);
    };
    
    async start(){
        let shouldExit = false;

        while (!shouldExit) {
            console.clear();
            const data = await this.question();
            switch (data) {
                case 1:
                    const data = await this.crear();
                    const save = this.files.create(data);
                    await this.Message_Crear(data, save);
                    break;
                case 2:
                    await this.Lista();
                    break;
                case 3:
                    await this.Editar();
                break;
                case 4:
                    await this.Borrar();
                break;
            };

            shouldExit = data === 5;
        };

        console.log("\nHasta luego!\n");
        process.exit(0); // Salir del programa de forma controlada
    };

};
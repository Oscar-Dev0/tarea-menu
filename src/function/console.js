const readline = require('readline');

module.exports = class Console  {
    async Message_Crear(data, save) {
        return new Promise(async (resolve) => {
            console.clear();

            if (!save) resolve( await this.message(this.print("No se a podido crear la tarea", "fgRed") + "\nPresiona Enter para continuar..."));
            else resolve(await this.message(`\nTarea ${data.name} creada correctamente.\nPresiona Enter para continuar...`));
        });
    };

    async message(text) {
        return new Promise((resolve) => {
            const _panel = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            _panel.question(text, (data) => {
                _panel.close();
                resolve(data);
            });
        });
    };

    print(text, color) {
        const colors = {
            reset: "\x1b[0m",
            bright: "\x1b[1m",
            fgRed: "\x1b[31m",
            fgGreen: "\x1b[32m",
            fgYellow: "\x1b[33m",
            fgBlue: "\x1b[34m",
            fgMagenta: "\x1b[35m",
        };

        return `${colors[color]}${text}${colors.reset}`;
    };

    async question() {
        return new Promise((resolve) => {
            const panel = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            panel.question(`${this.print("# Panel de tareas #", "bright")}
${this.print("1) Crear tarea", "fgGreen")}
${this.print("2) lista de tareas", "fgYellow")}
${this.print("3) Edita tarea", "fgBlue")}
${this.print("4) Borrar tarea", "fgMagenta")}
${this.print("5) Salir", "fgRed")}
\nElige una opción del menú:\n
`, (data) => {
                panel.close();
                let number;
                try {
                    number = Number(data);
                } catch {
                    number = 0;
                }

                resolve(number);
            });
        });
    };
};
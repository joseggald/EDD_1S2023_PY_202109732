
class Nodo {
    constructor(accion) {
        this.accion = accion;
        this.siguiente = null;
    }
}

class ListaCircular{
    constructor(){
        this.cabeza = null;
        this.largo = 0;
    }

    insertar(accion){
        const nodo = new Nodo(accion);
        if (!this.cabeza) {
            this.cabeza = nodo;
        }else{
            let current = this.cabeza;
            while (current.siguiente) {
                current = current.siguiente;
            }
            current.siguiente = nodo;
        }
        this.largo += 1;
    }

    graficar() {
        let temp = this.cabeza;
        let conexiones = "";
        let nodos = "";
        let contador = 0;

        while (temp.siguiente != null) {
            nodos += `S_${contador}[label="${temp.accion}"];\n`;
            conexiones += `S_${contador}->`;
            temp = temp.siguiente;
            contador += 1;
        }
        nodos += `S_${contador}[label="${temp.accion}"];\n`;
        conexiones += `S_${contador}->S_0`;
        return nodos + conexiones;
    }
}


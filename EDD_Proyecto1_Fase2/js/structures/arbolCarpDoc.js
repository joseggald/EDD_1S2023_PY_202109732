
class Tnode {
    constructor(folderName) {
        this.folderName = folderName;
        this.documents = []; //documentos de la carpeta
        this.children = []; //nodos hijos
        this.id = null;
    }
}

class arbolCarpDoc {
    constructor() {
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = 1; //generar id
    }

    insert(folderName, fatherPath) {
        let newNode = new Tnode(folderName);
        let fatherNode = this.getFolder(fatherPath);

        if (fatherNode) {
            if (fatherNode.children.some(child => child.folderName == folderName)) {
                newNode.folderName = "Copia " + folderName;
            }
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        } else {
            console.log("No existe la ruta")
        }
    }

    getFolder(path) {
        if (path == this.root.folderName) {
            return this.root;
        } else {
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter(str => str !== '');
            let folder = null;
            while (folders.length > 0) {
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if (typeof folder == 'undefined' || folder == null) {
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    delete(folderName, fatherPath) {
        let parentNode = this.getFolder(fatherPath);
        if (parentNode) {
            let folderNode = parentNode.children.find(child => child.folderName === folderName);
            if (folderNode) {
                let index = parentNode.children.findIndex(child => child.id === folderNode.id);
                parentNode.children.splice(index, 1);
                // Actualizar los id de los nodos hermanos
                for (let i = index; i < parentNode.children.length; i++) {
                    parentNode.children[i].id -= 1;
                }
            } else {
                console.log("No existe la carpeta")
            }
        } else {
            console.log("No existe la ruta del padre")
        }
    }

    graph(fatherPath) {
        let nodes = "";
        let connections = "";

        let node = this.getFolder(fatherPath);
        let queue = [];
        queue.push(node);
        while (queue.length !== 0) {
            let len = queue.length;
            for (let i = 0; i < len; i++) {
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach(item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes + '\n' + connections;
    }

    getHTML(path) {
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += `<div id="${child.folderName}" class="btnCarpeta">
                        <div id="img-carpeta">
                            <a><i class="fas fa-folder"></i></a>
                         </div>
                        <div id="nombre-carpeta">
                            <p>${child.folderName}</p>
                         </div>
                    </div>`
        })

        node.documents.map(document => {
            if (document.type == "text/plain") {
                let archivo = new Blob([document.content], { type: document.type });
                const url = URL.createObjectURL(archivo);
                code += `<div id="${document.name}" class="btnIcon">
                        <div id="img-documento-texto">
                            <a href="${url}" download=${document.name}><i class="fas fa-file-alt"></i></a>
                         </div>
                        <div id="nombre-documento">
                            <p>${document.name}</p>
                         </div>
                    </div>`
            } else if (document.type == "application/pdf") {
                code += `<div id="${document.name}" class="btnIcon">
                        <div id="img-documento-pdf">
                            <a href="${document.content}" download=${document.name}><i class="fas fa-file-pdf"></i></a>
                         </div>
                        <div id="nombre-documento">
                            <p>${document.name}</p>
                         </div>
                    </div>`
            } else {
                code += `<div id="${document.name}" class="btnIcon">
                        <div id="img-documento-imagen">
                            <a href="${document.content}" download=${document.name}><i class="fas fa-images"></i></a>
                         </div>
                        <div id="nombre-documento">
                            <p>${document.name}</p>
                         </div>
                    </div>`
            };
        });

        return code;
    }
}

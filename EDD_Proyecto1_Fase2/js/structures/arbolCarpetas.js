
class Tnode{
    constructor(folderName){
        this.folderName = folderName;
        this.children = []; 
        this.id = null; 
    }
}


class Tree{
    constructor(){
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = 1; 
    }

    insert(folderName, fatherPath){ 
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            let i = 0;
            let newNodeName = folderName;
            while(fatherNode.children.find(child => child.folderName === newNodeName)){
                i++;
                newNodeName = `Copia ${folderName}`;
            }
            let newNode =  new Tnode(newNodeName);
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        }else{
            console.log("Ruta no existe");
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
                alert("Se elimino correctamente!")
            } else {
                alert("No existe la carpeta")
            }
        } else {
            alert("No existe la ruta del padre")
        }
    }
    getParentNode(path){
        let folders = path.split('/');
        folders = folders.filter( str => str !== '');
        let temp = this.root;
        let parentNode = null;
        let folder = null;
        while(folders.length > 0){
            let currentFolder = folders.shift()
            folder = temp.children.find(child => child.folderName == currentFolder);
            if(typeof folder == 'undefined' || folder == null){
                return null;
            }
            parentNode = temp;
            temp = folder;
        }
        return parentNode;
    }

    renameFolder(path, newName){
        let folder = this.getFolder(path);
        if(folder){
            let parentNode = this.getParentNode(path);
            if(parentNode.children.find(child => child.folderName === newName)){
                alert(`Ya existe una carpeta con el nombre ${newName}`);
                return;
            }
            folder.folderName = newName;
            alert(`La carpeta ha sido renombrada a ${newName}`);
        }else{
            alert("La carpeta no existe");
        }
    }

    getFolder(path){
        if(path == this.root.folderName){
            return this.root;
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    graph(){
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes +'\n'+ connections;
    }

    getHTML(path){
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            let icon = "./assets/images/carpeta.png";
            if (child.folderName.endsWith(".png") || 
                child.folderName.endsWith(".jpg") ||
                child.folderName.endsWith(".jpeg")|| 
                child.folderName.endsWith(".JPG") ||
                child.folderName.endsWith(".PNG")||
                child.folderName.endsWith(".JPEG")) {
                icon = "./assets/images/galeria.png";
            } else if (child.folderName.endsWith(".pdf")) {
                icon = "./assets/images/pdf.png";
            }else if (child.folderName.endsWith(".docx")) {
                icon = "./assets/images/word.png";
            } else if (child.folderName.endsWith(".txt")) {
                icon = "./assets/images/documento.png";
            }else if (child.folderName.endsWith(".zip")||child.folderName.endsWith(".rar")) {
                icon = "./assets/images/zip.png";
            }
            if (icon=="./assets/images/carpeta.png"){
                code += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.folderName}')">
                    <img src="${icon}" width="100%"/>
                    <p class="h6 text-center" style="max-width: 100%; margin-bottom: 5px;">${child.folderName}</p>
                </div>`
            }else{
                code += ` <div class="col-2 folder">
                    <img src="${icon}" width="100%"/>
                    <p class="h6 text-center" style="max-width: 100%; margin-bottom: 5px;">${child.folderName}</p>
                </div>`
            }
            
        })
        return code;
    }
    

}

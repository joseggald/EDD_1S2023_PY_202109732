
let avlTree = null;
let alumnosSistema = [];
let tree = null;
let userData = null;
let listaAcciones = [];
let personales = [];
let archivosUsers = []
var actual;
let documentos = [];
let matriz = null;
let tabla = new HashTable();
let grafo = null;
let permisosGeneral=[]
let permisosEst=[]
const selectEstudiantes = document.getElementById("estudianteSelect");
const selectArchivos = document.getElementById("archivoSelect");
const selectPermisos = document.getElementById("permisoSelect");

function crearCarpeta(e) {
    e.preventDefault();
    let folderName = $('#folderName').val();
    let path = $('#path').val();
    tree.insert(folderName, path);
    userData.insert(folderName, path);
    grafo.insert(folderName, path);
    $('#carpetas').html(userData.getHTML(path));
    let act = JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].arbolCarpeta = tree;
    alumnosSistema[act.num].expArchivos = userData;
    alumnosSistema[act.num].capetasDir = grafo;
    listaAcciones = alumnosSistema[act.num].acciones;
    let data = `Se creo la carpeta ${folderName}.\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
    listaAcciones.push(data);
    alumnosSistema[act.num].acciones = listaAcciones;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
    alert("Todo bien!")
}

function actualizarAccion() {
    accionLista = new ListaCircular();
    let act = JSON.parse(localStorage.getItem("actual"));
    listaAcciones.forEach((accion) => {
        accionLista.insertar(accion);
    });
    alumnosSistema[act.num].acciones = listaAcciones;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
    alert("Reporte Bitacora Generado")
}

function resetearEst() {
    let act = JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].acciones = null;
    alumnosSistema[act.num].arbolCarpeta = null;
    alumnosSistema[act.num].expArchivos = null;
    alumnosSistema[act.num].archivos = null;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
    alert("Alumno Reseteado!")
    window.location.href = "alum.html";
}

function agregarPermiso() {
    let folderName = $('#path').val();
    let carnetEstudiante = (selectEstudiantes.options[selectEstudiantes.selectedIndex]).text;
    let arch = (selectArchivos.options[selectArchivos.selectedIndex]).text;
    let permiso = (selectPermisos.options[selectPermisos.selectedIndex]).text;
    let archivo = (arch.split(".")[0]).replace(/\s+/g, '_');
    try {
        if (matriz == null) {
            matriz = new SparseMatrix();
            matriz.insert(archivo, carnetEstudiante, permiso);
        } else {
            matriz.insert(archivo, carnetEstudiante, permiso);
        }
        
        let act = JSON.parse(localStorage.getItem("actual"));
        listaAcciones = alumnosSistema[act.num].acciones;
        archivosUsers=[]
        let data = `Se otorgo pemiso del archivo ${archivo} al estudiante ${carnetEstudiante}.\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
        listaAcciones.push(data);
        alumnosSistema[act.num].acciones = listaAcciones;
        permisosEst = alumnosSistema[act.num].compartidos;
        let permisoNuevo = new Permiso(alumnosSistema[act.num].carnet, carnetEstudiante, folderName, archivo, permiso);
        permisosGeneral.push(permisoNuevo)
        permisosEst.push(permisoNuevo)
        localStorage.setItem("permisos", JSON.stringify(permisosGeneral))
        alumnosSistema[act.num].compartidos=permisosEst;
        for(let i=0; i<alumnosSistema.length; i++){
            console.log(alumnosSistema[i].carnet.toString())
            console.log(carnetEstudiante)
            if(alumnosSistema[i].carnet.toString()===carnetEstudiante){
                archivosUsers=alumnosSistema[i].archivosUsers;
                archivosUsers.push(permisoNuevo)
                alumnosSistema[i].archivosUsers=archivosUsers;
                break;
            }
        }
        alert("¡Permiso otorgado correctamente!")
        localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
        $('#tabla-compartidos tbody').html(
            permisosEst.map((item, index) => {
                return (`
                    <tr class="bg-light text-dark">
                        <th>${item.destino}</th>
                        <td>${item.archivo}</td>
                        <td>${item.permisos}</td>
                    </tr>
                `);
            }).join('')
        )
        
    } catch (error) {
        console.log(error);
        alert("No se incluyo en permisos en la matriz")
    }
}

function rellenarSelects() {
    // Obtener los elementos select
    const estudianteSelect = document.getElementById("estudianteSelect");
    const archivoSelect = document.getElementById("archivoSelect");


    alumnosSistema.forEach((alumno) => {
        const option = document.createElement("option");
        option.value = alumno.carnet;
        option.textContent = alumno.carnet;
        estudianteSelect.appendChild(option);
    });

    // Agregar opciones a archivoSelect

    if (documentos == null) {
        console.log("nada")
    } else {
        documentos.forEach((documento) => {
            const option = document.createElement("option");
            option.value = documento;
            option.textContent = documento;
            archivoSelect.appendChild(option);
        });
    }

}

function subirArchivo(e) {
    e.preventDefault();
    const input = document.getElementById('inputFile');
    let folderName = input.files[0].name;
    let path = $('#path').val();
    console.log(folderName)
    userData.insert(folderName, path);
    documentos.push(folderName)
    let act = JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].expArchivos = userData;
    alumnosSistema[act.num].archivos = documentos;
    listaAcciones = alumnosSistema[act.num].acciones;
    let data = `Se subio el archivo ${folderName}.\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
    listaAcciones.push(data);
    alumnosSistema[act.num].acciones = listaAcciones;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
    alert("Todo bien!")
    $('#carpetas').html(userData.getHTML(path))
    window.location.href = "alum.html";
}

function eliminarCarpeta() {
    let folderName = $('#folderName').val();
    let path = $('#path').val();
    let dic = "";
    if (path == "/") {
        dic = path;
    } else {
        dic = path + "/";
    }
    tree.delete(folderName, dic)
    userData.delete(folderName, dic)
    grafo.delete(folderName, dic)
    let act = JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].arbolCarpeta = tree;
    alumnosSistema[act.num].expArchivos = userData;
    alumnosSistema[act.num].archivos = documentos;
    alumnosSistema[act.num].capetasDir = grafo;
    listaAcciones = alumnosSistema[act.num].acciones;
    let data = `Se elimino la Carpeta ${folderName}.\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
    listaAcciones.push(data);
    alumnosSistema[act.num].acciones = listaAcciones;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
    $('#carpetas').html(userData.getHTML("/"))
}

function eliminarArchivo() {
    let folderName = $('#folderName2').val();
    let path = $('#path').val();
    let dic = "";
    if (path == "/") {
        dic = path;
    } else {
        dic = path + "/";
    }
    userData.delete(folderName, dic)
    documentos.pop(folderName)
    let act = JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].expArchivos = userData;
    listaAcciones = alumnosSistema[act.num].acciones;
    let data = `Se elimino el archivo ${folderName}.\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
    listaAcciones.push(data);
    alumnosSistema[act.num].acciones = listaAcciones;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
    $('#carpetas').html(userData.getHTML("/"))
    window.location.href = "alum.html";
}

function entrarCarpeta(folderName) {
    let path = $('#path').val();
    let curretPath = path == '/' ? path + folderName : path + "/" + folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(userData.getHTML(curretPath))

}

function retornarInicio() {
    $('#path').val("/");
    $('#carpetas').html(userData.getHTML("/"))
}


function showGraph() {
    let act = JSON.parse(localStorage.getItem("actual"));
    listaAcciones = alumnosSistema[act.num].acciones;
    let data = `Grafico Estructuras.\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
    listaAcciones.push(data);
    alumnosSistema[act.num].acciones = listaAcciones;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema));
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    console.log(body)
    $("#graph").attr("src", url + body);
    grafoDirigido();
    grafoMatriz();
    actualizarAccion();
    grafoAcciones();
}

function grafoDirigido(){
    const contenedorImagen = document.getElementById("graph4");
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G{${grafo.graph()} }`;
    contenedorImagen.setAttribute("src", url + body);
}

function grafoMatriz() {
    if (matriz != null) {
        const contenedorImagen = document.getElementById("graph3");
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G{${matriz.graph()} }`;
        console.log(body)
        contenedorImagen.setAttribute("src", url + body);
    } else {
        alert("No hay datos en la matriz de de permisos.")
    }
}

function grafoAcciones() {
    const contenedorImagen = document.getElementById("graph2");
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G{node [shape=box]${accionLista.graficar()} }`;
    contenedorImagen.setAttribute("src", url + body);
}

window.onload = function () {
    try {
        let act = JSON.parse(localStorage.getItem("actual"));
        alumnosSistema = JSON.parse(localStorage.getItem("alumnosSistema"));
        tree = new Tree();
        userData = new Tree();
        grafo = new TreeCarpe();
        tabla = new HashTable();
        documentos = [];
        if (alumnosSistema != null && alumnosSistema[act.num].arbolCarpeta != null && alumnosSistema[act.num].expArchivos != null) {
            tree.root = alumnosSistema[act.num].arbolCarpeta.root;
            userData.root = alumnosSistema[act.num].expArchivos.root;
            documentos = alumnosSistema[act.num].archivos;
            listaAcciones = alumnosSistema[act.num].acciones;
            grafo.root = alumnosSistema[act.num].capetasDir.root;
            permisosEst = alumnosSistema[act.num].compartidos;
            personales=alumnosSistema[act.num].archivosUsers;
            localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
            $('#carpetas').html(userData.getHTML("/"))
            $('#tabla-compartidos tbody').html(
                permisosEst.map((item, index) => {
                    return (`
                        <tr class="bg-light text-dark">
                            <th>${item.destino}</th>
                            <td>${item.archivo}</td>
                            <td>${item.permisos}</td>
                        </tr>
                    `);
                }).join('')
                
            )
            $('#tabla-compartidos-com tbody').html(
                personales.map((item, index) => {
                    return (`
                        <tr class="bg-light text-dark">
                            <th>${item.propietario}</th>
                            <td>${item.archivo}</td>
                            <td>${item.permisos}</td>
                        </tr>
                    `);
                }).join('')
            )    
        } else {
            tree = new Tree();
            grafo = new TreeCarpe()
            alumnosSistema[act.num].arbolCarpeta = tree;
            alumnosSistema[act.num].expArchivos = userData;
            alumnosSistema[act.num].archivos = documentos;
            alumnosSistema[act.num].acciones = listaAcciones;
            alumnosSistema[act.num].capetasDir = grafo;
            alumnosSistema[act.num].compartidos = permisosEst;
            personales=alumnosSistema[act.num].archivosUsers;
            if(personales!=null){
                $('#tabla-compartidos-com tbody').html(
                    personales.map((item, index) => {
                        return (`
                            <tr class="bg-light text-dark">
                                <th>${item.propietario}</th>
                                <td>${item.archivo}</td>
                                <td>${item.permisos}</td>
                            </tr>
                        `);
                    }).join('')
                )
            } 
            localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
        }
        rellenarSelects();
        var txt = document.getElementById("valUser");
        console.log(act)
        txt.innerText = "Bienvenido de nuevo: " + act.nombre + "  Carnet: " + act.user;
    }
    catch (error) {
        console.log("error lad");
    }
};

function loginVerificar() {
    let user = $('#txtUsuario').val();
    let pass = $('#txtPassword').val();
    let a = 0;
    permisosGeneral= localStorage.getItem("permisos")
    if (user === "admin" && pass === "admin") {
        alert("Se ha iniciado sesion correctamente!")
        actual = new Usuario(user, user, 0);
        console.log(actual)
        localStorage.setItem("actual", JSON.stringify(actual))
        cambiar_pagina_admin();
        a = 1;
  
    }
    let studentsLocalStorage = JSON.parse(localStorage.getItem("alumnosSistema"));
    for (let i = 0; i < studentsLocalStorage.length; i++) {
        if (studentsLocalStorage[i].carnet == user && pass == studentsLocalStorage[i].password) {
            actual = new Usuario(user, studentsLocalStorage[i].nombre, i);
            alert("Se ha iniciado sesion correctamente!")
            a = 1;
            localStorage.setItem("actual", JSON.stringify(actual))
            let act = JSON.parse(localStorage.getItem("actual"));
            if (listaAcciones = studentsLocalStorage[act.num].acciones == null) {
                listaAcciones = [];
            } else {
                listaAcciones = studentsLocalStorage[act.num].acciones;
            }

            let data = `Se inicio sesion.\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
            listaAcciones.push(data);
            studentsLocalStorage[act.num].acciones = listaAcciones;
            localStorage.setItem("alumnosSistema", JSON.stringify(studentsLocalStorage))
            window.location.href = "alum.html";
        }
    }
    if (a == 0) {
        alert("Usuario y contraseña incorrecta!");
    }
}
function dataPerms(){
    let perms=[]
    perms=localStorage.getItem("permisos")  
    console.log(pr)
    let cont="";
    for(let i=0;i>perms.length; i++){
        cont=cont+`<tr class="bg-light text-dark">
        <th>${perms[i].propietario}</th>
        <td>${perms[i].destino}</td>
        <td>${perms[i].ubicacion}</td>
        <td>${perms[i].archivo}</td>
        <td>${perms[i].permisos}</td>
        </tr> `               
    }
    console.log(cont)
    return cont;
}
function salirAlum() {
    let act = JSON.parse(localStorage.getItem("actual"));
    listaAcciones = alumnosSistema[act.num].acciones;
    let data = `Se cerro sesion.\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
    listaAcciones.push(data);
    alumnosSistema[act.num].acciones = listaAcciones;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
    window.location.href = "index.html";
    localStorage.removeItem("actual")
}
function salir() {
    window.location.href = "index.html";
    localStorage.removeItem("actual")
}
function resetLocalStorage() {
    localStorage.clear();
    alert("Local Storage ha sido reseteado.");
    window.location.href = "admin.html";
}

function cambiar_pagina_admin() {
    window.location.href = "admin.html";
        
}

function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try {
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            studentsArray = JSON.parse(fr.result).alumnos;
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {
                    return (`
                        <tr class="bg-light text-dark">
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            let per=[]
            for (let i = 0; i < studentsArray.length; i++) {
                let nuevo = new Estudiante(studentsArray[i].carnet, studentsArray[i].nombre, studentsArray[i].password, null, null, null, null, null,null)
                avlTree.insert(nuevo)
                alumnosSistema.push(nuevo)
            }
            localStorage.setItem("permisos", JSON.stringify(per))
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            
            localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
            alert('Alumnos cargados con éxito!')
        }
    } catch (error) {
        console.log(error);
        alert("Error en la inserción");
    }
}

function showLocalStudents() {
    try {
        let temp = localStorage.getItem("avlTree")
        let temp2 = localStorage.getItem("hash")
        avlTree = new AvlTree;
        tabla = new HashTable;
        alumnosSistema = [];
        listaAcciones = [];
        permisosGeneral=[]
        if (temp !== null) {
            avlTree.root = JSON.parse(temp).root;
            tabla.table = JSON.parse(temp2).table;
            alumnosSistema = JSON.parse(localStorage.getItem("alumnosSistema"));
            permisosGeneral=JSON.parse(localStorage.getItem("permisos"));
            $('#studentsTable tbody').html(
                avlTree.inOrder()
            )      
            let cont=""
            console.log(permisosGeneral)
            for(let i=0;i<permisosGeneral.length; i++){
                cont=cont+`<tr class="bg-light text-dark">
                <th>${permisosGeneral[i].propietario}</th>
                <td>${permisosGeneral[i].destino}</td>
                <td>${permisosGeneral[i].ubicacion}</td>
                <td>${permisosGeneral[i].archivo}</td>
                <td>${permisosGeneral[i].permisos}</td>
                </tr> `               
            }
            console.log(cont)
            $('#tabla-permisos tbody').html(
                cont
            ) 
        } else {
            console.log("avlTree no está inicializado");
        }
    } catch (error) {
        console.log("error");
    }
}

function showStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if (avlTree.root !== null) {
        switch (form.traversal) {
            case 'inOrder':
                $('#studentsTable tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#studentsTable tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#studentsTable tbody').html(
                    avlTree.postOrder()
                )
                break;
            case 'tablaHash':
                $('#studentsTable tbody').html(
                    mostrarTabla()
                )
                break;
            default:
                $('#studentsTable   tbody').html("")
                break;
        }
    }
}

function showAvlGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.treeGraph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
}

function trasladoHash() {
    inorder(alumnosSistema);
    let estudiantesInOrden = alumnosSistema;
    console.log(estudiantesInOrden)
    for (let index = 0; index < estudiantesInOrden.length; index++) {
        let carnet = estudiantesInOrden[index].carnet;
        let nombre = estudiantesInOrden[index].nombre;
        let password = encriptarPassword(estudiantesInOrden[index].password);
        tabla.insert(carnet, nombre, password);

    }
    localStorage.setItem("hash", JSON.stringify(tabla))
    alert("Se ha trasladado a Tabla hash")
}

function mostrarTabla() {
    try {

        let fila = "";
        for (let i = 0; i < tabla.table.length; i++) {
            if (tabla.table[i] == null || tabla.table[i] == undefined) {
                continue;
            } else {
                fila += `
                        <tr>
                            <th>${tabla.table[i].carnet}</th>
                            <td>${tabla.table[i].nombre}</td>
                            <td>${tabla.table[i].password}</td>
                        </tr>
                        `;
            }
        }

        return fila

    } catch (error) {
        alert("Error al mostrar los datos, error");
    }
}
function inorder(arr, index = 0) {
    if (index >= arr.length) {
        return; // El índice está fuera de rango, finaliza la recursión
    }
    // Visitar el subárbol izquierdo
    inorder(arr, 2 * index + 1);
    // Procesar el nodo actual
    console.log(arr[index]);
    // Visitar el subárbol derecho
    inorder(arr, 2 * index + 2);
}

function encriptarPassword(passWord) {
    const textoCifrado = CryptoJS.AES.encrypt(passWord, '').toString();
    return textoCifrado;
}

$(document).ready(showLocalStudents);
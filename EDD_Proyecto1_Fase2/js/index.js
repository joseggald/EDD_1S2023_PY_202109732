let avlTree = null;
let alumnosSistema=[];
let tree = new Tree();
let userData = new Tree();
var actual;
let documentos=[];
let matriz=null;
const selectEstudiantes = document.getElementById("estudianteSelect");
const selectArchivos = document.getElementById("archivoSelect");
const selectPermisos = document.getElementById("permisoSelect");

function crearCarpeta(e){
    e.preventDefault();
    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    tree.insert(folderName, path);
    userData.insert(folderName, path);
    $('#carpetas').html(userData.getHTML(path))
    let act=JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].arbolCarpeta=tree;
    alumnosSistema[act.num].expArchivos=userData;
    console.log(tree)
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema)) 
    alert("Todo bien!") 
}

function resetearEst(){
    let act=JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].arbolCarpeta=null;
    alumnosSistema[act.num].expArchivos=null;
    alumnosSistema[act.num].archivos=null;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema)) 
    alert("Alumno Reseteado!") 
    window.location.href = "alum.html";
}

function agregarPermiso(){
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
        alert("¡Permiso otorgado correctamente!") 
    
    } catch (error) {
            console.log(error);
            alert("Error") 
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
    
    if (documentos==null){
        console.log("nada")
    }else{
        documentos.forEach((documento) => {
            if (documento.endsWith(".png") || 
            documento.endsWith(".jpg") ||
            documento.endsWith(".jpeg")){
                console.log("nada")
            }else{
                const option = document.createElement("option");
                option.value = documento;
                option.textContent = documento;
                archivoSelect.appendChild(option);
            }    
        });
    }
    
}

function subirArchivo(e){
    e.preventDefault();
    const input = document.getElementById('inputFile');
    let folderName =  input.files[0].name;
    let path =  $('#path').val();
    console.log(folderName)
    userData.insert(folderName, path);
    documentos.push(folderName)
    let act=JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].expArchivos=userData;
    alumnosSistema[act.num].archivos=documentos;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema)) 
    alert("Todo bien!") 
    $('#carpetas').html(userData.getHTML(path))
    window.location.href = "alum.html";
}

function eliminarCarpeta(){
    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    let dic=path+folderName;
    tree.deleteFolder(dic)
    userData.deleteFolder(dic)
    let act=JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].arbolCarpeta=tree;
    alumnosSistema[act.num].expArchivos=userData;
    alumnosSistema[act.num].archivos=documentos;
    console.log(tree)
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema)) 
    $('#carpetas').html(userData.getHTML("/"))
}

function eliminarArchivo(){
    let folderName =  $('#folderName2').val();
    let path =  $('#path').val();
    let dic=path+folderName;
    userData.deleteFolder(dic)
    documentos.pop(folderName)
    let act=JSON.parse(localStorage.getItem("actual"));
    alumnosSistema[act.num].expArchivos=userData;
    localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema)) 
    
    $('#carpetas').html(userData.getHTML("/"))
    window.location.href = "alum.html";
}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(userData.getHTML(curretPath))
    
}

function retornarInicio(){
    $('#path').val("/");
    $('#carpetas').html(userData.getHTML("/"))
}


function showGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    $("#graph").attr("src", url + body);
    grafoMatriz();
}
function grafoMatriz(){
    if (matriz != null) {
        const contenedorImagen = document.getElementById("graph3");
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G{${matriz.graph()} }`;
        console.log(body)
        contenedorImagen.setAttribute("src", url + body);
      } else {
        alert("error") 
      }
}

window.onload = function() {
    try{
        let act=JSON.parse(localStorage.getItem("actual"));
        alumnosSistema = JSON.parse(localStorage.getItem("alumnosSistema"));
        tree = new Tree();
        userData = new Tree();
        documentos=[];
        if (alumnosSistema != null && alumnosSistema[act.num].arbolCarpeta != null) {
            tree.root = alumnosSistema[act.num].arbolCarpeta.root ;
            userData.root = alumnosSistema[act.num].expArchivos.root ;
            documentos=alumnosSistema[act.num].archivos;
            $('#carpetas').html(userData.getHTML("/"))
        } else {
            tree = new Tree();
            alumnosSistema[act.num].arbolCarpeta = tree;
            alumnosSistema[act.num].expArchivos = userData;
            alumnosSistema[act.num].archivos=documentos;
        }
        rellenarSelects();
        var txt = document.getElementById("valUser");
        console.log(act)
        txt.innerText = "Bienvenido de nuevo: "+act.nombre+ "  Carnet: "+ act.user;
    }
    catch (error) {
        console.log("error lad");       
    } 
};

function loginVerificar(){
    let user = $('#txtUsuario').val();
    let pass = $('#txtPassword').val();
    let a=0;
    if(user === "admin" && pass === "admin"){  
        alert("Se ha iniciado sesion correctamente!")  
        actual=new Usuario(user,user,0);  
        console.log(actual)
        localStorage.setItem("actual", JSON.stringify(actual))     
        cambiar_pagina_admin();
        a=1;
    }
    let studentsLocalStorage = JSON.parse(localStorage.getItem("alumnosSistema"));
    for(let i = 0; i < studentsLocalStorage.length; i++){ 
        if (studentsLocalStorage[i].carnet == user && pass == studentsLocalStorage[i].password) {
            actual=new Usuario(user,studentsLocalStorage[i].nombre,i);
            alert("Se ha iniciado sesion correctamente!")    
            a=1;    
            localStorage.setItem("actual", JSON.stringify(actual))           
            window.location.href = "alum.html";
        } 
    }
    if(a==0){
        alert("Usuario y contraseña incorrecta!");
    }
}

function salir(){
    window.location.href = "index.html";
    localStorage.removeItem("actual")
}

function resetLocalStorage() {
    localStorage.clear();
    alert("Local Storage ha sido reseteado.");
    window.location.href = "admin.html";
}

function cambiar_pagina_admin(){
    window.location.href = "admin.html";
}

function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try{        
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => { 
            studentsArray = JSON.parse(fr.result).alumnos;
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {
                    return(`
                        <tr class="bg-light text-dark">
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            for(let i = 0; i < studentsArray.length; i++){
                let nuevo=new Estudiante(studentsArray[i].carnet, studentsArray[i].nombre, studentsArray[i].password,null,null,null,null)
                avlTree.insert(nuevo)
                alumnosSistema.push(nuevo)
            }
            console.log(alumnosSistema.length)
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            localStorage.setItem("alumnosSistema", JSON.stringify(alumnosSistema))
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }
}

function showLocalStudents(){
    try {
        let temp = localStorage.getItem("avlTree")
        avlTree = new AvlTree;
        alumnosSistema=[];
        if (temp !== null) {
            avlTree.root = JSON.parse(temp).root;
            alumnosSistema = JSON.parse(localStorage.getItem("alumnosSistema"));
            $('#studentsTable tbody').html(
                avlTree.inOrder()
            )
        } else {
            console.log("avlTree no está inicializado");
        } 
    } catch (error) {
        console.log("error");
    }
}

function showStudentsForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.root !== null){
        switch(form.traversal){
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
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}

function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.treeGraph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
}



$( document ).ready(showLocalStudents);
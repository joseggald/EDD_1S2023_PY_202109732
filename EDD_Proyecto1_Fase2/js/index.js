


let avlTree = null;
let alumnosSistema=[];
let tree =  new Tree();
var actual;
function crearCarpeta(e){
    e.preventDefault();
    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    tree.insert(folderName, path);
    alert("Todo bien!")
    $('#carpetas').html(tree.getHTML(path))
}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(tree.getHTML(curretPath))
}

function retornarInicio(){
    $('#path').val("/");
    $('#carpetas').html(tree.getHTML("/"))
}


function showGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    $("#graph").attr("src", url + body);
}
window.onload = function() {
    var txt = document.getElementById("valUser");
    let act=JSON.parse(localStorage.getItem("actual"));
    console.log(act)
    txt.innerText = "Bienvenido de nuevo: "+act.nombre+ "  Carnet: "+ act.user;
};

function loginVerificar(){
    let user = $('#txtUsuario').val();
    let pass = $('#txtPassword').val();
    let a=0;
    if(user === "admin" && pass === "admin"){  
        alert("Se ha iniciado sesion correctamente!")  
        actual=new Usuario(user,user);  
        console.log(actual)
        localStorage.setItem("actual", JSON.stringify(actual))     
        cambiar_pagina_admin();
        a=1;
    }
    let studentsLocalStorage = JSON.parse(localStorage.getItem("alumnosSistema"));
    for(let i = 0; i < studentsLocalStorage.length; i++){ 
        if (studentsLocalStorage[i].carnet == user && pass == studentsLocalStorage[i].password) {
            actual=new Usuario(user,studentsLocalStorage[i].nombre);
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
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
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
                let nuevo=new Estudiante(studentsArray[i].carnet, studentsArray[i].nombre, studentsArray[i].password,null,null)
                avlTree.insert(nuevo)
                alumnosSistema.push(nuevo)
                console.log(nuevo)
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
        if (temp !== null) {
            avlTree.root = JSON.parse(temp).root;
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

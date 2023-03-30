
let avlTree = new AvlTree();
function resetLocalStorage() {
    localStorage.clear();
    alert("Local Storage ha sido reseteado.");
}
function cambiar_pagina_admin(){
    window.location.href = "admin.html";
}

function loginVerificar(){
    let user = $('#txtUsuario').val();
    let pass = $('#txtPassword').val();
    let a=0;
    if(user === "admin" && pass === "admin"){  
        alert("Se ha iniciado sesion correctamente!")       
        cambiar_pagina_admin();
        a=1;
    }
    
    // Verificar si el usuario y la contraseña existen en el localStorage
    let temp = localStorage.getItem("avlTree");
    if (temp !== null) {
        let avlTree = new AvlTree();
        avlTree.root = JSON.parse(temp).root;
        let students = avlTree.inOrder();
        let found = students.find(student => student.carnet === user && student.password === pass);
        
        // Si se encontró el usuario y contraseña, redirigir a la página principal
        if (found) {
            alert("Se ha iniciado sesion correctamente!") 
            a=1;
        } 

    }
    
    if(a==0){
        alert("Usuario y contraseña incorrecta!");
    }
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
                avlTree.insert(studentsArray[i]);
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }

}

function showLocalStudents(){
    let temp = localStorage.getItem("avlTree")
    avlTree.root = JSON.parse(temp).root;
    $('#studentsTable tbody').html(
        avlTree.inOrder()
    )
}

//--------------------------------------------------------------------------
//                   FUNCIÓN PARA AGREGAR RECORRIDOS
//--------------------------------------------------------------------------
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

//--------------------------------------------------------------------------
//                   FUNCIÓN PARA MOSTRAR LA GRÁFICA
//--------------------------------------------------------------------------
function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.treeGraph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
}



$( document ).ready(showLocalStudents);
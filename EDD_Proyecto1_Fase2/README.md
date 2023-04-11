# EDD GoDrive - Proyecto 1 - Fase 1

#### Nombre: José Eduardo Galdámez González  -  Carnet: 202109732

## Introducción del curso:

La estructura de datos es un concepto fundamental en la programación, ya que permite organizar y almacenar datos de manera eficiente y accesible para su posterior uso. La elección de una estructura de datos adecuada puede tener un gran impacto en la eficiencia de un programa, tanto en términos de velocidad como de uso de memoria.

Una implementación correcta de la estructura de datos también es crucial para evitar errores y comportamientos no deseados. Si una estructura de datos se implementa de manera incorrecta, puede llevar a resultados inesperados o incluso a fallas en el programa.

Por ejemplo, si se usa una lista para almacenar y acceder a datos que se actualizan con frecuencia, es probable que el rendimiento del programa disminuya a medida que aumente la cantidad de datos. En cambio, una estructura de datos más adecuada, como un árbol binario de búsqueda, puede proporcionar un acceso más rápido y eficiente a los datos.

Otro ejemplo común es el uso de la estructura de datos de pila en aplicaciones que requieren un seguimiento de historial de operaciones, donde la implementación incorrecta de la pila puede llevar a un mal seguimiento de las operaciones o incluso al agotamiento de la memoria.

En resumen, la elección y la implementación correcta de la estructura de datos son fundamentales para garantizar que los programas sean eficientes y confiables. Los desarrolladores deben considerar cuidadosamente la estructura de datos adecuada para la tarea en cuestión y garantizar que se implemente correctamente para evitar errores y comportamientos no deseados.
# Manual de Usuario y Técnico para la plataforma EDD GoDrive:
Introducción
La plataforma EDD GoDrive es una nube que permite almacenar y buscar archivos en una estructura de datos eficiente. En este manual se describirán las funciones disponibles para los usuarios y se explicará la implementación técnica de la plataforma.

## Manual de Usuario
La plataforma EDD GoDrive cuenta con una cuenta de administrador y de usuarios. A continuación, se describen las funciones disponibles para cada uno:

Ventana Login: Al ingresar a la plataforma, el usuario deberá ingresar sus credenciales de administrador o usuario común para acceder a las opciones correspondientes.

Ventana Administrador: Una vez dentro de la plataforma, el administrador cuenta con tres opciones principales: Mostrar alumnos, árbol de estudiantes y carga masiva. La opción de Mostrar alumnos muestra una vista detallada de los datos de cada uno de los usuarios a través de una tabla que puede ser mostrada en tres maneras diferentes. El botón de árbol de estudiantes muestra una vista del árbol AVL generado, y en carga masiva, el administrador puede cargar un archivo en formato JSON con los usuarios que desee agregar al sistema.

Ventana Usuario: Los usuarios comunes cuentan con más opciones en la plataforma. En dicha área, se pueden crear carpetas en el directorio principal, así como generar carpetas dentro de carpetas hasta crear un ciclo infinito. Luego, el usuario puede eliminar dichas carpetas cuando ya no las necesite más. Asimismo, se puede obtener un reporte de las carpetas que contiene el directorio en el que se encuentre ubicado, el cual es una representación visual de un árbol multicamino o n-ario. Seguidamente, se pueden agregar archivos de texto plano, pdf o cualquier formato de imagen a la carpeta deseada. Luego, se pueden descargar a su equipo. Además, el usuario tiene la opción de compartir sus archivos con otros usuarios del sistema a través de la opción "permisos".

Árbol AVL: El administrador puede visualizar la estructura general del sistema y los usuarios que lo conforman a través de la representación del Árbol AVL.

Árbol N-ario: Los usuarios pueden generar una representación visual de cómo está conformado su sistema de archivos. Además, esta representación puede ser generada desde cualquier punto que se desee.

Matriz dispersa: Los usuarios pueden visualizar quiénes poseen permisos sobre sus archivos a través de una matriz dispersa.

## Manual Técnico
Para el desarrollo de la plataforma EDD GoDrive, se utilizaron diversas estructuras de datos eficientes, las cuales se describen a continuación:

Árbol AVL: Se utilizó para almacenar los usuarios del sistema que ya han sido aceptados. Cada nodo del árbol contiene la información del usuario, incluyendo su nombre, contraseña y la lista de archivos que ha almacenado en el sistema.

Árbol multicamino o n-ario: Se utilizó para manejar el sistema de archivos. Cada nodo del árbol contiene la información de una carpeta o archivo, incluyendo su nombre, tamaño y ubicación en el sistema de archivos.

Lista circular: Se utilizó para el manejo de logs, como la creación o eliminación de carpetas o archivos ligados a cada usuario.

Matriz dispersa: Se utilizó para manejar permisos en las carpetas del directorio actual.

El sistema se dividió en dos módulos principales: el módulo de usuarios y el módulo de la estructura principal es el árbol multicamino o n-ario. Cada nodo del árbol contiene la información de una carpeta o archivo, incluyendo su nombre, tamaño y ubicación en el sistema de archivos. Para manejar los permisos de acceso a las carpetas, se implementó una matriz dispersa en la que se almacena la información de los usuarios que tienen acceso a cada carpeta. De esta forma, se puede determinar fácilmente quiénes tienen permisos sobre cada carpeta y qué tipo de permisos tienen.

Además de estas estructuras de datos principales, se implementaron varias funciones auxiliares para el manejo de la información del sistema, como la carga y descarga de archivos, la creación y eliminación de carpetas, la asignación y revocación de permisos, y la generación de reportes de los archivos y carpetas en el sistema.

Para la implementación del frontend, se utilizó HTML, CSS y Bootstrap para diseñar la interfaz de usuario. Se crearon diferentes páginas para el inicio de sesión, la visualización del árbol AVL, la visualización del árbol multicamino, la creación y eliminación de carpetas y archivos, y la asignación y revocación de permisos. Además, se crearon funciones en JavaScript para manejar la interacción del usuario con la interfaz y la comunicación con el backend.

### Conclusión:
El sistema de usuarios y archivos implementado en este proyecto utiliza estructuras de datos eficientes como árboles AVL, árboles multicamino, listas circulares y matrices dispersas para permitir el almacenamiento y búsqueda eficiente de archivos. Además, se diseñó una interfaz de usuario intuitiva y fácil de usar utilizando HTML, CSS y Bootstrap. En conjunto, el sistema ofrece una solución robusta y completa para el manejo de archivos y usuarios en un entorno web.

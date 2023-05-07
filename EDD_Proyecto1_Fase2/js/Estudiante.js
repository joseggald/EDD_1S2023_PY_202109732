class Estudiante {
    constructor(carnet, nombre, password, acciones, arbolCarpeta, expArchivos, archivos,compartidos,capetasDir) {
      this.carnet = carnet;
      this.nombre = nombre;
      this.password = password;
      this.acciones=acciones;
      this.arbolCarpeta=arbolCarpeta;
      this.expArchivos=expArchivos;
      this.archivos=archivos;
      this.compartidos=compartidos;
      this.capetasDir=capetasDir;
      this.archivosUsers=[];
    }
}

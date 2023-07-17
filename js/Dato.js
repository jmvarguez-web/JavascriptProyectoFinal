// En el archivo llamado Dato.js crea una clase padre para el manejo de datos que se llame
// Dato

export default class Dato {
  // Private -> #
  // Private -> Sólo se puede acceder desde dentro de la clase
  // • Agrega un constructor al cual le vas a pasar dos atributos: descripción y valor
  // • Dentro del cuerpo del constructor define los atributos _descripción y _valor y asígnale el
  // valor de los parámetros que se están recibiendo
  // • Agrega los métodos get y set para el atributo descripción:
  // • En el get retorna este valor del atributo descripcion.
  // • En el set, haz que se reciba el parámetro descripción y modifica el atributo de
  // descripción con el valor que se está recibiendo.
  // • Crea los métodos set y get para el atributo valor de la misma manera que se realizó para el
  // atributo descripción con sus respectivos valores.
  constructor(descripcion, valor) {
    this._descripcion = descripcion;
    this._valor = valor;
  }

  get descripcion() {
    return this._descripcion;
  }

  set descripcion(nuevaDescripcion) {
    this._descripcion = nuevaDescripcion;
  }

  get valor() {
    return this._valor;
  }

  set valor(nuevoValor) {
    this._valor = nuevoValor;
  }
}

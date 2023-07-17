// • Utilizando el archivo Egreso.js, crea la clase Egreso, que es hija de la clase Dato:
// • Define una variable estática contadorEgresos inicializada en 0.
// • Crea el constructor que recibe los valores de descripcion y valor.
// • Inicializa el objeto de la clase padre, el cual recibe el valor de descripcion y valor.
// • Define el atributo _id y, para asignarle un valor, utiliza la variable estática. Para
// hacerlo, realiza un preincremento a la variable estática de la clase Egresos para
// asegurar que inicie en 1.
// • Crea el método get id, el cual va a regresar el valor de this._id, no agregues el
// método set, pues este valor no deberá ser modificado.

import Dato from "../js/Dato.js";
export default class Egreso extends Dato {
  static contadorEgresos = 0;

  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._id = ++Egreso.contadorEgresos;
  }

  get id() {
    return this._id;
  }
}

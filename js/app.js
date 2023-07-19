import Dato from "./Dato.js";
import Ingreso from "./Ingreso.js";
import Egreso from "./Egreso.js";

const d = document;
const ingresosStorage = JSON.parse(localStorage.getItem("ingresos"));
const egresosStore = JSON.parse(localStorage.getItem("egresos"));
var ingresos = [];
var egresos = [];

const btnSwitch = document.querySelector("#switch");
if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark");
  btnSwitch.classList.add("active");
} else {
  document.body.classList.remove("dark");
  btnSwitch.classList.remove("active");
}

const swalsuccess = (titulo) => {
  Swal.fire({
    icon: "success",
    title: titulo,
    showConfirmButton: false,
    timer: 2000,
  });
};

const mostrarDatosPorPrimeraVez = () => {
  if (ingresosStorage === null) {
    ingresos = [
      new Ingreso("Salario", 20000),
      new Ingreso("Venta auto", 50000),
    ];
    //guardar en mi localstorage

    localStorage.setItem("ingresos", JSON.stringify(ingresos));
  } else {
    for (let ingresoValue of ingresosStorage) {
      let valores = new Ingreso(ingresoValue._descripcion, ingresoValue._valor);
      ingresos.push(valores);
      //improve performance it is recommended to set the differential scripts in the head as follows:
    }
  }
  if (egresosStore === null) {
    egresos = [new Egreso("Renta", 4000), new Egreso("Ropa", 800)];
    //guardar en mi localstorage
    localStorage.setItem("egresos", JSON.stringify(egresos));
  } else {
    for (let egresoValue of egresosStore) {
      let valores = new Ingreso(egresoValue._descripcion, egresoValue._valor);
      egresos.push(valores);
      //improve performance it is recommended to set the differential scripts in the head as follows:
    }
  }

  console.log("datos cargados correctamente");
};
const porcentajeEgreso = (tingreso, tegreso) => {
  let porcentajeEgreso = 0;

  if (tingreso === 0 && tegreso === 0) {
    porcentajeEgreso = 0;
  } else {
    porcentajeEgreso = tegreso / tingreso;
  }

  if (!isFinite(porcentajeEgreso)) {
    return 0;
  } else {
    return porcentajeEgreso;
  }
};
const cargarCabecero = () => {
  let tingreso = totalIngresos();
  let tegreso = totalEgresos();
  let presupuesto = tingreso - tegreso;
  let porcentaje = porcentajeEgreso(tingreso, tegreso);

  d.getElementById("presupuesto").textContent = formatoMoneda(presupuesto);
  d.getElementById("ingresos").textContent = formatoMoneda(totalIngresos());
  d.getElementById("egresos").textContent = formatoMoneda(totalEgresos());
  d.getElementById("porcentaje").textContent = formatoPorcentaje(porcentaje);

  console.log(formatoMoneda(presupuesto));
  console.log(formatoPorcentaje(porcentajeEgreso));
  console.log(formatoMoneda(totalIngresos()));
  console.log(formatoMoneda(totalEgresos()));
};

const totalIngresos = () => {
  let totalIngresos = 0;

  for (let ingreso of ingresos) {
    totalIngresos += parseFloat(ingreso.valor);
  }

  return totalIngresos;
};

const totalEgresos = () => {
  let totalEgresos = 0;

  for (let egreso of egresos) {
    totalEgresos += parseFloat(egreso.valor);
  }

  return totalEgresos;
};

const formatoMoneda = (valor) => {
  let formato = valor.toLocaleString("es-Mx", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
  return formato;
};

const formatoPorcentaje = (valor) => {
  let formato = valor.toLocaleString("es-Mx", {
    style: "percent",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
  return formato;
};

const cargarIngresos = () => {
  let ingresosHTML = "";

  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(
      ingreso.descripcion,
      ingreso.valor,
      ingreso.id
    );
  }
  d.getElementById("lista-ingresos").innerHTML = ingresosHTML;
  eliminarIngreso();
};

const crearIngresoHTML = (consept, valor, id) => {
  let porcentaje = valor / totalIngresos();

  return `<div class="elemento limpiarEstilos">
<div class="elemento_descripcion">${consept}</div>
<div class="derecha limpiarEstilos">
    <div class="elemento_valor">+ ${formatoMoneda(valor)} MXN
    </div>
    <div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
    <div class="elemento_eliminar">
        <button type="button" class="elemento_eliminar--btn"><ion-icon
                name="close-circle-outline" data-id="${id}"></ion-icon></button>
    </div>
</div>
</div>`;
};

// ##############################EGRESOS#######################################

const cargarEgresos = () => {
  let egresosHTML = "";

  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(
      egreso._descripcion,
      egreso.valor,
      egreso.id
    );
  }
  d.getElementById("lista-egresos").innerHTML = egresosHTML;
  eliminarEgreso();
};

const crearEgresoHTML = (consept, valor, id) => {
  //let porcentaje = valor / totalEgresos();
  let porcentaje = valor / totalEgresos();

  return `                <div class="elemento limpiarEstilos">
  <div class="elemento_descripcion">${consept}</div>
  <div class="derecha limpiarEstilos">
      <div class="elemento_valor">-${formatoMoneda(valor)} MXN
      </div>
      <div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
      <div class="elemento_eliminar">
          <button type="button" class="elemento_eliminar--btn"><ion-icon
                  name="close-circle-outline"  data-id="${id}"></ion-icon></button>
      </div>

  </div>
</div>`;
};
//onclick="eliminarEgreso(${id})"

const agregarDato = () => {
  let boton = ".agregar_btn";
  const forma = d.getElementById("forma");
  let select = d.getElementById("tipo");
  let tipo = select.options[select.selectedIndex];
  let descripcion = d.getElementById("descripcion");
  let valor = d.getElementById("valor");
  let helpmensaje = d.getElementById("helpmensaje");

  descripcion.addEventListener("keydown", (e) => {
    descripcion.classList.remove("is-invalid");
  });

  valor.addEventListener("keydown", (e) => {
    valor.classList.remove("is-invalid");
  });

  d.addEventListener("click", (event) => {
    const targetev = event.target;
    const isButton = targetev.closest(boton);
    let mensaje = "";
    if (isButton) {
      if (descripcion.value.trim() === "") {
        descripcion.classList.add("is-invalid");
        mensaje =
          "<p>Falta la descripcion, complete el campo correctamente.</p>";
      }
      if (isNaN(parseFloat(valor.value.trim()))) {
        valor.classList.add("is-invalid");
        mensaje +=
          "<p>Falta el campo valor, introduzca una cantidad correcta.</p>";
      }

      if (document.getElementsByClassName("is-invalid").length === 0) {
        console.log(select.value);

        switch (select.value) {
          case "ingreso":
            let valores = new Ingreso(descripcion.value, valor.value);
            ingresos.push(valores);
            localStorage.setItem("ingresos", JSON.stringify(ingresos));
            console.log(valores);
            cargarCabecero();
            cargarIngresos();
            cargarEgresos();
            forma.reset();
            swalsuccess("Se agrego un nuevo ingreso:");
            break;

          case "egreso":
            let valoresb = new Egreso(descripcion.value, valor.value);
            egresos.push(valoresb);
            localStorage.setItem("egresos", JSON.stringify(egresos));
            cargarCabecero();
            cargarIngresos();
            cargarEgresos();
            forma.reset();
            swalsuccess("Se agrego un nuevo egreso");
            break;

          default:
            break;
        }
      } else {
        Swal.fire({
          icon: "error",
          title: select.value,
          html: mensaje,
          footer: "",
        });
      }
    }
  });
};
const eliminarEgreso = () => {
  const container = document.querySelector("#lista-egresos");
  const matches = container.querySelectorAll(
    "ion-icon[name='close-circle-outline']"
  );
  console.log(matches);
  matches.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const targetev = event.target;
      let id = parseFloat(targetev.getAttribute("data-id"));

      let indiceEliminar = egresos.findIndex((egreso) => egreso.id == id);
      if (indiceEliminar !== -1) {
        // Eliminar el elemento del arreglo egresos utilizando el método splice
        egresos.splice(indiceEliminar, 1);
        localStorage.setItem("egresos", JSON.stringify(egresos));
        console.log(egresos);
        // Recargar el cabecero
        cargarCabecero();
        // Recargar los egresos
        cargarIngresos();
        cargarEgresos();
        eliminarEgreso();
      }
    });
  });
  // let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
};

const eliminarIngreso = () => {
  const container = document.querySelector("#lista-ingresos");
  const matches = container.querySelectorAll(
    "ion-icon[name='close-circle-outline']"
  );
  console.log(matches);
  matches.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const targetev = event.target;
      let id = parseFloat(targetev.getAttribute("data-id"));

      let indiceEliminar = ingresos.findIndex((egreso) => egreso.id == id);
      if (indiceEliminar !== -1) {
        // Eliminar el elemento del arreglo ingresos utilizando el método splice
        ingresos.splice(indiceEliminar, 1);
        localStorage.setItem("ingresos", JSON.stringify(ingresos));
        console.log(ingresos);
        // Recargar el cabecero
        cargarCabecero();
        // Recargar los ingresos
        cargarIngresos();
        cargarEgresos();
        eliminarIngreso();
      }
    });
  });
  // let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
};

const darkMode = () => {
  // DARK MODE

  // SE DECLARA LA CONSTANTE QUE ES EL ELEMENTO DEL DOM
  const btnSwitch = document.querySelector("#switch");

  // FUNCIÓN DE EVENTO DE TIPO CLICK
  btnSwitch.addEventListener("click", () => {
    // AL DAR CLICK SE AGREGA O SE QUITA LA CLASE "DARK" AL BODY
    document.body.classList.toggle("dark");

    // AL DAR CLICK SE AGREGA O SE QUITA LA CLASE "ACTIVE" AL BOTÓN
    btnSwitch.classList.toggle("active");

    // guardar el modo dark en local storage con una variable y un valor
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("dark-mode", "true");
    } else {
      localStorage.setItem("dark-mode", "false");
    }
  });
};

d.addEventListener("DOMContentLoaded", () => {
  mostrarDatosPorPrimeraVez();
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
  agregarDato();
  darkMode();
  //eliminarIngreso();
  // eliminarEgreso();
});

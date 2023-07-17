import Dato from "./Dato.js";
import Ingreso from "./Ingreso.js";
import Egreso from "./Egreso.js";

const d = document;
const ingresosStorage = JSON.parse(localStorage.getItem("ingresos"));
const egresosStore = JSON.parse(localStorage.getItem("egresos"));
var ingresos = [];
var egresos = [];

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

const cargarCabecero = () => {
  const presupuesto = totalIngresos() - totalEgresos();

  const porcentajeEgreso = totalEgresos() / totalIngresos();

  d.getElementById("presupuesto").textContent = formatoMoneda(presupuesto);
  d.getElementById("ingresos").textContent = formatoMoneda(totalIngresos());
  d.getElementById("egresos").textContent = formatoMoneda(totalEgresos());
  d.getElementById("porcentaje").textContent =
    formatoPorcentaje(porcentajeEgreso);

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
  return `<div class="elemento limpiarEstilos">
<div class="elemento_descripcion">${consept}</div>
<div class="derecha limpiarEstilos">
    <div class="elemento_valor">+ ${formatoMoneda(valor)} MXN
    </div>
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
  return `                <div class="elemento limpiarEstilos">
  <div class="elemento_descripcion">${consept}</div>
  <div class="derecha limpiarEstilos">
      <div class="elemento_valor">-${formatoMoneda(valor)} MXN
      </div>
      <div class="elemento_porcentaje"></div>
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
            forma.reset();
            swalsuccess("Se agrego un nuevo ingreso:");
            break;

          case "egreso":
            let valoresb = new Egreso(descripcion.value, valor.value);
            egresos.push(valoresb);
            localStorage.setItem("egresos", JSON.stringify(egresos));
            cargarCabecero();
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
        eliminarIngreso();
      }
    });
  });
  // let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
};
d.addEventListener("DOMContentLoaded", () => {
  mostrarDatosPorPrimeraVez();
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
  agregarDato();
  eliminarIngreso();
  eliminarEgreso();
});

const {
  getLicencias,
  createLicencia,
  getLicencia,
  updateState,
  editLicenciaDb,
} = require("../../../controllers/licensesController");

const $ = require("jquery");

let editLicencia = JSON.parse(localStorage.getItem("editLicencia")) || null;

const printRows = async (state) => {
  data = await getLicencias(state);
  $(".tbl-licencias").html("");
  data.forEach(({ id, nombre, valor, estado }) => {
    $(".tbl-licencias").append(`
        <tr id="${id}">
            <td>${id}</td>
            <td>${nombre}</td>
            <td>${valor}</td>
            <td>${
              estado == 1
                ? '<span class="badge text-bg-success">Activa</span>'
                : '<span class="badge text-bg-danger">Inactiva</span>'
            }</td>
            <td class="d-flex justify-content-center">
                <button class="btn btn-warning mx-2 btn-editar">
                    Editar
                </button>

                ${
                  estado == 1
                    ? '<button class="btn btn-danger btn-state">Deshabilitar</button>'
                    : '<button class="btn btn-success btn-state">Activar</button>'
                }

                
            </td>
        </tr>
    `);
  });
};

$("#form-licencia").on("submit", async function (e) {
  e.preventDefault();

  const nombre = $(".nombre").val();
  const valor = $(".valor").val();

  if (nombre != null && valor != null) {
    const licencia = {
      nombre,
      valor,
      estado: 1,
    };
    const data = await createLicencia(licencia);

    console.log(data);

    if (data.insertId) {
      window.location.href = "index.html";
    }
  }
});

$(document).on("click", ".btn-state", async function (e) {
  let id = $(this)[0].parentElement.parentElement.id;
  let licencia = await getLicencia(id);

  if (licencia) {
    LicenciaActualizada = {
      id: licencia[0].id,
      nombre: licencia[0].nombre,
      valor: licencia[0].valor,
      estado: licencia[0].estado === 1 ? 0 : 1,
    };

    await updateState(LicenciaActualizada);

    let state = parseInt($("#show-list").attr("state"));

    printRows(state);
  }
});

$(document).on("click", "#show-list", function (e) {
  const state = $(this).attr("state");

  if (state == 1) {
    $(this).attr("state", 0);
    $(this).html("Ver licencias activas");
    printRows(0);
  } else {
    $(this).attr("state", 1);
    $(this).html("Ver licencias Inactivas");
    printRows(1);
  }
});

$(document).on("click", ".btn-editar", async function (e) {
  const id = $(this)[0].parentElement.parentElement.id;
  let licencia = await getLicencia(id);
  localStorage.setItem("editLicencia", JSON.stringify(licencia[0]));
  window.location.href = "edit.html";
});

if (editLicencia != null) {
  $(".nombre-edit").val(editLicencia.nombre);
  $(".valor-edit").val(editLicencia.valor);
}

$("#form-licencia-edit").on("submit", async function (e) {
  e.preventDefault();

  const nombre = $(".nombre-edit").val();
  const valor = $(".valor-edit").val();

  if (nombre != null && valor != null) {
    const licencia = {
      id: editLicencia.id,
      nombre,
      valor,
      estado: editLicencia.estado,
    };
    const data = await editLicenciaDb(licencia, editLicencia.id);

    console.log(data);

    if (data) {
      window.location.href = "index.html";
    }
  }
});

const init = () => {
  printRows(1);
};

init();

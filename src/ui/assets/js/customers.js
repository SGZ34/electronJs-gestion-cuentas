const {
  getClientes,
  createCliente,
  getCliente,
  updateState,
  editClienteDb,
} = require("../../../controllers/customersController");

const $ = require("jquery");

let editCliente = JSON.parse(localStorage.getItem("editCliente")) || null;

const printRows = async (state) => {
  data = await getClientes(state);

  $(".tbl-clientes").html("");
  data.forEach(({ id, nombre, correo, estado }) => {
    $(".tbl-clientes").append(`
          <tr id="${id}">
              <td>${id}</td>
              <td>${nombre}</td>
              <td>${correo}</td>
              
              <td>${
                estado == 1
                  ? '<span class="badge text-bg-success">Activo</span>'
                  : '<span class="badge text-bg-danger">Inactivo</span>'
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

$(document).on("click", ".btn-state", async function (e) {
  let id = $(this)[0].parentElement.parentElement.id;
  let cliente = await getCliente(id);

  if (cliente) {
    clienteActualizado = {
      id: cliente[0].id,
      nombre: cliente[0].nombre,
      correo: cliente[0].correo,
      estado: cliente[0].estado === 1 ? 0 : 1,
    };

    await updateState(clienteActualizado);

    let state = parseInt($("#show-list").attr("state"));

    printRows(state);
  }
});

$(document).on("click", "#show-list", function (e) {
  const state = $(this).attr("state");

  if (state == 1) {
    $(this).attr("state", 0);
    $(this).html("Ver clientes activos");
    printRows(0);
  } else {
    $(this).attr("state", 1);
    $(this).html("Ver clientes Inactivos");
    printRows(1);
  }
});

$(document).on("click", ".btn-editar", async function (e) {
  const id = $(this)[0].parentElement.parentElement.id;
  let cliente = await getCliente(id);
  localStorage.setItem("editCliente", JSON.stringify(cliente[0]));
  window.location.href = "editCustomer.html";
});

if (editCliente != null) {
  $(".nombre-edit").val(editCliente.nombre);
  $(".correo-edit").val(editCliente.correo);
}

const init = () => {
  printRows(1);
};

init();

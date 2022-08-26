const {
  createCustomerForm,
  createCliente,
  createLicenciasClientes,
} = require("../../../controllers/customersController");

const $ = require("jquery");

let licenciasCliente = [];

const init = async () => {
  const licencias = await createCustomerForm();

  licencias.forEach((l) => {
    $("#licencia").append(`
            <option value="${l.id}" valor="${l.valor}">${l.nombre}</option>
    
        `);
  });
};

$("#create-cliente").on("submit", async function (e) {
  e.preventDefault();

  const nombre = $(".nombre").val();
  const correo = $(".correo").val();

  if (nombre != "" && correo != "") {
    const cliente = {
      nombre,
      correo,
      estado: 1,
    };
    const clienteCreado = await createCliente(cliente);
    if (licenciasCliente.length > 0) {
      await createLicenciasClientes(
        clienteCreado.insertId,
        JSON.stringify(licenciasCliente)
      );
    }

    window.location.href = "index.html";
  } else {
    alert("Compruebe que los datos han sido digitados correctamente");
  }
});

$("#add-licencia").on("click", function () {
  const licenciaId = $("#licencia option:selected").val();
  const licenciaNombre = $("#licencia option:selected").text();
  const licenciaValor = $("#licencia option:selected").attr("valor");

  if (licenciaId != null && licenciaId != 0) {
    $("#licencias-cliente").append(`
        <tr id="${licenciaId}">
            <td>${licenciaId}</td>
            <td>${licenciaNombre}</td>
            <td>${licenciaValor}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="eliminarLicencia(${licenciaId})">Eliminar
                </button>
            </td>
        <tr>
    
    `);

    licenciasCliente = [...licenciasCliente, licenciaId];
  }
});

function eliminarLicencia(id) {
  $("#" + id).remove();
}

init();

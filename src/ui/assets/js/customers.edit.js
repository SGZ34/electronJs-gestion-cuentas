const {
  EditCustomerForm,
  eliminarLicenciaCliente,
  editClienteDb,
  createLicenciasClientes,
} = require("../../../controllers/customersController");

const $ = require("jquery");

let licenciasCliente = [];
const editCliente = JSON.parse(localStorage.getItem("editCliente")) || null;
const init = async () => {
  const [licencias, cuentasClientes] = await EditCustomerForm(editCliente.id);

  licencias.forEach((l) => {
    $("#licencia").append(`
            <option value="${l.id}" valor="${l.valor}">${l.nombre}</option>
    
        `);
  });

  cuentasClientes.forEach(({ clienteLicenciaId, nombre, valor }) => {
    $("#licencias-cliente").append(`
      <tr id="${clienteLicenciaId}">
      <td>${nombre}</td>
      <td>${valor}</td>
      <td>
          <button type="button" class="btn btn-danger" onclick="eliminarLicenciaExistente(${clienteLicenciaId})">Eliminar
          </button>
      </td>
  <tr>
      `);
  });

  $(".nombre-edit").val(editCliente.nombre);
  $(".correo-edit").val(editCliente.correo);
};

$("#add-licencia").on("click", function () {
  const licenciaId = $("#licencia option:selected").val();
  const licenciaNombre = $("#licencia option:selected").text();
  const licenciaValor = $("#licencia option:selected").attr("valor");

  if (licenciaId != null && licenciaId != 0) {
    $("#licencias-cliente").append(`
        <tr id="${licenciaId}">
            
            <td>${licenciaNombre}</td>
            <td>${licenciaValor}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="eliminarLicencia(${licenciaId})">Eliminar
                </button>
            </td>
        <tr>
    
    `);

    licenciasCliente = [...licenciasCliente, licenciaId];
    console.log(licenciasCliente);
  }
});

$("#edit-cliente").on("submit", async function (e) {
  e.preventDefault();

  const nombre = $(".nombre-edit").val();
  const correo = $(".correo-edit").val();

  if (nombre != "" && correo != "") {
    const cliente = {
      id: editCliente.id,
      nombre,
      correo,
      estado: editCliente.estado,
    };
    await editClienteDb(cliente, editCliente.id);

    if (licenciasCliente.length > 0) {
      await createLicenciasClientes(
        editCliente.id,
        JSON.stringify(licenciasCliente)
      );
    }

    window.location.href = "index.html";
  }
});

const eliminarLicenciaExistente = async (id) => {
  if (confirm("¿Deseas eliminar la licencia?")) {
    await eliminarLicenciaCliente(id);
    location.reload();
  }
};

function eliminarLicencia(id) {
  $("#" + id).remove();
}
init();

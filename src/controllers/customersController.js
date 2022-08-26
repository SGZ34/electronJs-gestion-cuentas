const { getConnection } = require("../db");

const getClientes = async (estado) => {
  try {
    const conn = await getConnection();
    const data = await conn.query(
      "SELECT id, nombre, correo, estado FROM clientes WHERE clientes.estado = ?",
      estado
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const createCustomerForm = async () => {
  try {
    const conn = await getConnection();

    const licencias = await conn.query(
      "SELECT * FROM licencias WHERE estado = ?",
      1
    );

    return licencias;
  } catch (error) {
    console.log(error);
  }
};

const createCliente = async (cliente) => {
  try {
    const conn = await getConnection();
    const clienteCreado = await conn.query(
      "INSERT INTO clientes SET ?",
      cliente
    );
    return clienteCreado;
  } catch (error) {
    return null;
  }
};

const getCliente = async (id) => {
  try {
    const conn = await getConnection();
    const res = await conn.query("SELECT * FROM clientes WHERE id = ?", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const EditCustomerForm = async (id) => {
  try {
    const conn = await getConnection();

    const licencias = await conn.query(
      "SELECT * FROM licencias WHERE estado = ?",
      1
    );

    const clienteLicencias = await conn.query(
      "SELECT clientes_licencias.id as clienteLicenciaId, licencias.nombre, licencias.valor FROM clientes_licencias INNER JOIN licencias ON clientes_licencias.idLicencia = licencias.id INNER JOIN clientes ON clientes_licencias.idCliente = clientes.id WHERE clientes_licencias.idCliente = ?",
      id
    );

    return [licencias, clienteLicencias];
  } catch (error) {
    console.log(error);
  }
};

const updateState = async (cliente) => {
  try {
    const conn = await getConnection();
    const res = await conn.query("UPDATE clientes SET ? WHERE id = ?", [
      cliente,
      cliente.id,
    ]);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const editClienteDb = async (cliente, id) => {
  try {
    const conn = await getConnection();
    const clienteUpdated = await conn.query(
      "UPDATE clientes SET ? WHERE id = ?",
      [cliente, id]
    );
    return clienteUpdated;
  } catch (error) {
    console.log(error);
  }
};

const createLicenciasClientes = async (idCliente, listadoLicencias) => {
  const conn = await getConnection();
  listadoLicencias = JSON.parse(listadoLicencias);

  for (let i = 0; i < listadoLicencias.length; i++) {
    await conn.query("INSERT INTO clientes_licencias SET ?", {
      idCliente,
      idLicencia: listadoLicencias[i],
    });
  }
};

const eliminarLicenciaCliente = async (id) => {
  const conn = await getConnection();
  await conn.query("DELETE FROM clientes_licencias WHERE id = ?", id);
};

module.exports = {
  getClientes,
  createCliente,
  getCliente,
  updateState,
  editClienteDb,
  createCustomerForm,
  createLicenciasClientes,
  EditCustomerForm,
  eliminarLicenciaCliente,
};

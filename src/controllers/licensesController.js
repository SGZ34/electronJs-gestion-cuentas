const { getConnection } = require("../db");

const getLicencias = async (estado) => {
  try {
    const conn = await getConnection();
    const data = await conn.query(
      "SELECT * FROM licencias WHERE estado = ?",
      estado
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createLicencia = async (licencia) => {
  try {
    const conn = await getConnection();
    licencia.valor = parseInt(licencia.valor);
    const res = await conn.query("INSERT INTO licencias SET ?", licencia);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getLicencia = async (id) => {
  try {
    const conn = await getConnection();
    const res = await conn.query("SELECT * FROM licencias WHERE id = ?", id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateState = async (licencia) => {
  try {
    const conn = await getConnection();
    const res = await conn.query("UPDATE licencias SET ? WHERE id = ?", [
      licencia,
      licencia.id,
    ]);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const editLicenciaDb = async (licencia, id) => {
  try {
    const conn = await getConnection();
    const licenciaUpdated = await conn.query(
      "UPDATE licencias SET ? WHERE id = ?",
      [licencia, id]
    );
    return licenciaUpdated;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLicencias,
  createLicencia,
  getLicencia,
  updateState,
  editLicenciaDb,
};

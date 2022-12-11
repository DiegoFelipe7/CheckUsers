const { response } = require("express");
const { db } = require("../helpers/config");
/**
 * Verifica que el usuario no tenga registrada una finca
 * @param {*} req
 * @param {*} res
 */ exports.insertCollaborator = async (req, res = response) => {
  const { idUser } = req.params;
  const { idFarm } = req.params;
  const querySnapshotusers = await db
    .collection("farms")
    .where("collaborators", "array-contains", idUser)
    .get();
  if (querySnapshotusers.docs.length === 1) {
    return res.status(400).json({ msg: "Ya eres colaborador de esta finca" });
  }
  const queryFarm = await db.collection("farms").doc(idFarm).get();
  this.data(queryFarm, idUser, idFarm, req, res);
};
/**
 * Metodo para redireccion de la pagina principal
 * @param {*} req
 * @param {*} res
 */
exports.farm = async (req, res = response) => {
  const { idUser } = req.params;
  const { idFarm } = req.params;
  const querySnapshot = await db.collection("users").doc(idUser).get();
  const querySnapshotFarm = await db.collection("farms").doc(idFarm).get();

  if (querySnapshot.exists && querySnapshotFarm.exists) {
    await res.status(200).render("index", {
      data: {
        name: querySnapshot.data().names,
        farm: querySnapshotFarm.data().farmName,
      },
    });
  } else {
    await res.status(200).render("error");
  }
};
/**
 * Metodo para ingresar un nuevo colaborador en una finca
 * @param {*} queryFarm
 * @param {*} idUser
 * @param {*} idFarm
 * @param {*} req
 * @param {*} res
 */

exports.data = (queryFarm, idUser, idFarm, req, res = response) => {
  const { farmName, collaborators } = queryFarm.data();
  collaborators.push(idUser);
  db.collection("farms")
    .doc(idFarm)
    .update({
      collaborators,
    })
    .then((data) => {
      res.status(201).json({
        msg: "Colaborador registrado en la finca " + farmName,
        status: true,
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: "Ocurrio un erro intentalo nuevamente",
        status: false,
      });
    });
};

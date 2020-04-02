const BaseRepository = require("./base.repository");
const sequelize = require("../utils/dbSetup.utils");

class CommentRepository extends BaseRepository {
  constructor({ Comment }) {
      super(Comment);
  }

  async getAllCommentsFromPost(id) {
    const entities = await sequelize.query(
      "SELECT usuarios.usuario,publi.titulo, comentarios.texto ,comentarios.createdAt" +
        " FROM comentarios as comentarios,usuarios as usuarios,publicaciones as publi " +
        "WHERE comentarios.publicaciones_idpublicacion = (:id) " +
        "and publi.idPublicacion = (:id) " +
        "and usuarios.idusuario = comentarios.usuarios_idusuarios",{
        replacements: { id: id },
        type: sequelize.QueryTypes.SELECT
      }
    );

    return entities;
  }
}

module.exports = CommentRepository;

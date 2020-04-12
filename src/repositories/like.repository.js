const BaseRepository = require("./base.repository");
const sequelize = require("../utils/dbSetup.utils");

class LikeRepository extends BaseRepository {
  constructor({ Likes}) {
    super(Likes);
  }

  async getAllLikesFromPost(id) {
    const entities = await sequelize.query(
      "SELECT usuarios.usuario,likes.idlike,publi.titulo" +
        " FROM likes as likes,usuarios as usuarios,publicaciones as publi " +
        "WHERE likes.publicaciones_idpublicacion = (:id) " +
        "and publi.idPublicacion = (:id) " +
        "and usuarios.idusuario = likes.usuarios_idusuarios",{
        replacements: { id: id },
        type: sequelize.QueryTypes.SELECT
      }
    );

    return entities;
  }
}

module.exports = LikeRepository;

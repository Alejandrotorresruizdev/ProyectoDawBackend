const BaseRepository = require("./base.repository");
const { User } = require("../models/index");

let _postModel = null;
class PostRepository extends BaseRepository {
  constructor({ Post }) {
    super(Post);
    _postModel = Post;
  }

  async getPostByIdUser(id, offset, limit) {
    console.log(offset)
    const listPost = _postModel
      .findAndCountAll({
        where: {
          usuarios_idusuarios: id,
        },
        include: User,
        offset: parseInt(offset),
        limit: parseInt(limit),
      })
      .then((list) => {
        return list;
      })
      .catch((err) => {
        console.log(err)
        return false;
      });

    return listPost;
  }
}

// SELECT  comentarios.idcomentario,usuarios.usuario,publicaciones.titulo, comentarios.texto
// FROM mydb.publicaciones as publicaciones,
// mydb.comentarios as comentarios,
// mydb.usuarios as usuarios
// where publicaciones.idPublicacion = 1
// and comentarios.publicaciones_idpublicacion = 1
// and usuarios.idusuario = comentarios.usuarios_idusuarios and comentarios.idcomentario > 4 limit 4

module.exports = PostRepository;

var nodemailer = require("nodemailer");

const mailerFunctions = {};

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "compartelahistoriarecovery@gmail.com",
    pass: "AdministracionAdmin159"
  }
});

mailerFunctions.send = async (recovery_password_token, email) => {

  let contentHTML = `
    <h1>Recuperación de contraseña</h1>
    <ul>
    Nueva contraseña :${recovery_password_token}
    </ul>
  `;

  let mailOptionsObject = {
    from: "Comparte la historia",
    to: "compartelahistoriarecovery@gmail.com", // Pruebas:: El email del usuario
    subject: "Recuperación de contraseña",
    html: contentHTML
  };

  let sendEmailResponse = await transporter
    .sendMail(mailOptionsObject)
    .then(function() {
      return true;
    })
    .catch(function(err) {
      return false;
    });

  return sendEmailResponse;
};

module.exports = mailerFunctions;

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
  let sent = "dddd";

  contentHTML = `
    <h1>Recuperación de contraseña</h1>
    <ul>
    Nueva contraseña :${recovery_password_token}
    </ul>
  `;

  var mailOptionsObject = {
    from: "Comparte la historia",
    to: "compartelahistoriarecovery@gmail.com", // EL email del usuaripo
    subject: "Recuperación de contraseña",
    html: contentHTML
  };

  let sendEmailResponse = await transporter
    .sendMail(mailOptionsObject)
    .then(function(info) {
      return true;
    })
    .catch(function(err) {
      console.log(err);
      return false;
    });

  return sendEmailResponse;
};

module.exports = mailerFunctions;

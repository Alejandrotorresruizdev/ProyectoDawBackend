const models = require("../models");
const User = models.User;
const Post = models.Post;

// User.create({
//     full_name: "My super company",
//     usuario: "chispa",
//     password:"123456"
//   })
//   .then((newCompany) => {
//     // The get() function allows you to recover only the DataValues of the object
//     console.log(newCompany.get())
//   })
//   .catch((err) => {
//     console.log("Error while company creation : ", err)
//   })

// Post.bulkCreate([
//     {titulo: 'Titulo nuevo', cuerpo: 'John', userId: 1},
//     {titulo: 'Titulo nuevo2', cuerpo: 'John', userId: 1},
//     {titulo: 'Titulo nuevo3', cuerpo: 'John', userId: 1},
//   ])
//   .then((newUsers) => {
//     console.log(newUsers)
//   })
//   .catch((err) => {
//     console.log("Error while users creation : ", err)
//   })

//   Post.findOne({
//     where: {id: 2}, include: 'user'
//   })
//   .then((findedUser) => {
//     // Get the User with Company datas included
//     console.log(findedUser)
//     // Get the company record only
//     // console.log(findedUser.company)
//   })
//   .catch((err) => {
//     console.log("Error while find user : ", err)
//   })

// Post.findAll(1, {include: ['user']})
// .then((company) => {
//   // Get the Company with Users (employes) datas included
//   console.log(company)
//   // Get the Users (employes) records only
//   // console.log(company.get().employes)
// })
// .catch((err) => {
//   console.log("Error while find company : ", err)
// })

Post.findAndCountAll({
  where: {UserId: 1},
  include: ["user"],
})
  .then((company) => {
    // Get the Company with Users (employes) datas included
    console.log(company);
    // Get the Users (employes) records only
    // console.log(Post.get().user);
  })
  .catch((err) => {
    console.log("Error while find company : ", err);
  });

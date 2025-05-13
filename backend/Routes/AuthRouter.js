
const { signup, login } = require("../Controllers/AuthCOntroller");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");

const router = require("express").Router();

// router.post('/login' , (req, res) => {
//     res.send('Login success')
// });

// router.post('/signup' , (req, res) => {
//     res.send('Signup route')
// }
// );
router.post('/login' , loginValidation , login );
router.post('/signup' , signupValidation , signup );

module.exports = router;
const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.post('/' , ensureAuthenticated ,(req, res) => {
    console.log("------ logged in user detail------" , req.user);
    res.status(200)
    .json([
        {
            name : "Product 1",
            price : 100,
        },
    ]);
});


module.exports = router;
const { Router } = require("express");
const { check } = require("express-validator");

const { emailExist, isRoleValid } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

const { usersGet, usersPost } = require("../controllers/users");
const { isAdminRole } = require("../middlewares/validate-roles");
const { validateJWT } = require("../middlewares/validate-jwt");


const router = Router();

router.get('/', usersGet)

router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must at least be 6 characters').isLength({ min:6 }),
    check('email', 'The email is not valid').isEmail().bail().custom( emailExist ),
    check('role').custom( isRoleValid ),
    isAdminRole,
    validateFields
],usersPost)


module.exports = router;
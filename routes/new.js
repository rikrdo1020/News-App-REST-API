const { Router } = require("express");

const { validateFields } = require("../middlewares/validate-fields");
const { validateApiKey } = require("../middlewares/validate-apiKey");

const { newsGet } = require("../controllers/news");

const router = Router();

router.get('/',[
    validateApiKey,
    validateFields
], newsGet)


module.exports = router;
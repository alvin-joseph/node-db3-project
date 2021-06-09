const Scheme = require('./scheme-model')

const checkSchemeId = (req, res, next) => {
  Scheme.findById(req.params.id)
    .then(scheme => {
      if (!scheme) {
        next({
          message: "scheme with scheme_id ${req.params.id} not found",
          status: 404
        })
      } else {
        req.scheme = scheme
        next()
      }
    })
}

const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body
  if (!scheme_name || scheme_name === "" || typeof scheme_name !== "string") {
    next({
      message: "invalid scheme_name",
      status: 400
    })
  } else {
    next()
  }
}

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  if(!instructions || instructions === "" || 
    typeof instructions !== "string" || typeof step_number !== "number"
    || step_number < 1) {
    next({
      message: "invalid step",
      status: 400
    })
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}

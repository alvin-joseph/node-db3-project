const db = require('../../data/db-config')

const checkSchemeId = async (req, res, next) => {
  try {
    const existing = await db('schemes')
      .where('scheme_id', req.params.scheme_id)
      .first()

    if (!existing) {
      next({ 
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
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

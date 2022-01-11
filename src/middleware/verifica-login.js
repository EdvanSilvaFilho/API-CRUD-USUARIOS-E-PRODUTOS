const conexao = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const segredo = require('../segredos-token/segredo-token-usuario')

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.'
    })
  }

  try {
    const token = authorization.replace('Bearer', '').trim()

    const verificaToken = jwt.verify(token, segredo)

    const { id } = verificaToken

    const queryUsuario = 'select * from usuarios where id = $1'

    const verificaUsuario = await conexao.query(queryUsuario, [id])

    const { rows, rowCount: usuarioVerificado } = verificaUsuario

    if (usuarioVerificado === 0) {
      return res.status(404).json({
        mensagem: 'Usuario não encontrado na base de dados.'
      })
    }

    const usuario = rows[0]

    req.usuario = usuario

    next()
  } catch (error) {
    return res.status(500).json({
      mensagem: error.message
    })
  }
}

module.exports = {
  verificaLogin
}

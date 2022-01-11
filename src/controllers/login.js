const conexao = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const segredo = require('../segredos-token/segredo-token-usuario')

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(404).json({
      mensagem: 'Os campos email e senha são obrigatórios.'
    })
  }

  try {
    const queryVerificaEmail = 'select * from usuarios where email = $1'
    const { rows, rowCount: emailVerificado } = await conexao.query(
      queryVerificaEmail,
      [email]
    )

    if (emailVerificado === 0) {
      return res.status(404).json({
        mensagem: 'Usuário nao encontrado.'
      })
    }

    const usuario = rows[0]

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha)

    if (!senhaVerificada) {
      return res.status(404).json({
        mensagem: 'Email ou senha não conferem.'
      })
    }

    const token = jwt.sign(
      {
        id: usuario.id
      },
      segredo,
      {
        expiresIn: '10h'
      }
    )
    return res.status(200).json({
      token
    })
  } catch (error) {
    return res.status(500).json({
      mensagem: error.message
    })
  }
}

module.exports = {
  loginUsuario
}

const conexao = require('../conexao')
const bcrypt = require('bcrypt')
const { verificaEmail } = require('../utilitarios/verificaEmail')
const { senhaCriptografada } = require('../utilitarios/hashSenha')

const cadastroUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body
  if (!nome) {
    return res.status(400).json('O campo nome é obrigatório.')
  }

  if (!email) {
    return res.status(400).json({
      mensagem: 'O campo email é obrigatório.'
    })
  }

  if (!senha) {
    return res.status(400).json({
      mensagem: 'O campo senha é obrigatório.'
    })
  }

  if (!nome_loja) {
    return res.status(400).json({
      mensagem: 'O campo nome_loja é obrigatório.'
    })
  }

  try {
    const emailVerificado = await verificaEmail(email, res)

    const senhaCriptografadaUsuario = await senhaCriptografada(bcrypt, senha)

    const queryCadastroUsuario =
      'insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)'
    const usuario = await conexao.query(queryCadastroUsuario, [
      nome,
      email,
      senhaCriptografadaUsuario,
      nome_loja
    ])

    if (usuario.rowCount === 0) {
      return res.status(404).json({
        mensagem: 'Não foi possivel cadastrar o usuário.'
      })
    }

    return res.status(200).send()
  } catch (error) {
    return res.status(500).json({
      mensagem: error.message
    })
  }
}

module.exports = {
  cadastroUsuario
}

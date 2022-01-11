const conexao = require('../conexao')
const bcrypt = require('bcrypt')
const { verificaEmail } = require('../utilitarios/verificaEmail')
const { senhaCriptografada } = require('../utilitarios/hashSenha')

const atualizaUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body
  const { usuario } = req

  if (!nome) {
    return res.status(400).json({
      mensagem: 'Campo nome é obrigatório.'
    })
  }

  if (!email) {
    return res.status(400).json({
      mensagem: 'Campo email é obrigatório.'
    })
  }
  if (!senha) {
    return res.status(400).json({
      mensagem: 'Campo senha é obrigatório.'
    })
  }
  if (!nome_loja) {
    return res.status(400).json({
      mensagem: 'Campo nome_loja é obrigatório.'
    })
  }

  try {
    const emailVerificado = await verificaEmail(email, res)

    const senhaCriptografadaAtual = await senhaCriptografada(bcrypt, senha)

    const queryAtualizaUsuario =
      'update usuarios set nome = $1, email = $2, senha = $3, nome_loja = $4 where id = $5'
    const usuarioAtualizado = conexao.query(queryAtualizaUsuario, [
      nome,
      email,
      senhaCriptografadaAtual,
      nome_loja,
      usuario.id
    ])

    const { rowCount: verificaUsuarioAtualizado } = usuarioAtualizado

    if (verificaUsuarioAtualizado === 0) {
      return res.status(400).json({
        mensagem: 'Não foi possível atualizar dados com sucesso.'
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
  atualizaUsuario
}

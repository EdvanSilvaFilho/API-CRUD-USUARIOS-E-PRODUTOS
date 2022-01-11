const conexao = require('../conexao')

const verificaEmail = async (email, res) => {
  const queryVerificaEmail = 'select * from usuarios where email = $1'
  const { rowCount: qtdEmail } = await conexao.query(queryVerificaEmail, [
    email
  ])

  if (qtdEmail > 0) {
    return res.status(400).json({
      mensagem: 'Já existe um usuário cadastrado com o e-mail informado.'
    })
  }
  return queryVerificaEmail
}

module.exports = {
  verificaEmail
}

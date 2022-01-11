const conexao = require('../conexao')
const buscaProdutos = async req => {
  const { usuario } = req

  const queryBuscaProdutos = 'select * from produtos where usuario_id = $1'

  const buscaProdutosUsuario = await conexao.query(queryBuscaProdutos, [
    usuario.id
  ])

  return buscaProdutosUsuario
}

module.exports = {
  buscaProdutos
}

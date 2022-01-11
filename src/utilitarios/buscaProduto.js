const conexao = require('../conexao')

const buscaProduto = async (res, usuario_id, idProduto) => {
  const queryBuscaProduto =
    'select * from produtos where usuario_id = $1 and id = $2'
  const produtoEncontrado = await conexao.query(queryBuscaProduto, [
    usuario_id,
    idProduto
  ])

  return produtoEncontrado
}

module.exports = {
  buscaProduto
}

const { buscaProdutos } = require('../utilitarios/buscaProdutos')

const produtosUsuario = async (req, res) => {
  const { rows: produtos, rowCount: qtdProdutos } = await buscaProdutos(
    req,
    res
  )

  if (qtdProdutos === 0) {
    return res.status(404).json([])
  }

  return res.status(200).json(produtos)
}

module.exports = {
  produtosUsuario
}

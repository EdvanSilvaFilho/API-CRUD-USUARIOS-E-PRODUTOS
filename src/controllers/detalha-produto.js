const { buscaProdutos } = require('../utilitarios/buscaProdutos')

const infosProdutoUsuario = async (req, res) => {
  const { id } = req.params
  try {
    const { rows: produtos } = await buscaProdutos(req, res)

    const idProduto = Number(id)
    const produto = produtos.find(produto => produto.id === idProduto)

    if (!produto) {
      return res.status(404).json({
        mensagem: `Não existe produto cadastrado com ID ${idProduto}.`
      })
    }

    return res.status(200).json(produto)
  } catch (error) {
    return res.status(500).json({
      mensagem: error.message
    })
  }
}

module.exports = {
  infosProdutoUsuario
}

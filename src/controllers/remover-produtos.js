const conexao = require('../conexao')
const { buscaProduto } = require('../utilitarios/buscaProduto')

const deleteProdutoUsuario = async (req, res) => {
  const { usuario } = req

  const { id: idProduto } = req.params

  try {
    const { rowCount: verificaProduto } = await buscaProduto(
      usuario.id,
      idProduto
    )

    if (verificaProduto === 0) {
      return res.status(400).json({
        mensagem: `Não existe produto para o ID ${idProduto}.`
      })
    }

    const queryDeleteProduto =
      'delete from produtos where usuario_id = $1 and id = $2'
    const { rowCount: verificaDeleteProduto } = await conexao.query(
      queryDeleteProduto,
      [usuario.id, idProduto]
    )

    if (verificaDeleteProduto === 0) {
      return res.status(400).json({
        mensagem: 'Não foi possível excluir o produto com sucesso.'
      })
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({
      mensagem: error.message
    })
  }
}

module.exports = {
  deleteProdutoUsuario
}

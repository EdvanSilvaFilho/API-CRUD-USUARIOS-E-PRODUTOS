const conexao = require('../conexao')
const { buscaProduto } = require('../utilitarios/buscaProduto')

const atualizaProduto = async (req, res) => {
  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body

  const { usuario } = req

  const { id: idProduto } = req.params

  if (!nome) {
    return res.status(400).json({
      mensagem: 'O campo nome é obrigtório.'
    })
  }

  if (!quantidade) {
    return res.status(400).json({
      mensagem: 'O campo quantidade é obrigtório.'
    })
  }

  if (!categoria) {
    return res.status(400).json({
      mensagem: 'O campo categoria é obrigtório.'
    })
  }

  if (!preco) {
    return res.status(400).json({
      mensagem: 'O campo preco é obrigtório.'
    })
  }

  if (!descricao) {
    return res.status(400).json({
      mensagem: 'O campo descricao é obrigtório.'
    })
  }

  if (!imagem) {
    return res.status(400).json({
      mensagem: 'O campo imagem é obrigtório.'
    })
  }

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

    const queryBuscaProdutos =
      'update produtos set nome = $1, quantidade = $2, categoria = $3 , preco = $4, descricao = $5, imagem = $6 where id = $7 and usuario_id = $8'
    const { rowCount: verificaAtualizacaoProduto } = await conexao.query(
      queryBuscaProdutos,
      [nome, quantidade, categoria, preco, descricao, imagem, 10, usuario.id]
    )

    if (verificaAtualizacaoProduto === 0) {
      return res.status(400).json({
        mensagem: 'Não foi possível atualizar os dados do produto.'
      })
    }

    return res.status(201).send()
  } catch (error) {
    return res.status(500).json({
      mensagem: error.message
    })
  }
}

module.exports = {
  atualizaProduto
}

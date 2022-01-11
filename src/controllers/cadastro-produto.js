const conexao = require('../conexao')

const cadastroProduto = async (req, res) => {
  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body
  const { usuario } = req

  if (!nome) {
    return res.status(400).json({
      mensagem: 'O campo nome é obrigatório'
    })
  }

  if (!quantidade) {
    return res.status(400).json({
      mensagem: 'O campo quantidade é obrigatório'
    })
  }

  if (!categoria) {
    return res.status(400).json({
      mensagem: 'O campo categoria é obrigatório'
    })
  }

  if (!preco) {
    return res.status(400).json({
      mensagem: 'O campo preco é obrigatório'
    })
  }

  if (!descricao) {
    return res.status(400).json({
      mensagem: 'O campo descricao é obrigatório'
    })
  }

  if (!imagem) {
    return res.status(400).json({
      mensagem: 'O campo imagem é obrigatório'
    })
  }

  try {
    const queryCadastroProduto =
      'insert into produtos (nome, quantidade, categoria, preco, descricao, imagem, usuario_id) values ($1, $2, $3, $4, $5, $6, $7)'

    const { rows, rowCount: verificaCadastro } = await conexao.query(
      queryCadastroProduto,
      [nome, quantidade, categoria, preco, descricao, imagem, usuario.id]
    )

    if (verificaCadastro === 0) {
      return res.status(400).json({
        mensagem: 'Não foi possível cadastrar o produto.'
      })
    }

    return res.status(200).send()
  } catch (error) {
    mensagem: error.message
  }
}

module.exports = {
  cadastroProduto
}

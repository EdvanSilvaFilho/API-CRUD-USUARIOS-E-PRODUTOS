const dadosUsuario = (req, res) => {
  const { usuario: dadosUsuario } = req
  const { senha, ...usuario } = dadosUsuario
  return res.status(200).json(usuario)
}

module.exports = {
  dadosUsuario
}

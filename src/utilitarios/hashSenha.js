const senhaCriptografada = async (bcrypt, senha) => {
  try {
    const senhaHash = await bcrypt.hash(senha, 10)
    return senhaHash
  } catch (error) {
    return {
      mensagem: error.message
    }
  }
}

module.exports = {
  senhaCriptografada
}

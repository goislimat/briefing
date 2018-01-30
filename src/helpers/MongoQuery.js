module.exports = dbQueryOperation => {
  try {
    return dbQueryOperation
  } catch (err) {
    throw new Error(
      'Ooops!! Algo incomum aconteceu com o servidor. Tente executar essa operação novamente em alguns minutos. Se o erro persistir, contate o suporte.'
    )
  }
}

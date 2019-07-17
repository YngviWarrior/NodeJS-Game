function UsuariosDAO(connection){
    this._connection = connection()
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open( function(err, mongoclient) {
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario)

            mongoclient.close()
        })
    })
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open( function(err, mongoclient) {
        mongoclient.collection("usuarios", function(err, collection){
            // {usuario: usuario.usuario}, senha: usuario.senha}} //Como é de igualdade posso não usar os operadores de igualdade.
            collection.find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}}).toArray(function(err, result){
                if(result[0] != undefined)
                    req.session.autorizado = true //Variavel de sessão
                    // req.session.usuario = result[0].usuario //Variavel de sessão
                    // req.session.casa = result[0].casa //Variavel de sessão

                if(req.session.autorizado)
                    res.redirect('jogo')
                else
                    res.render('index', {validacao: {}})
            })
            mongoclient.close()
        })
    })
}

module.exports = function(){
     return UsuariosDAO
}
    
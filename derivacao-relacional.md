# Derivação para o esquema relacional

Utilizador(
    <u>idUser,</u>
    nome,
    dataNascimento,
    email,
    telefone,
    username,
    password,
)

Funcionario(
    *<u>idUser,</u>*
    *idZona*
)

Zona(
    <u>idZona,</u>
    nome
)

Estado(
    <u>idEstado,</u>
    nome,
    *idZona*
)

Cidade(
    <u>idCidade,</u>
    nome,
    *idEstado*
)

Cliente(
    *<u>idUser,</u>*
    moradaEntrega,
    *idSegmento*
)

Segmento(
    <u>idSegmento,</u>
    nome
)

Encomenda(
    <u>idEncomenda,</u>
    valorTotal,
    dataCriacao,
    *idPrioridade*,
    *idCliente*,
    *idFuncionario*
    *idEmbalagem*
)

Devolucao(
    *<u>idEncomenda</u>*
    motivo,
    data, 
    valor
)

TipoEmbalagem(
    <u>idEmbalagem,</u>
    nome
)

EstadoEncomenda(
    <u>idEstadoEncomenda,</u>
    nome, 
    data,
    *idEncomenda*
)

PrioridadeEncomenda(
    <u>idPrioridade,</u>
    nome
)

Pagamento(
    *<u>idEncomenda</u>*,
    data,
    modoPagamento
)

EstadoPagamento(
    <u>idEstadoPagamento,</u>
    nome, 
    *idPagamento*
)

ModoEntrega(
    <u>idModoEntrega,</u>
    nome
)

Entrega(
    <u>idEntrega</u>,
    data, 
    *idEncomenda*,
    *idModoEntrega*
)

LinhaEntrega(
    *<u> 
        idEntrega,
        idEncomenda,
        idProduto,
    </u>*
    quantidade
)

LinhaEncomenda(
    *<u> 
        idEncomenda,
        idProduto,
    </u>*
    quantidade,
    preco
)

Produto(
    <u>idProduto,</u>
    nome,
    dataRegisto,
    descricao,
    desconto, 
    stock, 
    peso,
    *idCategoria*
)

Categoria(
    <u>idCategoria,</u>
    nome,
    descricao,
    *idCategoriaPai*
)

Preco(
    *<u>idPreco,</u>*
    dataInicio,
    dataFim,
    valor,
    *idProduto*
)


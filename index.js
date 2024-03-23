const dados = require('./dados.json')
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const dadosCliente = require('./data/Cliente.json')
const dadosFornecedor = require('./data/Fornecedor.json')
const dadosMedicamento = require('./data/Medicamento.json')
const dadosVenda = require('./data/Venda.json')

const server = express()


server.use(cors())
server.use(express.json())

server.listen(3000, () => {
    console.log("O servidor está funcionando")
})

server.get('/', (req, res) => {
    return res.json({ mensagem: "Estou funcionando" })
})

//POST
server.post('/medicamento', (req, res) => {
    const novoMedicamento = req.body

    if (!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: "Dados não preenchidos ou incompletos, tente novamente" })
    } else {
        dadosMedicamento.Medicamento.push(novoMedicamento)
        salvarDadosMedicamento(dadosMedicamento)

        return res.status(201).json({ mensagem: "Medicamento cadastrado com sucesso" })
    }
})
server.post('/cliente', (req, res) => {
    const novoCliente = req.body

    if (!novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({ mensagem: "Dados não preenchidos ou incompletos, tente novamente" })
    } else {
        dadosCliente.Cliente.push(novoCliente)
        salvarDadosCliente(dadosCliente)

        return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso" })
    }
})
server.post('/fornecedor', (req, res) => {
    const novoFornecedor = req.body

    if (!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({ mensagem: "Dados não preenchidos ou incompletos, tente novamente" })
    } else {
        dadosFornecedor.Fornecedor.push(novoFornecedor)
        salvarDadosFornecedor(dadosFornecedor)

        return res.status(201).json({ mensagem: "Fornecedor cadastrado com sucesso" })
    }
})

server.post('/venda', (req, res) => {
    const novoVenda = req.body

    if (!novoVenda.data || !novoVenda.id_medicamento || !novoVenda.id_cliente) {
        return res.status(400).json({ mensagem: "Dados não preenchidos ou incompletos, tente novamente" })
    } else {
        dadosVenda.Venda.push(novoVenda)
        salvarDadosVenda(dadosVenda)

        return res.status(201).json({ mensagem: "Venda registrada com sucesso" })
    }
})

//GET
server.get('/Medicamento.json', (req, res) => {
    return res.json(dadosMedicamento.Medicamentos)
})
server.get('/Cliente.json', (req, res) => {
    return res.json(dadosCliente.Cliente)
})
server.get('/Fornecedor.json', (req, res) => {
    return res.json(dadosFornecedor.Fornecedor)
})
server.get('/Venda.json', (req, res) => {
    return res.json(dadosVenda.Venda)
})

//PUT
server.put('/medicamento/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id)
    const atualizarMedicamento = req.body

    const indiceMedicamento = dadosMedicamento.Medicamento.findIndex(u => u.id === medicamentoId)

    if (indiceMedicamento === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado" })
    } else {
        dadosMedicamento.Medicamento[indiceMedicamento].nome = atualizarMedicamento.nome || dadosMedicamento.Medicamento[indiceMedicamento].nome

        dadosMedicamento.Medicamento[indiceMedicamento].nome = atualizarMedicamento.nome || dadosMedicamento.Medicamento[indiceMedicamento].nome

        dadosMedicamento.Medicamento[indiceMedicamento].nome = atualizarMedicamento.nome || dadosMedicamento.Medicamento[indiceMedicamento].nome

        salvarDadosMedicamento(dadosMedicamento)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})
server.put('/cliente/:id', (req, res) => {
    const clienteId = parseInt(req.params.id)
    const atualizarCliente = req.body

    const indiceCliente = dadosCliente.Cliente.findIndex(u => u.id === clienteId)

    if (indiceCliente === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" })
    } else {
        dadosCliente.Cliente[indiceCliente].nome = atualizarCliente.nome || dadosCliente.Cliente[indiceCliente].nome

        dadosCliente.Cliente[indiceCliente].endereco = atualizarCliente.endereco || dadosCliente.Cliente[indiceCliente].endereco

        dadosCliente.Cliente[indiceCliente].email = atualizarCliente.telefone || dadosCliente.Cliente[indiceCliente].email

        dadosCliente.Cliente[indiceCliente].telefone = atualizarCliente.telefone || dadosCliente.Cliente[indiceCliente].telefone

        salvarDadosCliente(dadosCliente)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})
server.put('/fornecedor/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id)
    const atualizarFornecedor = req.body

    const indiceFornecedor = dadosFornecedor.Fornecedor.findIndex(u => u.id === fornecedorId)

    if (indiceFornecedor === -1) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado" })
    } else {
        dadosFornecedor.Fornecedor[indiceFornecedor].nome = atualizarFornecedor.nome || dadosFornecedor.Fornecedor[indiceFornecedor].nome

        dadosFornecedor.Fornecedor[indiceFornecedor].endereco = atualizarFornecedor.endereco || dadosFornecedor.Fornecedor[indiceFornecedor].endereco

        dadosFornecedor.Medicamento[indiceFornecedor].nome = atualizarFornecedor.telefone || dadosFornecedor.Fornecedor[indiceFornecedor].telefone

        salvarDadosFornecedor(dadosFornecedor)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})

server.put('/venda/:id', (req, res) => {
    const vendaId = parseInt(req.params.id)
    const atualizarVenda = req.body

    const indiceVenda = dadosVenda.Venda.findIndex(u => u.id === vendaId)

    if (indiceVenda === -1) {
        return res.status(404).json({ mensagem: "Venda não encontrado" })
    } else {
        dadosVenda.Venda[indiceVenda].data = atualizarVenda.data || dadosVenda.Venda[indiceVenda].data

        dadosVenda.Venda[indiceVenda].id_cliente = atualizarVenda.id_cliente || dadosVenda.Venda[indiceVenda].id_cliente

        dadosVenda.Venda[indiceVenda].id_medicamento = atualizarVenda.id_medicamento || dadosVenda.Venda[indiceVenda].id_medicamento

        salvarDadosVenda(dadosVenda)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})

//DELETE
server.delete('/medicamento/:id', (req, res) => {
    const id = parseInt(req.params.id)

    dadosMedicamento.Medicamento = dadosMedicamento.Medicamento.filter(u => u.id !== id)

    salvarDadosMedicamento(dadosMedicamento)
    return res.status(200).json({ mensagem: "Medicamento excluido com sucesso" })
})
server.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id)

    dadosCliente.Cliente = dadosCliente.Cliente.filter(u => u.id !== id)

    salvarDadosCliente(dadosCliente)
    return res.status(200).json({ mensagem: "Cliente excluido com sucesso" })
})
server.delete('/fornecedor/:id', (req, res) => {
    const id = parseInt(req.params.id)

    dadosFornecedor.Fornecedor = dadosFornecedor.Fornecedor.filter(u => u.id !== id)

    salvarDadosFornecedor(dadosFornecedor)
    return res.status(200).json({ mensagem: "Fornecedor excluido com sucesso" })
})
server.delete('/venda/:id', (req, res) => {
    const id = parseInt(req.params.id)

    dadosVenda.Venda = dadosVenda.Venda.filter(u => u.id !== id)

    salvarDadosVenda(dadosVenda)
    return res.status(200).json({ mensagem: "Venda excluida com sucesso" })
})



// FUNÇÃO SALVAR DADOS 
function salvarDadosMedicamento() {
    fs.writeFileSync(__dirname + "/data/Medicamento.json", JSON.stringify(dados, null, 2));
}
function salvarDadosCliente() {
    fs.writeFileSync(__dirname + "/data/Cliente.json", JSON.stringify(dados, null, 2));
}
function salvarDadosFornecedor() {
    fs.writeFileSync(__dirname + "/data/Fornecedor.json", JSON.stringify(dados, null, 2));
}
function salvarDadosVenda() {
    fs.writeFileSync(__dirname + "/data/Venda.json", JSON.stringify(dados, null, 2));
}
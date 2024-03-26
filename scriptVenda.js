const vendaForm = document.getElementById('venda-form')
const vendaList = document.getElementById('venda-list')

function listVendas() {
    fetch('http://localhost:3000/venda')
        .then(response => response.json())
        .then(data => {
            vendaList.innerHTML = ''
            data.forEach(venda => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${venda.id} - Nome: ${venda.data} - ID de Medicamento: ${venda.id_medicamento} - ID de Cliente: ${venda.id_cliente}`

                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Excluir'
                deleteButton.addEventListener('click', () => deleteVenda(venda.id))
                li.appendChild(deleteButton)

                const atualizarButton = document.createElement('button')
                atualizarButton.textContent = 'Atualizar'
                atualizarButton.addEventListener('click', () => atualizarVenda(sale.id))
                li.appendChild(updateButton)

                saleList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

// submit (GET)
vendaForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id = parseInt(document.getElementById('id').value)
    const data = document.getElementById('data').value
    const id_medicamento = parseInt(document.getElementById('id_medicamento').value)
    const id_cliente = parseInt(document.getElementById('id_cliente').value)

    fetch('http://localhost:3000/venda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, data: data, id_medicamento: id_medicamento, id_cliente: id_cliente }),
    })
        .then(response => response.json())
        .then(() => {
            listVenda()
            vendaForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

function deleteSale(id) {
    fetch(`http://localhost:3000/venda/${id}`, {
        method: 'DELETE'
    })
        .then(() => listVenda())
        .catch(error => console.error('Erro', error))
}

function updateVenda(id) {

    const data = document.getElementById('data').value
    const id_medicamento = parseInt(document.getElementById('id_medicamento').value)
    const id_cliente = parseInt(document.getElementById('id_cliente').value)

    if (data.trim() === '' && id_medicamento === null && id_cliente === null) {
        alert("Digite em um(ou mais) campos para prosseguir com a alteração")
    } else {
        fetch(`http://localhost:3000/venda/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data, id_medicamento: id_medicamento, id_cliente: id_cliente }),
        })
            .then(response => response.json())
            .then(() => {
                listVenda()
                vendaForm.reset()
            })
            .catch(error => console.error('Erro:', error))
    }
}

listVenda()
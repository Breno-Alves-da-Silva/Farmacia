const medicamentoForm = document.getElementById('medicamento-form')
const medicamentoList = document.getElementById('medicamento-list')

function listMedicamentos() {
    fetch('http://localhost:3000/Medicamento')
        .then(response => response.json())
        .then(data => {
            medicamentoList.innerHTML = ''
            data.forEach(medicamento => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${medicamento.id} - Nome: ${medicamento.nome} - Fabricante: ${medicamento.fabricante} - Preço: ${medicamento.preco} - Quantidade: ${medicamento.quantidade}`

                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Excluir'
                deleteButton.addEventListener('click', () => deleteMedicamento(medicamento.id))
                li.appendChild(deleteButton)

                const atualizarButton = document.createElement('button')
                atualizarButton.textContent = 'Atualizar'
                atualizarButton.addEventListener('click', () => atualizarMedicamento(medicamento.id))
                li.appendChild(atualizarButton)

                medicamentoList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

// submit (GET)
medicamentoForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id = parseInt(document.getElementById('id').value)
    const nome = document.getElementById('nome').value
    const fabricante = document.getElementById('fabricante').value
    const preco = parseInt(document.getElementById('preco').value)
    const quantidade = parseInt(document.getElementById('quantidade').value)

    fetch('http://localhost:3000/Medicamento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nome: nome, fabricante: fabricante, preco: preco, quantidade: quantidade }),
    })
        .then(response => response.json())
        .then(() => {
            listMedicamentos()
            medicamentoForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

function deleteMedicamento(id) {
    fetch(`http://localhost:3000/medicamentos/${id}`, {
        method: 'DELETE'
    })
        .then(() => listMedicamentos())
        .catch(error => console.error('Erro', error))
}

function updateMedicamento(id) {

    const nome = document.getElementById('nome').value
    const fabricante = document.getElementById('fabricante').value
    const preco = parseInt(document.getElementById('preco').value)
    const quantidade = parseInt(document.getElementById('quantidade').value)

    if (nome.trim() === '' && fabricante.trim() === '' && preco == null && quantidade == null) {
        alert("Digite em um(ou mais) campos para prosseguir com a alteração")
    } else {
        fetch(`http://localhost:3000/medicamentos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, fabricante: fabricante, preco: preco, quantidade: quantidade }),
        })
            .then(response => response.json())
            .then(() => {
                listMedicamentos()
                medicamentoForm.reset()
            })
            .catch(error => console.error('Erro:', error))
    }
}

listMedicamentos()
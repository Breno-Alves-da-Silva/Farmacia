// fornecedor banco de dados
const fornecedorForm = document.getElementById('fornecedor-form')
const fornecedorList = document.getElementById('fornecedor-list')

function listFornecedor() {
    fetch('http://localhost:3000/fornecedor')
        .then(response => response.json())
        .then(data => {
            fornecedorList.innerHTML = ''
            data.forEach(fornecedor => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${fornecedor.id} - Nome: ${fornecedor.nome} - Endereço: ${fornecedor.endereco} - Telefone: ${fornecedor.telefone}`

                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Excluir'
                deleteButton.addEventListener('click', () => deleteFornecedor(fornecedor.id))
                li.appendChild(deleteButton)

                const atualizarButton = document.createElement('button')
                atualizarButton.textContent = 'Atualizar'
                atualizarButton.addEventListener('click', () => updateFornecedor(fornecedor.id))
                li.appendChild(atualizarButton)

                fornecedorList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

// submit (GET)
fornecedorForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id = parseInt(document.getElementById('id').value)
    const nome = document.getElementById('nome').value
    const endereco = document.getElementById('endereco').value
    const telefone = document.getElementById('telefone').value

    fetch('http://localhost:3000/fornecedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nome: nome, endereco: endereco, telefone: telefone }),
    })
        .then(response => response.json())
        .then(() => {
            listFornecedors()
            fornecedorForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

function deleteFornecedor(id) {
    fetch(`http://localhost:3000/fornecedor/${id}`, {
        method: 'DELETE'
    })
        .then(() => listFornecedors())
        .catch(error => console.error('Erro', error))
}

function updateFornecedor(id) {

    const nome = document.getElementById('nome').value
    const endereco = document.getElementById('endereco').value
    const telefone = document.getElementById('telefone').value

    if (nome.trim() === '' && endereco.trim() === '' && telefone.trim() === '') {
        alert("Digite em um(ou mais) campos para prosseguir com a alteração")
    } else {
        fetch(`http://localhost:3000/fornecedor/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, endereco: endereco, telefone: telefone }),
        })
            .then(response => response.json())
            .then(() => {
                listFornecedors()
                fornecedorForm.reset()
            })
            .catch(error => console.error('Erro:', error))
    }
}

listFornecedor()
const clienteForm = document.getElementById('cliente-form')
const clienteList = document.getElementById('cliente-list')

function listClientes() {
    fetch('http://localhost:3000/Cliente')
        .then(response => response.json())
        .then(data => {
            clienteList.innerHTML = ''
            data.forEach(cliente => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${cliente.id} - Nome: ${cliente.nome} - Endereço: ${cliente.endereco} - Email: ${cliente.email} - Telefone: ${cliente.telefone}`

                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Excluir'
                deleteButton.addEventListener('click', () => deleteCliente(cliente.id))
                li.appendChild(deleteButton)

                const atualizarButton = document.createElement('button')
                atualizarButton.textContent = 'Atualizar'
                atualizarButton.addEventListener('click', () => updateCliente(cliente.id))
                li.appendChild(atualizarButton)

                clienteList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

// submit (GET)
clienteForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    const id = parseInt(document.getElementById('id').value)
    const nome = document.getElementById('nome').value
    const endereco = document.getElementById('endereco').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value

    fetch('http://localhost:3000/Cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nome: nome, endereco: endereco, email: email, telefone: telefone }),
    })
        .then(response => response.json())
        .then(() => {
            listClientes()
            clienteForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

function deleteCliente(id) {
    fetch(`http://localhost:3000/cliente/${id}`, {
        method: 'DELETE'
    })
        .then(() => listClientes())
        .catch(error => console.error('Erro', error))
}

function updateCliente(id) {

    const nome = document.getElementById('nome').value
    const endereco = document.getElementById('endereco').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value

    if (nome.trim() === '' && endereco.trim() === '' && email.trim() === '' && telefone.trim() === '') {
        alert("Digite em um(ou mais) campos para prosseguir com a alteração")
    } else {
        fetch(`http://localhost:3000/Cliente/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, endereco: endereco, email: email, telefone: telefone }),
        })
            .then(response => response.json())
            .then(() => {
                listClientes()
                clienteForm.reset()
            })
            .catch(error => console.error('Erro:', error))
    }
}

listClientes()
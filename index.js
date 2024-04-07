let participantes = [
  {
    nome: "Rodrigo Almeida",
    email: "rodrigo.almd01@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 1, 01, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@example.com",
    dataInscricao: new Date(2024, 0, 15, 10, 30),
    dataCheckIn: null
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas.oliveira@example.com",
    dataInscricao: new Date(2024, 1, 10, 14, 50),
    dataCheckIn: new Date(2024, 2, 28, 18, 10)
  },
  {
    nome: "Juliana Santos",
    email: "juliana.santos@example.com",
    dataInscricao: new Date(2024, 1, 28, 11, 15),
    dataCheckIn: new Date(2024, 2, 15, 17, 30)
  },
  {
    nome: "Fernando Costa",
    email: "fernando.costa@example.com",
    dataInscricao: new Date(2024, 0, 05, 16, 40),
    dataCheckIn: null
  },
  {
    nome: "Mariana Lima",
    email: "mariana.lima@example.com",
    dataInscricao: new Date(2024, 1, 20, 08, 20),
    dataCheckIn: new Date(2024, 2, 18, 14, 15)
  },
  {
    nome: "Pedro Carvalho",
    email: "pedro.carvalho@example.com",
    dataInscricao: new Date(2024, 0, 30, 21, 00),
    dataCheckIn: new Date(2024, 2, 23, 11, 40)
  },
  {
    nome: "Sandra Pereira",
    email: "sandra.pereira@example.com",
    dataInscricao: new Date(2024, 0, 10, 12, 45),
    dataCheckIn: new Date(2024, 2, 27, 09, 55)
  },
  {
    nome: "Gustavo Sousa",
    email: "gustavo.sousa@example.com",
    dataInscricao: new Date(2024, 1, 05, 18, 30),
    dataCheckIn: new Date(2024, 2, 08, 13, 20)
  }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
      dataCheckIn = `
      <button
      data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
    }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes){
    output = output + criarNovoParticipante(participante) 
  }
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante =  {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get ('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}
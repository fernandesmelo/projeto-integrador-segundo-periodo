const professionals = [
    { foto: "../arquivos/imagens/cabeleleira.jpeg", nome: "Maria Silva", especialidade: "Cabeleireira", horario: "08:00 - 18:00", folga: "Segunda-feira" },
    { foto: "../arquivos/imagens/esteticista.jpeg", nome: "Lucas Ribeiro", especialidade: "Esteticista", horario: "08:00 - 18:00", folga: "Terça-feira" },
    { foto: "../arquivos/imagens/manicure-pedicure.jpeg", nome: "Maria Clara", especialidade: "Manicure e Pedicure", horario: "08:00 - 18:00", folga: "Quarta-feira" },
    { foto: "../arquivos/imagens/depiladora.jpeg", nome: "Júlia Novais", especialidade: "Depiladora", horario: "08:00 - 18:00", folga: "Segunda-feira" },
];

function exibirProfissionais() {
    const tabela = document.getElementById('professionalsTable');
    professionals.forEach(prof => {
        const row = `<tr>
                        <td><img src="${prof.foto}" alt="${prof.nome}"></td>
                        <td>${prof.nome}</td>
                        <td>${prof.especialidade}</td>
                        <td>${prof.horario}</td>
                        <td>${prof.folga}</td>
                    </tr>`;
        tabela.innerHTML += row;
    });
}

exibirProfissionais();
const API = "http://localhost:3001";


async function carregarAgendamentos() {

    const resposta = await fetch(`${API}/agendamentos`);
    const agendamentos = await resposta.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    agendamentos.forEach(a => {
        lista.innerHTML += `
            <div class="agendamento">
                <strong>${a.pet}</strong> (tutor: ${a.tutor}) — ${a.servico}
                <br><small>${new Date(a.data_hora).toLocaleString("pt-BR")}</small>
            </div>
        `;
    });
}


async function salvarAgendamento() {

    const pet = document.getElementById("pet").value;
    const tutor = document.getElementById("tutor").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;

    if (pet === "" || tutor === "") {
        return;
    }

    await fetch(`${API}/agendamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pet, tutor, servico, data_hora: data })
    });

    document.getElementById("pet").value = "";
    document.getElementById("tutor").value = "";
    document.getElementById("servico").value = "";
    document.getElementById("data").value = "";

    carregarAgendamentos();
}


carregarAgendamentos();

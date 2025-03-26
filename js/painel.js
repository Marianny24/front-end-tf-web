const passeiosContainer = document.getElementById("passeios-container");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const passeioForm = document.getElementById("passeioForm");
const modalTitle = document.getElementById("modalTitle");
const addPasseioBtn = document.getElementById("addPasseioBtn");

let passeios = []; // Lista de passeios
let editIndex = null; // Índice do passeio em edição

// Exibe os passeios na tela
function renderPasseios() {
    passeiosContainer.innerHTML = "";
    passeios.forEach((passeio, index) => {
        const card = document.createElement("div");
        card.className = "viagem";
        card.innerHTML = `
            <h2>${passeio.titulo}</h2>
            <img src="${passeio.imagem}" alt="${passeio.titulo}" class="pacote-img">
            <p>${passeio.descricao}</p>
            <a href="${passeio.link}" class="btn" target="_blank">Saiba Mais</a>
            <button onclick="editPasseio(${index})">Editar</button>
            <button onclick="deletePasseio(${index})" style="background-color: red;">Remover</button>
        `;
        passeiosContainer.appendChild(card);
    });
}

// Adiciona ou edita um passeio
passeioForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const imagem = document.getElementById("imagem").value;
    const link = document.getElementById("link").value;

    if (editIndex !== null) {
        passeios[editIndex] = { titulo, descricao, imagem, link };
        editIndex = null;
    } else {
        passeios.push({ titulo, descricao, imagem, link });
    }

    passeioForm.reset();
    modal.style.display = "none";
    renderPasseios();
});

// Abre o modal para adicionar um novo passeio
addPasseioBtn.addEventListener("click", () => {
    modalTitle.textContent = "Adicionar Passeio";
    passeioForm.reset();
    modal.style.display = "flex";
});

// Fecha o modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Edita um passeio
function editPasseio(index) {
    modalTitle.textContent = "Editar Passeio";
    const passeio = passeios[index];
    document.getElementById("titulo").value = passeio.titulo;
    document.getElementById("descricao").value = passeio.descricao;
    document.getElementById("imagem").value = passeio.imagem;
    document.getElementById("link").value = passeio.link;
    editIndex = index;
    modal.style.display = "flex";
}

// Remove um passeio
function deletePasseio(index) {
    passeios.splice(index, 1);
    renderPasseios();
}

// Renderiza os passeios ao carregar a página
renderPasseios();
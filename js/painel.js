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
        card.className = "passeio-card";
        card.innerHTML = `
            <h3>${passeio.titulo}</h3>
            <p>${passeio.descricao}</p>
            <video class="pacote-video" controls>
                <source src="${passeio.video}" type="video/mp4">
                Seu navegador não suporta o elemento de vídeo.
            </video>
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
    const video = document.getElementById("video").value;

    if (editIndex !== null) {
        passeios[editIndex] = { titulo, descricao, video };
        editIndex = null;
    } else {
        passeios.push({ titulo, descricao, video });
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
    document.getElementById("video").value = passeio.video;
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
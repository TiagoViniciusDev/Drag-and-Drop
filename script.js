// Seleciona todos os elementos com a classe '.kanban-card' e adiciona eventos a cada um deles
document.querySelectorAll(".kanban-card").forEach((card) => {
  // Evento disparado quando começa a arrastar um card
  card.addEventListener("dragstart", (e) => {
    // Adiciona a classe 'dragging' ao card que está sendo arrastado
    e.currentTarget.classList.add("dragging");
  });

  // Evento disparado quando termina de arrastar o card
  card.addEventListener("dragend", (e) => {
    // Remove a classe 'dragging' quando o card é solto
    e.currentTarget.classList.remove("dragging");
  });
});

// Seleciona todos os elementos com a classe '.kanban-cards' (as colunas) e adiciona eventos a cada um deles
document.querySelectorAll(".kanban-column").forEach((column) => {
  const columnCards = column.querySelector(".kanban-cards");

  // Evento disparado quando um card arrastado passa sobre uma coluna (drag over)
  columnCards.addEventListener("dragover", (e) => {
    // Previne o comportamento padrão para permitir o "drop" (soltar) do card
    e.preventDefault();
    // Adiciona a classe 'cards-hover' para mostrar que a coluna pode receber o card
    columnCards.classList.add("cards-hover");
  });

  // Evento disparado quando o card sai da área da coluna (quando o card é arrastado para fora)
  columnCards.addEventListener("dragleave", (e) => {
    // Remove a classe 'cards-hover' quando o card deixa de estar sobre a coluna
    columnCards.classList.remove("cards-hover");
  });

  // Evento disparado quando o card é solto (drop) dentro da coluna
  columnCards.addEventListener("drop", (e) => {
    // Remove a classe 'cards-hover', já que o card foi solto
    columnCards.classList.remove("cards-hover");

    // Seleciona o card que está sendo arrastado (que tem a classe 'dragging')
    const dragCard = document.querySelector(".kanban-card.dragging");

    // Verifica se o card não está sendo arrastado para a própria coluna
    if (e.currentTarget !== dragCard.parentElement) {
      // Move o card arrastado para a coluna onde foi solto
      columnCards.appendChild(dragCard);
    }
  });
});

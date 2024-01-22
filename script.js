const columns = document.querySelectorAll(".column"); //Pega todas as colunas

document.addEventListener("dragstart", (e) => { //Evendo que adiciona a classe "dragstart" ao arrastar elemetento
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => { //Evento que remove a classe "dragstart" ao soltar elemetento
  e.target.classList.remove("dragging");
});

columns.forEach((item) => { //Percorrendo as colunas
  item.addEventListener("dragover", (e) => { //O evento "dragover" permite que você solte o elemento aqui //O evento foi adicionado a todas as colunas pelo forEach
    const dragging = document.querySelector(".dragging"); //Pega o item que está sendo arrastado
    const applyAfter = getNewPosition(item, e.clientY); //Chama função //Passa a coluna como parametro e a posição no eixo Y da coluna

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging); //Se a posição Y do item arrastado for maior que o item estatico ele será posto em baixo/depois
    } else {
      item.prepend(dragging); //Se não ele será posto em cima/antes
    }
  });
});

function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)"); //Pegando todos os itens que não estão sendo arrastados
  let result;

  for (let refer_card of cards) { //Loop executado em todos os itens que não estão sendo arrastados
    const box = refer_card.getBoundingClientRect(); //O método "getBoundingClientRect" retorna a posição do elemento na tela (X e Y) bem como suas dimensões (Width e Height)
    const boxCenterY = box.y + box.height / 2; //Pega a posição do item no eixo Y e soma com metade da sua altura obtendo assim o centro no eixo Y

    if (posY >= boxCenterY) result = refer_card; //Se a posição no eixo Y do item arrastado for maior ou igual ao centro de algum elemento não arrastado os dados desse elemento serão retornados
  }

  return result;
}
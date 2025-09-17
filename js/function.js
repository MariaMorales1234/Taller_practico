let chore = JSON.parse(localStorage.getItem('chore')) || [];

function aggTarea() {
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value.trim();

  if (!date || !description) {
    alert("Hay campos vacíos, por favor complete");
    return;
  }

  chore.push({ date, description, complete: false });
  saveChore();
  showChore();

  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
}

function saveChore() {
  localStorage.setItem("chore", JSON.stringify(chore));
}

function showChore() {
  const list = document.getElementById("choreList");
  if (!list) return;
  list.innerHTML = "";

  const searchEl = document.getElementById("search");
  const filter = searchEl ? searchEl.value.toLowerCase() : "";

  chore.sort((a, b) => new Date(a.date) - new Date(b.date));

  let complete = 0;
  let pending = 0;

  chore.forEach((item, i) => {
    if (!item.description.toLowerCase().includes(filter)) return;

    const li = document.createElement("li");
    li.className = item.complete ? "completada" : "";

    const span = document.createElement("span");
    span.textContent = `${item.date} - ${item.description}`;

    const actions = document.createElement("div");
    actions.className = "acciones";

    const btnComplete = document.createElement("button");
    btnComplete.type = "button";
    btnComplete.textContent = "✅";
    btnComplete.addEventListener("click", () => completechore(i));

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.textContent = "🗑️";
    btnDelete.addEventListener("click", () => deletechore(i));

    actions.appendChild(btnComplete);
    actions.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(actions);

    list.appendChild(li);

    item.complete ? complete++ : pending++;
  });

  const contadorEl = document.getElementById("contador"); 
  if (contadorEl) {
    contadorEl.innerText = `Pendientes: ${pending} | Completadas: ${complete}`;
  }
}

function deletechore(i) {
  chore.splice(i, 1);
  saveChore();
  showChore();
}

function completechore(i) {
  if (!chore[i]) return;
  chore[i].complete = !chore[i].complete;
  saveChore();
  showChore();
}

const searchInput = document.getElementById("search");
if (searchInput) searchInput.addEventListener("input", showChore);

showChore();
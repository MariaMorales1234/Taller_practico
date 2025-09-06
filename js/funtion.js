let chore = JSON.parse(localStorage.getItem('chore')) || [];
function aggtarea() {
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value.trim();

    if (!date || !description) return alert("Hay campos vacios, por favor complete");

    chore.push({ date, description, complete: false });
    saveChore();
    showChore();
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
}

function saveChore() {
    localStorage.setItem("chore", JSON.stringify);
}

function showChore() {
    const list = document.getElementById("choreList");
    list.innerHTML = "";
    const filter = document.getElementById("search").value.toLowerCase();

    chore.sort((a, b) => new Date(a.date) - new Date(b.date));
    let complete = 0;
    let pending = 0;

    chore.forEach((chore, i) => {
        if (!chore.description.toLowerCase().includes(filter))
            return;


        const li = document.createElement("li");
        li.className = chore.complete ? "completada" : "";


        const span = document.createElement("span");
        span.textContent = `${chore.date}-${chore.description}`;

        const actions = document.createElement("div");
        actions.className = "Accciones";

        const btnComplete = document.createElement("button");
        btnComplete.textContent = "✅";
        btnComplete.onclick = () => completechore(i);

        const btndelete = document.createElement("button");
        btndelete.textContent = "🗑️";
        btndelete.onclick = () => deletechore(i);

        actions.appendChild(btnComplete);
        actions.appendChild(btndelete);

        li.appendChild(span);
        li.appendChild(actions);

        list.appendChild(li);

        chore.complete ? complete++ : pending++;
    });
    document.getElementById("Contador").innerText = `Pendientes:${pending} | Completadas: ${complete}`;
}

function deletechore(i) {
    chore.splice(i, 1);
    saveChore();
    showChore();
}

function completechore(i) {
    chore[i].complete = !chore[i].complete;
    saveChore();
    showChore();
}

showChore();

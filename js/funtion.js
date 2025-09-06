let chore =JSON.parse(localStorage.getItem('chore')) || [];
function aggtarea (){
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value.trim();

    if(!date || !description) return alert ("Hay campos vacios, por favor complete");

    chore.push({date,description,complete:false});
    saveChore();
    showChore();
    document.getElementById("date").value="";
    document.getElementById("description").value="";
}

function saveChore(){
    localStorage.setItem("chore",JSON.stringify);
}
const routinesList= document.querySelector("ul#routines-list")
const 

function renderRoutine(routine){
    const li= document.createElement("li")

    li.textContent= routine.name
    li.dataset.id= routine.id

    routinesList.append(li)
}

function renderRoutines(routines){
    routines.forEach (function(routine){
        renderRoutine(routine)
    })
}

fetch('http://localhost:3000/routines')
.then(response => response.json())
.then(routine => renderRoutines(routine))


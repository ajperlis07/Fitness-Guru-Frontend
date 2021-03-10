const routinesList= document.querySelector("ol#routines-list")
const routineItem = document.querySelector('li[data-id]')
 

function renderRoutine(routine){
    const li = document.createElement("li")

    li.textContent = routine.name
    li.dataset.id = routine.id

    routinesList.append(li)
}

function renderRoutines(routines){
    routines.forEach (function(routine){
        renderRoutine(routine)
    })
}

routinesList.addEventListener('click', event => {
    if (event.target.tagName === 'LI')
    fetch (`http://localhost:3000/routines/${event.target.dataset.id}`)
        .then(res => res.json())
        .then(exercise => {
            const exerciseImage = document.querySelector('img')
            const exerciseTitle = document.querySelector('h1.title')
            const workoutNotes = document.querySelector('p.notes')

            exerciseImage.src = exercise.image 
            exerciseImage.alt = exercise.title
            exerciseTitle.textContent = exercise.exercises.title
            workoutNotes.textContent = exercise.exercises.workouts.notes
        }) 
    })

fetch('http://localhost:3000/routines')
.then(response => response.json())
.then(routine => renderRoutines(routine))


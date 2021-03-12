const routinesList = document.querySelector("ol#routines-list")
const routineItem = document.querySelector('em.routine-item')
const section = document.querySelector("section")
const newRoutine= document.querySelector("form#new-routine-form")
const routineDropdown = document.querySelector('form#new-routine-form')
const routineButton = document.querySelector('button#r-dropdown')
const workoutForm = document.querySelector('form#workout-form')
const deleteButton= document.querySelector("button#delete-button")


function renderRoutine(routine) {
    const li = document.createElement("li")

    li.textContent = routine.name
    li.dataset.id = routine.id

    routinesList.append(li)
}

function renderRoutines(routines) {
    routines.forEach(function (routine) {
        renderRoutine(routine)
    })
}

routinesList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        fetch(`http://localhost:3000/routines/${event.target.dataset.id}`)
            .then(res => res.json())
            .then(routineObj => {
                section.innerHTML = ""
                routineObj.exercises.forEach(exercise => {
                    exercise.workouts.forEach(workout =>{
                        if(workout.routine_id=== routineObj.id){
                            const div = document.createElement("div")
                
                    div.dataset.id = workout.id

                    div.classList.add("exercise-card")

                    div.innerHTML = `
                    <h1 class="title">${exercise.title}</h1>
            <img src="${exercise.image}" alt="${exercise.title}">
            <button class="delete-button"> Delete workout</button>
          `
             const ptag = document.createElement("p")
            ptag.classList.add("notes")

            ptag.textContent = `Notes: ${workout.notes}`
      
            div.append(ptag)
      
            section.append(div)            
        }
                    
                        return 
                    })

                    
                })
            
                })
            }

        })


fetch('http://localhost:3000/routines')
    .then(response => response.json())
    .then(routine => renderRoutines(routine))

newRoutine.addEventListener("submit", event => {
    event.preventDefault()
    const name= event.target[0].value

    fetch('http://localhost:3000/routines', {
        method: "POST",
        headers:
        {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
            body: JSON.stringify({name})
        })
        .then(response => response.json())
        .then(routine => renderRoutine(routine))
        newRoutine.reset()
})


function makeRoutineDropdown() {
    const select = document.getElementById('routine-select');
    fetch('http://localhost:3000/routines')
    .then(res => res.json())
    .then(routineObject => {
        routineObject.forEach(function (routine){
            const option = document.createElement('option');
            option.value = routine.id
            option.id = routine.id 
            option.textContent = routine.name
            select.append(option)

        })
    })
}

function makeExerciseDropdown() {
    const select = document.getElementById('exercise-select');
    fetch('http://localhost:3000/exercises')
    .then(res => res.json())
    .then(exerciseObject => {
        exerciseObject.forEach(function (exercise){
            const option = document.createElement('option');
            option.value = exercise.id
            option.id = exercise.id 
            option.textContent = exercise.title
            select.append(option)

        })
    })
}

workoutForm.addEventListener('submit', event => {
    event.preventDefault()
    const routines = event.target[0].value
    const exercises = event.target[1].value
    const newNotes = event.target[2].value

    
    fetch('http://localhost:3000/workouts', {
        method: "POST",
        headers:
        {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
            body: JSON.stringify({routine_id: routines, exercise_id: exercises, notes: newNotes})
    })
        .then(res => res.json())
        .then(newWorkout => console.log(newWorkout))
        workoutForm.reset()
})


document.addEventListener('click', event => {
    if (event.target.className === 'delete-button') {
        const cardDiv = event.target.closest("div.exercise-card")
        const id= cardDiv.dataset.id
        cardDiv.remove()
        fetch(`http://localhost:3000/workouts/${id}`, {
            method: 'DELETE'
        })
    }
})

makeRoutineDropdown()
makeExerciseDropdown()








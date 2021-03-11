const routinesList = document.querySelector("ol#routines-list")
const routineItem = document.querySelector('em.routine-item')
const section = document.querySelector("section")
const newRoutine= document.querySelector("form#new-routine-form")
const routineDropdown = document.querySelector('form#new-routine-form')
const routineButton = document.querySelector('button#r-dropdown')
// const deleteRoutine= document.querySelector("button.delete-routine")



function renderRoutine(routine) {
    const li = document.createElement("li")

    li.textContent = routine.name
    li.dataset.id = routine.id

    // li.innerHTML= `
    // <em class="routine-item">  ${routine.name} </em> <button class="delete-routine"> Delete Routine </button>
    // `

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
                routineObj.exercises.forEach(function (exercise) {
                    

                    const div = document.createElement("div")
                    div.dataset.id = exercise.id

                    div.classList.add("exercise-card")

                    div.innerHTML = `
                    <h1 class="title">${exercise.title}</h1>
            <img src="${exercise.image}" alt="${exercise.title}">
          `
                    exercise.workouts.forEach(function (workout) {
                        const ptag = document.createElement("p")
                        ptag.classList.add("notes")

                        ptag.textContent = `Notes: ${workout.notes}`

                        div.append(ptag)
                    })
                    section.append(div)
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
    // select.name = "routine-Id-List" 
    // select.id = "routine-Id-List"
    fetch('http://localhost:3000/routines')
    .then(res => res.json())
    .then(routineObject => {
        routineObject.forEach(function (routine){
            // const div = document.createElement('select');
            // select.name = "routine-Id-List" 
            // select.id = "routine-Id-List"

            const option = document.createElement('option');
            option.value = routine.id
            option.id = routine.id 
            option.textContent = routine.name

            // routineButton.append(select)
            select.append(option)

        })
    })
}

function makeExerciseDropdown() {
    const select = document.getElementById('exercise-select');
    // select.name = "routine-Id-List" 
    // select.id = "routine-Id-List"
    fetch('http://localhost:3000/exercises')
    .then(res => res.json())
    .then(exerciseObject => {
        exerciseObject.forEach(function (exercise){
            // const div = document.createElement('select');
            // select.name = "routine-Id-List" 
            // select.id = "routine-Id-List"

            const option = document.createElement('option');
            option.value = exercise.id
            option.id = exercise.id 
            option.textContent = exercise.title

            // routineButton.append(select)
            select.append(option)

        })
    })
}

makeRoutineDropdown()
makeExerciseDropdown()






// deleteRoutine.addEventListener("click", event => {
//     // const id =event.target.dataset.id
//     const routineEm= event.target.closest("em.routine-item")
//     const id = routineEm.dataset.id

//     routineEm.remove()


//     fetch(`http://localhost:3000/routines/${event.target.dataset.id}`,{
//     method: "DELETE"
// })
// .then(response => response.json())
// .then(routine => renderRoutine(routine))
// })
// renderRoutines()

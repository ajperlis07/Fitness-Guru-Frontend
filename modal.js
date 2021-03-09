const modal = document.querySelector("#modal")
document.querySelector("#bab-routine").addEventListener("click", () => {
  modal.style.display = "block"
})
// Hide the form
modal.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal.style.display = "none"
  }
})

const modal2 = document.querySelector("#modal2")
document.querySelector("#bab-workout").addEventListener("click", () => {
  modal2.style.display = "block"
})
// Hide the form
modal2.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal2.style.display = "none"
  }
})
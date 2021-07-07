const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", () => {
    fetchDogImages()
    fetchBreedNames()
    const dropdown = document.getElementById("breed-dropdown")
    dropdown.addEventListener("change", (e) => filterBreeds(e))
})

// FETCH AND RENDER IMAGES
function fetchDogImages(){
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => renderDogImages(json.message))
}

function renderDogImages(images){
    images.forEach(renderDogImage)
}

function renderDogImage(image){
    // console.log(image)
    const img = document.createElement("img")
    const container = document.querySelector("#dog-image-container")
    img.src = image
    img.alt = "dog"
    container.appendChild(img)
}

//BREED NAME FETCHING AND RENDERING

function fetchBreedNames(filter){
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
        let breedArray = Object.keys(json.message)
        if(filter && filter !== "all"){
            breedArray = breedArray.filter(breed => breed[0] === filter)
        }
        renderBreeds(breedArray)
    })
}

function renderBreeds(breeds){
    const ul = document.querySelector("#dog-breeds")
    ul.textContent = ""
    breeds.forEach(renderBreed)
}

function renderBreed(breed){
    const ul = document.querySelector("#dog-breeds")
    const li = document.createElement("li")
    li.textContent = breed
    ul.appendChild(li)
    li.addEventListener("click", () => {
        if (li.style.color !== "red"){
            li.style.color = "red"
        } else {
            li.style.color = "black"
        }
    })
}

// BREED FILTERING

function filterBreeds(e){
    fetchBreedNames(e.target.value)
}
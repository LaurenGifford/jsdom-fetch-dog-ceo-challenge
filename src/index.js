console.log('%c HI', 'color: firebrick')

// DOM Elements
const dogImgs = document.querySelector('#dog-image-container')
const breedsUl = document.querySelector('ul#dog-breeds')
const dropdown = document.querySelector('#breed-dropdown')
const breedLis = document.getElementsByClassName('dog-breed')

let breedsArr = []

// Event Listeners
window.addEventListener('load', init)

breedsUl.addEventListener('click', function(e) {
    if (e.target.className === "dog-breed") {
        e.target.style.color = 'pink'
    }
})

dropdown.addEventListener('change', function(e){
    if (e.target.value === "a"){
        console.log("A")
        filterContent("a")
        // breedsUl.innerHTML = 
    }
    else if (e.target.value === "b"){
        console.log("B")
        // breedsUl.innerHTML = 
        filterContent("b")
    }
    else if (e.target.value === "c"){
        console.log("C")
        // breedsUl.innerHTML = 
        filterContent("c")
    }
    else if (e.target.value === "d"){
        console.log("D")
        // breedsUl.innerHTML = 
        filterContent("d")
    }
})


// Logic Handlers
function filterContent(letter){
    for (i=0; i < breedLis.length; i++) {
        if (!breedLis[i].textContent.startsWith(letter) && breedLis[i].style.display === ""){
            breedLis[i].style.display = "none"
        }
        else if (breedLis[i].textContent.startsWith(letter) && breedLis[i].style.display === "none"){
            breedLis[i].style.display = ""
        }
    }
}


function init() {
    getDogPics()
    getDogBreeds()
}


function getDogPics(){
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(data => {
        let picArr = data.message
        renderPics(picArr)
    })
}

function renderPics(picArr) {
    picArr.forEach(pic => {
        const picDiv = document.createElement('div')
        picDiv.className = 'dog-img'
        picDiv.innerHTML = `<img src="${pic}" alt="photo of dog"></img>`

        dogImgs.append(picDiv)
    })
}

function getDogBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        let breedsObj = data.message
        breedsArr = Object.entries(breedsObj)
        renderBreeds(breedsArr)
    })
}

function renderBreeds(breeds) {
    breeds.forEach(breed => renderOneBreed(breed))
}

function renderOneBreed(breed) {
    const breedLi = document.createElement('li')
    breedLi.className = "dog-breed"

    if (breed[1].length === 0){
        breedLi.textContent = `${breed[0]}`
    }
    else {
        breedLi.textContent = `${breed[0]}, ${breed[1]}`
    }

    breedsUl.append(breedLi)
}


// function filterContent(letter) {
//     const filteredBreeds = breedsArr.filter(breed => breed[0][0] === letter)
//     renderBreeds(filteredBreeds)
// }

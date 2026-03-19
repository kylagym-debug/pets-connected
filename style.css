// HIDE PAGES & FORMS
function hideAllPages() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("adoption-page").style.display = "none";
    document.getElementById("lost-page").style.display = "none";
}

function hideAllForms() {
    document.getElementById("animal-form").style.display = "none";
    document.getElementById("owner-form").style.display = "none";
    document.getElementById("missing-form").style.display = "none";
    document.getElementById("found-form").style.display = "none";
}

// NAVIGATION
function showMain(page) {
    hideAllPages();
    if(page === "adoption") document.getElementById("adoption-page").style.display = "flex";
    else document.getElementById("lost-page").style.display = "flex";
}

function goHome() {
    hideAllPages();
    hideAllForms();
    document.getElementById("home-page").style.display = "flex";
}

function showAdoption(type) {
    hideAllForms();
    document.getElementById(type === "animal" ? "animal-form" : "owner-form").style.display = "block";
}

function showLost(type) {
    hideAllForms();
    document.getElementById(type === "missing" ? "missing-form" : "found-form").style.display = "block";
}

// DATA
let missingDogs = [];
let foundDogs = [];
let adoptionAnimals = [];
let adoptionOwners = [];

// HELPERS
function readImage(fileInput) {
    return new Promise((resolve) => {
        if(fileInput.files && fileInput.files[0]){
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.readAsDataURL(fileInput.files[0]);
        } else resolve(""); // no image
    });
}

// SUBMIT FORMS
async function submitMissingDogProfile(e){
    e.preventDefault();
    const dog = {
        name: document.getElementById("missing-dog-name").value,
        color: document.getElementById("missing-dog-color").value,
        size: document.getElementById("missing-dog-size").value,
        breed: document.getElementById("missing-dog-breed").value,
        standout: document.getElementById("missing-dog-standout").value,
        picture: await readImage(document.getElementById("missing-dog-picture"))
    };
    missingDogs.push(dog);
    e.target.reset();
    alert("Missing dog added!");
}

async function submitFoundDogProfile(e){
    e.preventDefault();
    const dog = {
        name: document.getElementById("found-dog-name").value,
        color: document.getElementById("found-dog-color").value,
        size: document.getElementById("found-dog-size").value,
        breed: document.getElementById("found-dog-breed").value,
        standout: document.getElementById("found-dog-standout").value,
        picture: await readImage(document.getElementById("found-dog-picture"))
    };
    foundDogs.push(dog);
    e.target.reset();
    alert("Found dog added!");
}

// MATCHING
function matchDogProfiles(){
    const container = document.getElementById("lost-results");
    container.innerHTML = "";
    foundDogs.forEach(found => {
        missingDogs.forEach(missing => {
            // simple match: same color
            if(found.color === missing.color){
                const card = document.createElement("div");
                card.classList.add("match-card");
                card.innerHTML = `
                    <img src="${found.picture || missing.picture || ''}" alt="${found.name || missing.name}">
                    <h3>${missing.name} 🐾 ${found.name}</h3>
                    <p>Breed: ${missing.breed || found.breed || 'N/A'}</p>
                    <p>Size: ${missing.size || found.size || 'N/A'}</p>
                    <p>Color: ${missing.color}</p>
                    <p>Features: ${missing.standout || found.standout || 'N/A'}</p>
                `;
                container.appendChild(card);
            }
        });
    });
}

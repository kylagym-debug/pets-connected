let adoptionAnimalProfiles = [];
let ownerProfiles = [];

let missingDogProfiles = [];
let foundDogProfiles = [];

/* ---------------- NAVIGATION ---------------- */

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

function showMain(page) {
    hideAllPages();

    if (page === "adoption") {
        document.getElementById("adoption-page").style.display = "flex";
    } else {
        document.getElementById("lost-page").style.display = "flex";
    }
}

function goHome() {
    hideAllPages();
    hideAllForms();
    document.getElementById("home-page").style.display = "flex";
}

function showAdoption(type) {
    hideAllForms();

    if (type === "animal") {
        document.getElementById("animal-form").style.display = "block";
    } else {
        document.getElementById("owner-form").style.display = "block";
    }
}

function showLost(type) {
    hideAllForms();

    if (type === "missing") {
        document.getElementById("missing-form").style.display = "block";
    } else {
        document.getElementById("found-form").style.display = "block";
    }
}

/* ---------------- IMAGE HELPER ---------------- */

function getImageURL(file) {
    if (!file) return "https://via.placeholder.com/300x200?text=No+Image";
    return URL.createObjectURL(file);
}

/* ---------------- ADOPTION ---------------- */

function submitAdoptionAnimalProfile(event) {
    event.preventDefault();

    const name = document.getElementById("animal-name").value;
    const type = document.getElementById("animal-type").value;

    const characteristics = Array.from(
        document.querySelectorAll('#animal-characteristics input:checked')
    ).map(cb => cb.value);

    adoptionAnimalProfiles.push({ name, type, characteristics });

    alert("Animal added!");
    event.target.reset();
}

function submitOwnerProfile(event) {
    event.preventDefault();

    const name = document.getElementById("owner-name").value;

    const dreamCharacteristics = Array.from(
        document.querySelectorAll('#dream-characteristics input:checked')
    ).map(cb => cb.value);

    ownerProfiles.push({ name, dreamCharacteristics });

    alert("Owner added!");
    event.target.reset();
}

function matchProfiles() {
    const results = document.getElementById("adoption-results");
    results.innerHTML = "";

    ownerProfiles.forEach(owner => {
        adoptionAnimalProfiles.forEach(animal => {

            const matchScore = animal.characteristics.filter(c =>
                owner.dreamCharacteristics.includes(c)
            ).length;

            if (matchScore > 0) {
                const card = document.createElement("div");
                card.classList.add("match-card");

                card.innerHTML = `
                    <img src="https://placedog.net/400/300">
                    <div class="match-card-content">
                        <h3>${animal.name}</h3>
                        <p>${animal.type}</p>
                        <p>⭐ ${matchScore} match</p>
                    </div>
                `;

                results.appendChild(card);
            }
        });
    });
}

/* ---------------- LOST & FOUND ---------------- */

function submitMissingDogProfile(event) {
    event.preventDefault();

    const profile = {
        name: document.getElementById("missing-dog-name").value,
        color: document.getElementById("missing-dog-color").value,
        size: document.getElementById("missing-dog-size").value,
        breed: document.getElementById("missing-dog-breed").value,
        standout: document.getElementById("missing-dog-standout").value,
        image: document.getElementById("missing-dog-picture").files[0]
    };

    missingDogProfiles.push(profile);
    alert("Missing dog added!");
    event.target.reset();
}

function submitFoundDogProfile(event) {
    event.preventDefault();

    const profile = {
        color: document.getElementById("found-dog-color").value,
        size: document.getElementById("found-dog-size").value,
        breed: document.getElementById("found-dog-breed").value,
        standout: document.getElementById("found-dog-standout").value,
        image: document.getElementById("found-dog-picture").files[0]
    };

    foundDogProfiles.push(profile);
    alert("Found dog added!");
    event.target.reset();
}

function matchDogProfiles() {
    const results = document.getElementById("lost-results");
    results.innerHTML = "";

    missingDogProfiles.forEach(missing => {
        foundDogProfiles.forEach(found => {

            let score = 0;
            if (missing.color === found.color) score++;
            if (missing.size === found.size) score++;
            if (missing.breed && found.breed && missing.breed.toLowerCase() === found.breed.toLowerCase()) score++;

            if (score > 0) {
                const card = document.createElement("div");
                card.classList.add("match-card");

                card.innerHTML = `
                    <img src="${getImageURL(found.image)}">
                    <div class="match-card-content">
                        <h3>${missing.name}</h3>
                        <p>${found.color} • ${found.size}</p>
                        <p>⭐ ${score} match</p>
                    </div>
                `;

                results.appendChild(card);
            }
        });
    });
}

/* ---------------- INIT ---------------- */

window.onload = function () {
    goHome();
};

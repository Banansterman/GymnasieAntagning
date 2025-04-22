const buttonContainer = document.createElement("div");
buttonContainer.style.position = "absolute";
buttonContainer.style.left = "220px";
buttonContainer.style.top = "260px";
document.body.appendChild(buttonContainer);


const data = [
    {
        name: "Sigrid Rudebecks Gymnasium",
        program: [
            {
                name: "Naturvetenskap",
                merits: [308, 285, 303, 290.5, 300.5],
                years: [2020, 2021, 2022, 2023, 2024]
            },
            {
                name: "Samhällsvetenskap",
                merits: [288, 253, 255.5, 272.5, 270.5],
                years: [2020, 2021, 2022, 2023, 2024]
            }
        ]
    },
    {
        name: "Hvitfeldtska Gymnasiet",
        program: [
            {
                name: "Naturvetenskap",
                merits: [290.5, 315.5, 307.5, 310.5, 313],
                years: [2020, 2021, 2022, 2023, 2024]
            },
            {
                name: "Naturvetenskap Spetsmatematik",
                merits: [507.5],
                years: [2025]
            },
            {
                name: "Samhällsvetenskap",
                merits: [268, 272.5, 270.5, 270.5, 275.5],
                years: [2020, 2021, 2022, 2023, 2024]
            },
            {
                name: "Ekonomi",
                merits: [275.5, 283, 280.5, 298, 298],
                years: [2020, 2021, 2022, 2023, 2024]
            },
            {
                name: "Estet",
                merits: [417, 435],
                years: [2023, 2024]
            },
            {
                name: "Musik spets",
                merits: [425.5],
                years: [2025]
            },
            {
                name: "Försäljning och service",
                merits: [235.5, 240.5],
                years: [2023, 2024]
            },
            {
                name: "International Baccalaureate",
                merits: [0],
                years: [2025]
            }
        ]
    }
];
// --- RENDER-FUNKTIONER ---
function renderMeritData(selectedProgram) {
    if (!selectedProgram) return;

    // Ta bort tidigare punkter och meritvärden
    document.querySelectorAll(".point, .meritText").forEach(el => el.remove());

    let merits = selectedProgram.merits;
    let years = selectedProgram.years;

    // Merit-rubrik
    document.getElementById("meritHeader").textContent =
        `Lägsta antagning merit (${years[0]}) - (${years[years.length - 1]})`;

    let yearContainer = document.getElementById("yearContainer");
    let meritBox = document.getElementById("meritBox");
    let boxWidth = meritBox.offsetWidth;
    let padding = 20;
    let usableWidth = boxWidth - 2 * padding;
    let shrinkFactor = 0.8;

    let positions;
    if (years.length === 1) {
        positions = [boxWidth / 2]; // Sätt punkten i mitten
}    else {
        positions = years.map((_, index) => {
        let rawPos = padding + (index / (years.length - 1)) * usableWidth;
        let centerPos = boxWidth / 2;
        return centerPos + (rawPos - centerPos) * shrinkFactor;
    });
}

    let maxMerit = Math.max(...merits);
    let minMerit = Math.min(...merits);

    let topOfBox = meritBox.offsetTop;
    let bottomOfBox = topOfBox + meritBox.offsetHeight;

    // Rita årtal
    yearContainer.innerHTML = years
        .map((year, index) =>
            `<span class="year" style="position: absolute; left: ${positions[index]}px;">${year}</span>`
        )
        .join("");

    yearContainer.style.position = "absolute";
    yearContainer.style.left = (meritBox.offsetLeft - 60) + "px";
    yearContainer.style.top = (meritBox.offsetTop + meritBox.offsetHeight - 45) + "px";
    yearContainer.style.width = boxWidth + "px";

    let body = document.body;

    // Rita punkter
    for (let i = 0; i < years.length; i++) {
        let point = document.createElement("div");
        point.classList.add("point");
        let xPos = positions[i] + 540;

        let merit = merits[i];
        let yPos;
        if (maxMerit === minMerit) {
        // Centrera punkten om bara en merit finns
            yPos = (topOfBox + bottomOfBox) / 2;
        } else {
            yPos = ((merit - maxMerit) / (minMerit - maxMerit)) * ((bottomOfBox - 80) - (topOfBox + 80)) + (topOfBox + 80);
        }

        point.style.position = "absolute";
        point.style.left = `${xPos}px`;
        point.style.top = `${yPos}px`;
        body.appendChild(point);

        let meritText = document.createElement("span");
        meritText.classList.add("meritText");
        meritText.textContent = merit;
        meritText.style.position = "absolute";
        meritText.style.left = `${xPos - 5}px`;
        meritText.style.top = `${yPos - 20}px`;
        console.log("Sätter text för merit:", merit);
        body.appendChild(meritText);
    }
}



function loadGymnasium(schoolName) {
    const selectedSchool = data.find(s => s.name.toLowerCase().includes(schoolName.toLowerCase()));
    if (!selectedSchool) return alert("Gymnasium hittades inte!");

    // Rensa gamla knappar
    buttonContainer.innerHTML = "";

    // Uppdatera rubriken
    document.querySelector("h1").textContent = "Meritantagning " + selectedSchool.name;

    // Ladda första programmet
    const firstProgram = selectedSchool.program[0];
    renderMeritData(firstProgram);
    document.getElementById("programSubtitle").textContent = "Linje: " + firstProgram.name;

    // Skapa nya knappar
    selectedSchool.program.forEach((program, index) => {
        let button = document.createElement("button");
        button.textContent = program.name;
        button.style.padding = "15px 20px";
        button.style.display = "block";
        button.style.marginBottom = "10px";
        button.style.position = "absolute";
        button.style.top = (index * 60) + "px";
        button.style.borderRadius = "10px";
        button.style.backgroundColor = "#f0f0f0";
        button.style.color = "black";
        button.style.width = "220px";

        button.addEventListener("click", () => {
            // Återställ stil
            let buttons = buttonContainer.querySelectorAll("button");
            buttons.forEach(btn => {
                btn.style.backgroundColor = "#f0f0f0";
                btn.style.color = "black";
            });

            // Markera vald
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "white";

            // Uppdatera rubrik och graf
            document.getElementById("programSubtitle").textContent = "Linje: " + program.name;
            renderMeritData(program);
        });

        buttonContainer.appendChild(button);
    });

    // Markera första knappen som vald
    let firstButton = buttonContainer.querySelector("button");
    if (firstButton) {
        firstButton.style.backgroundColor = "#4CAF50";
        firstButton.style.color = "white";
    }
}




document.getElementById("searchBox").addEventListener("keydown", e => {
    if (e.key === "Enter") {
        const input = document.getElementById("searchBox").value;
        if (input.trim() !== "") {
            loadGymnasium(input);
        }
    }
});




// --- LADDA FÖRSTA PROGRAMMET ---
loadGymnasium("Sigrid Rudebecks Gymnasium");

// Välj och markera knappen för Naturvetenskap vid start
let initialButton = Array.from(buttonContainer.children).find(btn => btn.textContent === "Naturvetenskap");
if (initialButton) {
    initialButton.style.backgroundColor = "#4CAF50";
    initialButton.style.color = "white";
}

document.getElementById("searchButton").addEventListener("click", () => {
    const input = document.getElementById("searchBox").value;
    if (input.trim() !== "") {
        loadGymnasium(input);
    }
});
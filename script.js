// Team
document.addEventListener("DOMContentLoaded", function () {
    const teamLogo = document.getElementById("teamLogo");
    const teamName = document.getElementById("teamName");
    const coachSection = document.getElementById("section-entrenador");
    const playersSection = document.getElementById("section-jugadors");
    const urlParams = new URLSearchParams(window.location.search);
    const defaultTeam = urlParams.get("team") || "Athletic Club";


    fetch("source/jugadors.json") 
        .then(response => response.json())
        .then(teams => {
            updateTeamInfo(defaultTeam, teams);
        })
        .catch(error => console.error("Fail to load json file:", error));

    function updateTeamInfo(selectedTeamName, teams) {
        const selectedTeam = teams.find(t => t.equip === selectedTeamName);
        if (!selectedTeam) {
            console.error("Team not found:", selectedTeamName);
            return;
        }

        teamName.textContent = selectedTeam.equip;
        teamLogo.src = selectedTeam.escut;

        coachSection.innerHTML = `
            <div class="jugador entrenador">
                <img src="${selectedTeam.entrenador.foto}" alt="Image de ${selectedTeam.entrenador.nomPersona}">
                <p><b>${selectedTeam.entrenador.nomPersona}</b><br>Coach</p>
                </div>
        `;
        

        playersSection.innerHTML = "";
        selectedTeam.jugadors.forEach(jugador => {
            playersSection.innerHTML += `
                <div class="jugador">
                    <img src="${jugador.foto}" alt="Image de ${jugador.nomPersona}">
                    <p><b>${jugador.nomPersona}</b><br>${jugador.posicio}</p>
                </div>
            `;
        });
    }
});

//Scorers

document.addEventListener("DOMContentLoaded", () => {
    fetch("source/golejadores.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
                })
        .then( golejadores => {
            let container = document.getElementById("container-cards");
            container.innerHTML = "";

            for (let i = 0; i < golejadores.length; i++) {
                let card = document.createElement("div");
                card.classList.add("card");

                let cardInner = document.createElement("div");
                cardInner.classList.add("card-inner");
                card.appendChild(cardInner);

                let cardFront = document.createElement("div");
                cardFront.classList.add("card-front");
                cardInner.appendChild(cardFront);

                let foto = document.createElement("img");
                foto.src = golejadores[i].foto;
                foto.classList.add("card-foto");

                let nombre = document.createElement("p");
                nombre.textContent = golejadores[i].nomPersona;
                nombre.classList.add("card-name");

                let p3 = document.createElement("p");
                p3.textContent = `Goals: ${golejadores[i].golsTotals}`;
                
                // Agregar ambos elementos al cardFront
                cardFront.appendChild(foto);
                cardFront.appendChild(nombre);
                cardFront.appendChild(p3);

                                
                let equipo = document.createElement("img");
                equipo.src = golejadores[i].equip;
                equipo.classList.add("card-team");

                let cardBack = document.createElement("div");
                cardBack.classList.add("card-back");

                cardBack.appendChild(equipo);
               

                cardInner.appendChild(cardBack);

                container.appendChild(card);  // Agrega la tarjeta al contenedor
            }
        })
        .catch(error => {
            console.error("Error cargando los datos:", error);
        });
});


// tabla
document.addEventListener("DOMContentLoaded", function () {
    fetch("/source/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then(data => {
            data.sort((a, b) => {
                if (b.puntos !== a.puntos) {
                    return b.puntos - a.puntos; 
                } else {
                    return b.dg - a.dg; 
                }
            });

            data.forEach((equipo, index) => equipo.posicion = index + 1);

            const tabla = document.getElementById("tabla-clasificacion");

            tabla.innerHTML = data.map(equipo => `
                <tr>
                    <td>${equipo.posicion}</td>
                    <td>${equipo.equipo}</td>
                    <td>${equipo.pj}</td>
                    <td>${equipo.ganados}</td>
                    <td>${equipo.empatados}</td>
                    <td>${equipo.perdidos}</td>
                    <td>${equipo.gf}</td>
                    <td>${equipo.gc}</td>
                    <td>${equipo.dg}</td>
                    <td>${equipo.puntos}</td>
                </tr>
            `).join("");
        })
        .catch(error => console.error("Error cargando los datos:", error));
});

// tabla min
document.addEventListener("DOMContentLoaded", function () {
    fetch("/source/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then(data => {

            data.sort((a, b) => {
                if (b.puntos !== a.puntos) {
                    return b.puntos - a.puntos;  
                } else {
                    return b.dg - a.dg; 
                }
            });

            data.forEach((equipo, index) => equipo.posicion = index + 1);

            const tabla = document.getElementById("tabla-clasificacion-min");

            tabla.innerHTML = data.slice(0, 6).map(equipo => `
                <tr>
                    <td>${equipo.posicion}</td>
                    <td>${equipo.equipo}</td>
                    <td>${equipo.puntos}</td>
                </tr>
            `).join("");
        })
        .catch(error => console.error("Error cargando los datos:", error));
});

function cargarTabla() {
    const tabla = document.getElementById("tabla-clasificacion");

    tabla.innerHTML = data.map(equipo => `
        <tr>
            <td>${equipo.posicion}</td>
            <td>${equipo.equipo}</td>
            <td>${equipo.pj}</td>
            <td>${equipo.ganados}</td>
            <td>${equipo.empatados}</td>
            <td>${equipo.perdidos}</td>
            <td>${equipo.gf}</td>
            <td>${equipo.gc}</td>
            <td>${equipo.dg}</td>
            <td>${equipo.puntos}</td>
        </tr>
    `).join("");
}

function cargarTablaMin() {
    const tabla = document.getElementById("tabla-clasificacion-min");

    tabla.innerHTML = data.map(equipo => `
        <tr>
            <td>${equipo.posicion}</td>
            <td>${equipo.equipo}</td>
            <td>${equipo.pj}</td>
            <td>${equipo.ganados}</td>
            <td>${equipo.empatados}</td>
            <td>${equipo.perdidos}</td>
            <td>${equipo.gf}</td>
            <td>${equipo.gc}</td>
            <td>${equipo.dg}</td>
            <td>${equipo.puntos}</td>
        </tr>
    `).join("");
}

document.addEventListener("DOMContentLoaded", function () {
    const equips = ["Barça", "Madrid", "Sevilla", "València", "Atlètic de Madrid"];
    const equipSelect = document.getElementById("equip");
    equips.forEach(equip => {
        const option = document.createElement("option");
        option.value = equip;
        option.textContent = equip;
        equipSelect.appendChild(option);
    });

    const tipusSelect = document.getElementById("tipus");
    const posicionsContainer = document.getElementById("posicions-container");
    
    tipusSelect.addEventListener("change", function () {
        if (this.value === "jugador") {
            posicionsContainer.style.display = "block";
        } else {
            posicionsContainer.style.display = "none";
        }
    });
});
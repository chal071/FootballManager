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

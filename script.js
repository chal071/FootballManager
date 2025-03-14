document.addEventListener("DOMContentLoaded", function () {
    const teamNameElement = document.querySelector('.div-club p');

    if (!teamNameElement) {
        console.error("Can't fint .div-club p element");
        return;
    }

    const teamName = teamNameElement.textContent.trim();

    fetch('/source/jugadors.json')
        .then(response => response.json())
        .then(teams => {
            const team = teams.find(t => t.equip === teamName);
            if (!team) {
                console.error("Can't find team:", teamName);
                return;
            }

            const sectionJugadors = document.querySelector('.section-jugadors');
            const sectionEntrenador = document.querySelector('.section-entrenador');
            sectionJugadors.innerHTML = '';
            sectionEntrenador.innerHTML = '';

            const entrenadorHTML = `
            <div class="jugador entrenador">
                <p><b>${team.entrenador.nomPersona}</b><br>Coach</p>
                <img src="${team.entrenador.foto}" alt="Image de ${team.entrenador.nomPersona}">
            </div>
        `;
            sectionEntrenador.innerHTML += entrenadorHTML;

            team.jugadors.forEach(jugador => {
                const jugadorHTML = `
                    <div class="jugador">
                        <p><b>${jugador.nomPersona}</b><br>${jugador.posicio}</p>
                        <img src="${jugador.foto}" alt="Image de ${jugador.nomPersona}">
                    </div>
                `;
                sectionJugadors.innerHTML += jugadorHTML;
            });
        })
        .catch(error => console.error("Fail to load json file:", error));
});

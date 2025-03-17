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

                let nombre = document.createElement("p");
                nombre.textContent = golejadores[i].nomPersona;
                nombre.classList.add("card-name");
                
                let equipo = document.createElement("p");
                equipo.textContent = golejadores[i].equip;
                equipo.classList.add("card-team");
                
                // Agregar ambos elementos al cardFront
                cardFront.appendChild(nombre);
                cardFront.appendChild(equipo);

                let cardBack = document.createElement("div");
                cardBack.classList.add("card-back");

                let p3 = document.createElement("p");
                p3.textContent = `Goals: ${golejadores[i].golsTotals}`;
                cardBack.appendChild(p3);

                cardInner.appendChild(cardBack);

                container.appendChild(card);  // Agrega la tarjeta al contenedor
            }
        })
        .catch(error => {
            console.error("Error cargando los datos:", error);
        });
});
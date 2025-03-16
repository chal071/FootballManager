document.addEventListener("DOMContentLoaded", function () {
    // Cargar los datos desde el archivo JSON
    fetch("/source/data.json")
        .then(response => {
            // Verifica si la respuesta es válida
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then(data => {
            // Ordenar los equipos por puntos y, en caso de empate, por diferencia de goles
            data.sort((a, b) => {
                if (b.puntos !== a.puntos) {
                    return b.puntos - a.puntos;  // Ordenar primero por puntos
                } else {
                    return b.dg - a.dg;  // Si los puntos son iguales, ordenar por diferencia de goles
                }
            });

            // Asignar posiciones a cada equipo
            data.forEach((equipo, index) => equipo.posicion = index + 1);

            // Obtener la tabla donde se insertarán los datos
            const tabla = document.getElementById("tabla-clasificacion");

            // Crear las filas de la tabla
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

function cargarTabla() {
    // Obtener la tabla donde se insertarán los datos
    const tabla = document.getElementById("tabla-clasificacion");

    // Crear las filas de la tabla
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
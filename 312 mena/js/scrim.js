
document.addEventListener("DOMContentLoaded", function () {
    const galeria = document.getElementById("galeriaImagenes");
    const formulario = document.getElementById("formularioImagen");
    const entradaURL = document.getElementById("imagenURL");
    const entradaPie = document.getElementById("pieFoto");

    // Mostrar las siete imágenes guardadas en recursos.
    for (let i = 1; i <= 7; i++) {
        agregarTarjeta("recursos/img" + i + ".jpg", "Imagen " + i);
    }

    function agregarTarjeta(url, descripcion) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const imagen = document.createElement("img");
        imagen.src = url;
        imagen.alt = descripcion;
        imagen.loading = "lazy";

        imagen.onerror = function () {
            tarjeta.querySelector("p").textContent =
                descripcion + " (no se pudo cargar la imagen)";
            imagen.style.display = "none";
        };

        const pie = document.createElement("p");
        pie.textContent = descripcion || "Sin descripción";

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(pie);
        galeria.appendChild(tarjeta);
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const url = entradaURL.value.trim();
        const descripcion = entradaPie.value.trim();

        if (!url) {
            alert("Escribe la URL de una imagen.");
            return;
        }

        try {
            const direccion = new URL(url);

            if (!["https:", "http:"].includes(direccion.protocol)) {
                alert("La URL debe comenzar con http:// o https://");
                return;
            }
        } catch {
            alert("Escribe una URL válida para la imagen.");
            return;
        }

        agregarTarjeta(url, descripcion || "Nueva imagen");
        entradaURL.value = "";
        entradaPie.value = "";
    });
});

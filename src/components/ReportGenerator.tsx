import React from 'react';

function FileHandler() {
    // Método para añadir un String a un archivo .txt
    const addStringToFile = (content: string) => {
        // Nombre del archivo y ruta
        const fileName = "archivo.txt";

        try {
            // Crear un Blob con el contenido
            const blob = new Blob([content], { type: 'text/plain' });

            // Crear un enlace (link) para descargar el archivo
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;

            // Simular un clic en el enlace para iniciar la descarga del archivo
            link.click();

            console.log("Se añadió el contenido al archivo correctamente.");

        } catch (error) {
            console.error("Error al añadir el contenido al archivo:", error);
        }
    };

    return (
        <div>
            {/* Ejemplo de uso del método addStringToFile */}
            <button onClick={() => addStringToFile("Hola, mundo!")}>
                Descargar Archivo
            </button>
        </div>
    );
}

export default FileHandler;

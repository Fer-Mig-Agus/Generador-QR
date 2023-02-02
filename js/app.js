
const qrInput = document.querySelector('#url-box');
const generateBtn = document.querySelector('#btn-generar');
const qrImg = document.querySelector('#QR-image');
const boxImagenQR = document.querySelector('#img-box-qr');
const descarga = document.querySelector('#btn-Descargar');
const eliminar = document.querySelector('#btn-EliminarQR');
const boxQR = document.querySelector('#qr-generado');
const mensajeBox = document.querySelector('#mensaje-box');
const formulario = document.querySelector('#form');
let preValue;

generateBtn.addEventListener('click', (e) => {   
    e.preventDefault();
    limpiarHTML();
    if (qrInput.value !== "") {
        let qrValue = qrInput.value.trim();
        console.log(qrValue);
        if (!qrValue || preValue === qrValue) return;
        preValue = qrValue;
        generateBtn.disabled = true;
        generateBtn.style.cursor = "not-allowed";
        boxQR.style.display = "block";
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
        qrImg.addEventListener("load", () => {
            generateBtn.innerText = "Codigo QR Generado";
        });

    } else {
        mostrarMensaje('Campo Vacio');
    }

});

qrInput.addEventListener('keyup', () => {
    if (!qrInput.value.trim()) {
        preValue = "";
    }
});

function mostrarMensaje(mensaje) {
    const mensajeError = document.createElement('p');
    const errores = document.querySelectorAll('.parrafo-mensaje');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('parrafo-mensaje', 'failed');
    if (errores.length === 0) {
        mensajeBox.style.display = "block";
        mensajeBox.appendChild(mensajeError);
    }
    setTimeout(() => {
        mensajeBox.style.display = "none";
    }, 3000);
}


function limpiarHTML() {
    while (mensajeBox.firstChild) {
        mensajeBox.removeChild(mensajeBox.firstChild);
    }

}
descarga.addEventListener('click', () => {

    let imgPath = qrImg.getAttribute("src");
    let nombreArchivo = getFileName(imgPath);
    saveAs(imgPath, nombreArchivo);

    //Volver el boton a la normalidad
    setTimeout(()=>{
        resetearGenerador();
    },2000);
    

})

function getFileName(str) {
    return str.substr(str.lastIndexOf('/') + 1)
}

eliminar.addEventListener('click', () => {
    //Volver el boton a la normalidad
    setTimeout(()=>{
        resetearGenerador();
    },2000);
});

function resetearGenerador(){
    generateBtn.disabled = false;
    generateBtn.style.cursor = "pointer";
    boxQR.style.display = "none";
    qrImg.src = "";
    generateBtn.innerText = "Generar QR";
    formulario.reset();
}
// ==UserScript==
// @name        COMPLETO
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Este script obtiene la llave, cantidad de mensajes y mensajes cifrados.
// @author       Tu Nombre
// @match        https://cripto.tiiny.site/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==


(function() {
    'use strict';

    // Función para extraer las mayúsculas de un texto
    function extractUppercase(text) {
        const uppercaseLetters = text.match(/[A-Z]/g);
        if (uppercaseLetters) {
            return uppercaseLetters.join('');
        }
        return '';
    }
        // Función para descifrar un mensaje cifrado
    function decryptMessage(ciphertext, key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const ciphertextBytes = CryptoJS.enc.Base64.parse(ciphertext);
        const decrypted = CryptoJS.TripleDES.decrypt(
            { ciphertext: ciphertextBytes },
            keyHex,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    // Función principal para procesar la página
    function processPage() {
        const pageText = document.body.textContent;
        const uppercaseText = extractUppercase(pageText);
        // Puedes mostrar las mayúsculas en la consola
        console.log('La llave es:', uppercaseText);

        // Contar la cantidad de divs en la página
        const divElements = document.querySelectorAll('div');
        const numDivs = divElements.length;
        console.log('Los mensajes cifrados son:', numDivs);

        if (uppercaseText) {
            // Se imprimen por consola y pagina web mensaje descifrado
            divElements.forEach((div, index) => {
                const ciphertext = div.id;
                const decryptedMessage = decryptMessage(ciphertext, uppercaseText);
                div.textContent = decryptedMessage; // Reemplaza el contenido del div con el mensaje descifrado
                console.log(`${ciphertext} ${decryptedMessage}`);
            });
        }

    }

    // Ejecuta la función principal cuando la página esté completamente cargada
    window.addEventListener('load', processPage);
})();

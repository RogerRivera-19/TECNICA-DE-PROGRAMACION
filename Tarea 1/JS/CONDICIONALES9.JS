function clasificar() {
            const edad = parseInt(document.getElementById('edad').value);
            const resultado = document.getElementById('resultado');
            
            if (!edad || edad < 1) {
                resultado.innerHTML = 'Ingresa una edad válida (mayor a 0)';
                resultado.className = 'resultado error';
                return;
            }
            
            if (edad > 120) {
                resultado.innerHTML = 'Ingresa una edad válida (menor a 120)';
                resultado.className = 'resultado error';
                return;
            }
            
            // Clasificar según la edad
            let clasificacion;
            let clase;
            
            if (edad >= 1 && edad <= 3) {
                clasificacion = 'Infante';
                clase = 'infante';
            } else if (edad >= 4 && edad <= 13) {
                clasificacion = 'Niño';
                clase = 'niño';
            } else if (edad >= 14 && edad <= 17) {
                clasificacion = 'Adolescente';
                clase = 'adolescente';
            } else if (edad >= 18 && edad <= 35) {
                clasificacion = 'Joven';
                clase = 'joven';
            } else if (edad >= 36 && edad <= 64) {
                clasificacion = 'Adulto';
                clase = 'adulto';
            } else { // 65 o más
                clasificacion = 'Adulto Mayor';
                clase = 'adulto-mayor';
            }
            
            // Mostrar resultado
            resultado.innerHTML = `Edad: ${edad} años<br>Clasificación: ${clasificacion}`;
            resultado.className = `resultado ${clase}`;
        }
        
        // Permitir clasificar con Enter
        document.getElementById('edad').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                clasificar();
            }
        });
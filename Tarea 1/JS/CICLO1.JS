let totalNumeros = 0;
        let contador = 0;
        let resultados = [];
        
        function iniciar() {
            totalNumeros = parseInt(document.getElementById('cantidad').value);
            
            if (!totalNumeros || totalNumeros <= 0) {
                alert('Ingresa una cantidad válida de números');
                return;
            }
            
            // Resetear variables
            contador = 0;
            resultados = [];
            
            // Ocultar paso 1 y mostrar paso 2
            document.getElementById('ingresoCantidad').style.display = 'none';
            document.getElementById('ingresoNumero').style.display = 'block';
            
            // Actualizar estado
            actualizarEstado();
            
            // Limpiar resultado
            document.getElementById('resultado').innerHTML = '';
            
            // Enfocar en el input de número
            document.getElementById('numero').focus();
        }
        
        function evaluarNumero() {
            const numeroInput = document.getElementById('numero');
            const numero = parseFloat(numeroInput.value);
            
            if (numeroInput.value === '') {
                alert('Ingresa un número');
                return;
            }
            
            contador++; // Incrementar contador (simulando while)
            
            // Determinar si es positivo, negativo o cero
            let clasificacion, clase;
            if (numero > 0) {
                clasificacion = 'POSITIVO';
                clase = 'positivo';
            } else if (numero < 0) {
                clasificacion = 'NEGATIVO';  
                clase = 'negativo';
            } else {
                clasificacion = 'CERO';
                clase = 'cero';
            }
            
            // Guardar resultado
            resultados.push({
                numero: numero,
                clasificacion: clasificacion,
                clase: clase
            });
            
            // Mostrar resultados
            mostrarResultados();
            
            // Verificar si hemos terminado (condición del while)
            if (contador < totalNumeros) {
                // Limpiar input y continuar
                numeroInput.value = '';
                numeroInput.focus();
                actualizarEstado();
            } else {
                // Terminar
                terminar();
            }
        }
        
        function mostrarResultados() {
            let html = '<h3> Resultados:</h3>';
            
            for (let i = 0; i < resultados.length; i++) {
                const item = resultados[i];
                html += `
                    <div class="numero-item ${item.clase}">
                        Número ${i + 1}: ${item.numero} → ${item.clasificacion}
                    </div>
                `;
            }
            
            // Mostrar contador
            html += `
                <div class="contador">
                    Números evaluados: ${contador} de ${totalNumeros}
                </div>
            `;
            
            document.getElementById('resultado').innerHTML = html;
        }
        
        function actualizarEstado() {
            document.getElementById('estado').innerHTML = 
                `Número ${contador + 1} de ${totalNumeros}`;
        }
        
        function terminar() {
            document.getElementById('ingresoNumero').style.display = 'none';
            document.getElementById('estado').innerHTML = '✅ ¡Completado!';
            
            // Mostrar botón para reiniciar
            let html = document.getElementById('resultado').innerHTML;
            html += `
                <br>
                <button onclick="reiniciar()" style="background-color: #6c757d;">
                    Hacer Otro Ejercicio
                </button>
            `;
            document.getElementById('resultado').innerHTML = html;
        }
        
        function reiniciar() {
            document.getElementById('ingresoCantidad').style.display = 'block';
            document.getElementById('ingresoNumero').style.display = 'none';
            document.getElementById('cantidad').value = '';
            document.getElementById('numero').value = '';
            document.getElementById('resultado').innerHTML = '';
            totalNumeros = 0;
            contador = 0;
            resultados = [];
        }
        
        // Permitir usar Enter
        document.getElementById('cantidad').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                iniciar();
            }
        });
        
        document.getElementById('numero').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                evaluarNumero();
            }
        });



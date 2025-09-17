 let numeros = [];      // Arreglo de números
        let resultados = [];   // Arreglo de resultados
        let totalNumeros = 0;
        let contador = 0;

        function empezar() {
            totalNumeros = parseInt(document.getElementById('cantidad').value);
            
            if (!totalNumeros || totalNumeros <= 0) {
                alert('Ingresa una cantidad válida');
                return;
            }
            
            // Limpiar arreglos
            numeros = [];
            resultados = [];
            contador = 0;
            
            // Mostrar paso 2
            document.getElementById('paso1').classList.add('hidden');
            document.getElementById('paso2').classList.remove('hidden');
            document.getElementById('arregloVista').classList.remove('hidden');
            
            document.getElementById('total').textContent = totalNumeros;
            actualizarContador();
            actualizarArregloVista();
            
            document.getElementById('numero').focus();
        }

        function agregarNumero() {
            const input = document.getElementById('numero');
            const numero = parseFloat(input.value);
            
            if (input.value === '' || isNaN(numero)) {
                alert('Ingresa un número válido');
                return;
            }
            
            // AGREGAR AL ARREGLO
            numeros.push(numero);
            contador++;
            
            input.value = '';
            input.focus();
            
            actualizarContador();
            actualizarArregloVista();
            
            if (contador >= totalNumeros) {
                alert('¡Arreglo completo! Ahora puedes clasificar');
            }
        }

        function clasificar() {
            if (numeros.length === 0) {
                alert('El arreglo está vacío');
                return;
            }
            
            // Limpiar arreglo de resultados
            resultados = [];
            
            // RECORRER EL ARREGLO Y CLASIFICAR
            for (let i = 0; i < numeros.length; i++) {
                let numero = numeros[i];
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
                
                // AGREGAR RESULTADO AL ARREGLO
                resultados.push({
                    posicion: i,
                    numero: numero,
                    clasificacion: clasificacion,
                    clase: clase
                });
            }
            
            mostrarResultados();
        }

        function mostrarResultados() {
            let html = '<h3>📊 Resultados:</h3>';
            
            // MOSTRAR CADA ELEMENTO DEL ARREGLO
            for (let i = 0; i < resultados.length; i++) {
                const item = resultados[i];
                html += `
                    <div class="numero-item ${item.clase}">
                        <span>Posición ${item.posicion}: <strong>${item.numero}</strong></span>
                        <span class="clasificacion ${item.clase}">${item.clasificacion}</span>
                    </div>
                `;
            }
            
            document.getElementById('resultados').innerHTML = html;
            document.getElementById('resultados').classList.remove('hidden');
            
            mostrarEstadisticas();
        }

        function mostrarEstadisticas() {
            // CONTAR USANDO EL ARREGLO
            let positivos = 0;
            let negativos = 0;
            let ceros = 0;
            let suma = 0;
            
            for (let i = 0; i < resultados.length; i++) {
                if (resultados[i].clase === 'positivo') positivos++;
                else if (resultados[i].clase === 'negativo') negativos++;
                else ceros++;
                
                suma += resultados[i].numero;
            }
            
            const promedio = suma / numeros.length;
            
            const estadisticasHTML = `
                <div class="estadisticas">
                    <h4>📈 Estadísticas del Arreglo:</h4>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-number">${numeros.length}</span>
                            <div>Total</div>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${positivos}</span>
                            <div>Positivos</div>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${negativos}</span>
                            <div>Negativos</div>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${ceros}</span>
                            <div>Ceros</div>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${promedio.toFixed(2)}</span>
                            <div>Promedio</div>
                        </div>
                    </div>
                    <p><strong>Arreglo completo:</strong> [${numeros.join(', ')}]</p>
                </div>
            `;
            
            document.getElementById('resultados').innerHTML += estadisticasHTML;
        }

        function actualizarArregloVista() {
            let html = '';
            
            // MOSTRAR CADA ELEMENTO DEL ARREGLO
            for (let i = 0; i < numeros.length; i++) {
                html += `<span class="numero-chip">${numeros[i]}</span>`;
            }
            
            if (numeros.length === 0) {
                html = '<em>Arreglo vacío</em>';
            }
            
            document.getElementById('numerosChips').innerHTML = html;
            document.getElementById('tamaño').textContent = numeros.length;
        }

        function actualizarContador() {
            document.getElementById('actual').textContent = contador + 1;
        }

        function reiniciar() {
            // LIMPIAR ARREGLOS
            numeros = [];
            resultados = [];
            totalNumeros = 0;
            contador = 0;
            
            // Resetear interfaz
            document.getElementById('paso1').classList.remove('hidden');
            document.getElementById('paso2').classList.add('hidden');
            document.getElementById('arregloVista').classList.add('hidden');
            document.getElementById('resultados').classList.add('hidden');
            
            document.getElementById('cantidad').value = '5';
            document.getElementById('numero').value = '';
            
            actualizarArregloVista();
        }

        // USAR ENTER PARA NAVEGAR
        document.getElementById('cantidad').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') empezar();
        });

        document.getElementById('numero').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') agregarNumero();
        });
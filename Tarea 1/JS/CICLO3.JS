 let totalTrajes = 0;
        let contador = 0;
        let resultados = '';
        
        function empezar() {
            totalTrajes = parseInt(document.getElementById('total').value);
            if (!totalTrajes) return;
            
            contador = 0;
            resultados = '';
            document.getElementById('total').disabled = true;
            document.getElementById('precio').disabled = false;
            document.getElementById('btnCalc').disabled = false;
            document.getElementById('precio').focus();
        }
        
        function calcular() {
            const precio = parseFloat(document.getElementById('precio').value);
            if (!precio) return;
            
            contador++;
            
            // Calcular descuento
            let descuento = precio >= 2500 ? 15 : 8;
            let montoDesc = precio * (descuento / 100);
            let precioFinal = precio - montoDesc;
            
            // Agregar resultado
            resultados += `
                <div class="traje">
                    <strong>Traje ${contador}:</strong><br>
                    Precio: $${precio} → Descuento ${descuento}%<br>
                    <strong>Final: $${precioFinal.toFixed(2)}</strong>
                </div>
            `;
            
            document.getElementById('resultado').innerHTML = resultados;
            document.getElementById('precio').value = '';
            
            // Verificar si terminamos
            if (contador >= totalTrajes) {
                document.getElementById('precio').disabled = true;
                document.getElementById('btnCalc').disabled = true;
                document.getElementById('resultado').innerHTML += '<br><strong>✅ Completado!</strong>';
            } else {
                document.getElementById('precio').focus();
            }
        }
        
        // Enter para avanzar
        document.getElementById('total').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') empezar();
        });
        
        document.getElementById('precio').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calcular();
        });
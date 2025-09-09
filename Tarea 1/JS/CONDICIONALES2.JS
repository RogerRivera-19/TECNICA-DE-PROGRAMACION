function calcularCosto() {
            // Obtener la cantidad de lápices
            const cantidad = document.getElementById('cantidad').value;
            const resultado = document.getElementById('resultado');
            
            // Verificar si se ingresó una cantidad válida
            if (cantidad === '' || cantidad <= 0) {
                resultado.textContent = 'Por favor, ingresa una cantidad válida de lápices';
                resultado.className = 'resultado error';
                return;
            }
            
            const cantidadNum = parseInt(cantidad);
            let precioPorLapiz;
            let mensaje = '';
            
            // Determinar el precio según la cantidad
            if (cantidadNum >= 1000) {
                precioPorLapiz = 0.85;
                mensaje = '<div class="descuento">🎉 ¡Descuento aplicado! (1000+ lápices)</div>';
            } else {
                precioPorLapiz = 0.90;
            }
            
            // Calcular el costo total
            const costoTotal = cantidadNum * precioPorLapiz;
            
            // Mostrar el resultado
            resultado.innerHTML = `
                <div class="calculo">
                    Cantidad: ${cantidadNum.toLocaleString()} lápices<br>
                    Precio por lápiz: $${precioPorLapiz}<br>
                    <hr style="margin: 10px 0;">
                    <strong>Total a pagar: $${costoTotal.toFixed(2)}</strong>
                </div>
                ${mensaje}
            `;
        }
        
        // Permitir calcular presionando Enter
        document.getElementById('cantidad').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calcularCosto();
            }
        });
        
        // Limpiar resultado cuando se borra el input
        document.getElementById('cantidad').addEventListener('input', function() {
            if (this.value === '') {
                document.getElementById('resultado').innerHTML = '';
            }
        });
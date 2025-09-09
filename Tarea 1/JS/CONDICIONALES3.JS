function calcularDescuento() {
            // Obtener el precio del traje
            const precio = document.getElementById('precio').value;
            const resultado = document.getElementById('resultado');
            
            // Verificar si se ingresó un precio válido
            if (precio === '' || precio <= 0) {
                resultado.innerHTML = 'Por favor, ingresa un precio válido para el traje';
                resultado.className = 'resultado error';
                return;
            }
            
            const precioOriginal = parseFloat(precio);
            let porcentajeDescuento;
            let tipoDescuento = '';
            
            // Determinar el porcentaje de descuento según el precio
            if (precioOriginal > 2500) {
                porcentajeDescuento = 15;
                tipoDescuento = 'Premium (≥$2,500)';
            } else {
                porcentajeDescuento = 8;
                tipoDescuento = 'Estándar (<$2,500)';
            }
            
            // Calcular descuento y precio final
            const montoDescuento = precioOriginal * (porcentajeDescuento / 100);
            const precioFinal = precioOriginal - montoDescuento;
            
            // Mostrar el resultado
            resultado.innerHTML = `
                <div class="calculo">
                    <div class="precio-original">
                        Precio original: $${precioOriginal.toFixed(2)}
                    </div>
                    
                    <div class="descuento-aplicado">
                        🎉 Descuento ${tipoDescuento}: ${porcentajeDescuento}%
                    </div>
                    
                    <div class="precio-final">
                        Precio final: $${precioFinal.toFixed(2)}
                    </div>
                    
                    <div class="ahorro">
                        💰 Ahorras: $${montoDescuento.toFixed(2)}
                    </div>
                </div>
            `;
            resultado.className = 'resultado';
        }
        
        // Permitir calcular presionando Enter
        document.getElementById('precio').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calcularDescuento();
            }
        });
        
        // Limpiar resultado cuando se borra el input
        document.getElementById('precio').addEventListener('input', function() {
            if (this.value === '') {
                document.getElementById('resultado').innerHTML = '';
            }
        });
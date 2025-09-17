function calcularCostos() {
            // Obtener el texto del input
            const input = document.getElementById('pedidos').value.trim();
            
            // Validar que no esté vacío
            if (!input) {
                alert('Por favor ingresa las cantidades de lápices');
                return;
            }
            
            // Convertir el texto a un arreglo de números
            const cantidades = input.split(',').map(num => parseInt(num.trim()));
            
            // Validar que todos los números sean válidos
            for (let i = 0; i < cantidades.length; i++) {
                if (isNaN(cantidades[i]) || cantidades[i] <= 0) {
                    alert(`Error en el pedido ${i + 1}: "${cantidades[i]}" no es una cantidad válida`);
                    return;
                }
            }
            
            // Calcular costo de cada pedido
            let html = '<h3> Resultados por Pedido:</h3>';
            let costoTotal = 0;
            
            for (let i = 0; i < cantidades.length; i++) {
                const cantidad = cantidades[i];
                
                // Determinar precio por lápiz
                let precio;
                let tieneDescuento = false;
                
                if (cantidad >= 1000) {
                    precio = 0.85;
                    tieneDescuento = true;
                } else {
                    precio = 0.90;
                }
                
                // Calcular costo del pedido
                const costoPedido = cantidad * precio;
                costoTotal += costoPedido;
                
                // Mostrar resultado del pedido
                html += `
                    <div class="pedido">
                        <strong>Pedido ${i + 1}:</strong> ${cantidad.toLocaleString()} lápices<br>
                        <strong>Precio por lápiz:</strong> $${precio}<br>
                        <strong>Costo:</strong> $${costoPedido.toFixed(2)}
                        ${tieneDescuento ? '<div class="descuento"> Descuento aplicado (≥1000 lápices)</div>' : ''}
                    </div>
                `;
            }
            
            // Agregar total
            html += `
                <div class="total">
                     COSTO TOTAL DE TODOS LOS PEDIDOS: $${costoTotal.toFixed(2)}
                </div>
            `;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = 
                '<div class="resultado">' + html + '</div>';
        }
        
        function limpiar() {
            document.getElementById('pedidos').value = '';
            document.getElementById('resultado').innerHTML = '';
            document.getElementById('pedidos').focus();
        }
        
        // Permitir calcular con Enter
        document.getElementById('pedidos').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calcularCostos();
            }
        });
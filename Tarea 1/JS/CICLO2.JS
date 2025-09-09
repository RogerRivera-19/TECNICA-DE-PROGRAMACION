      let totalPedidos = 0;
        let contadorPedidos = 0;
        let pedidos = [];
        let costoTotal = 0;
        
        function iniciar() {
            totalPedidos = parseInt(document.getElementById('cantidadPedidos').value);
            
            if (!totalPedidos || totalPedidos <= 0) {
                alert('Ingresa una cantidad válida de pedidos');
                return;
            }
            
            // Resetear variables
            contadorPedidos = 0;
            pedidos = [];
            costoTotal = 0;
            
            // Cambiar vista
            document.getElementById('ingresoCantidad').style.display = 'none';
            document.getElementById('ingresoPedido').style.display = 'block';
            
            // Actualizar estado
            actualizarEstado();
            
            // Limpiar resultado
            document.getElementById('resultado').innerHTML = '';
            
            // Enfocar
            document.getElementById('cantidad').focus();
        }
        
        function procesarPedido() {
            const cantidadInput = document.getElementById('cantidad');
            const cantidad = parseInt(cantidadInput.value);
            
            if (!cantidad || cantidad <= 0) {
                alert('Ingresa una cantidad válida de lápices');
                return;
            }
            
            contadorPedidos++; // Incrementar contador (while)
            
            // Calcular costo según cantidad
            let precioPorLapiz;
            let tieneDescuento = false;
            
            if (cantidad >= 1000) {
                precioPorLapiz = 0.85;
                tieneDescuento = true;
            } else {
                precioPorLapiz = 0.90;
            }
            
            const costoPedido = cantidad * precioPorLapiz;
            costoTotal += costoPedido;
            
            // Guardar pedido
            pedidos.push({
                numero: contadorPedidos,
                cantidad: cantidad,
                precio: precioPorLapiz,
                costo: costoPedido,
                descuento: tieneDescuento
            });
            
            // Mostrar resultados
            mostrarResultados();
            
            // Verificar si continuamos (condición del while)
            if (contadorPedidos < totalPedidos) {
                // Continuar con siguiente pedido
                cantidadInput.value = '';
                cantidadInput.focus();
                actualizarEstado();
            } else {
                // Terminar procesamiento
                terminar();
            }
        }
        
        function mostrarResultados() {
            let html = '<h3>📋 Pedidos Procesados:</h3>';
            
            for (let i = 0; i < pedidos.length; i++) {
                const pedido = pedidos[i];
                html += `
                    <div class="pedido-item">
                        <strong>Pedido ${pedido.numero}:</strong> $${pedido.costo.toFixed(2)}<br>
                        <small>
                            ${pedido.cantidad.toLocaleString()} lápices × $${pedido.precio} = $${pedido.costo.toFixed(2)}
                        </small>
                        ${pedido.descuento ? '<div class="descuento">✅ Descuento aplicado (≥1000 lápices)</div>' : ''}
                    </div>
                `;
            }
            
            // Mostrar progreso
            html += `
                <div class="contador">
                    Pedidos procesados: ${contadorPedidos} de ${totalPedidos}
                </div>
            `;
            
            document.getElementById('resultado').innerHTML = html;
        }
        
        function actualizarEstado() {
            document.getElementById('estado').innerHTML = 
                `Pedido ${contadorPedidos + 1} de ${totalPedidos}`;
        }
        
        function terminar() {
            document.getElementById('ingresoPedido').style.display = 'none';
            
            // Agregar total final
            let html = document.getElementById('resultado').innerHTML;
            html += `
                <div class="total-final">
                    💰 COSTO TOTAL DE TODOS LOS PEDIDOS: $${costoTotal.toFixed(2)}
                </div>
                <br>
                <button onclick="reiniciar()" style="background-color: #6c757d;">
                    Procesar Nuevos Pedidos
                </button>
            `;
            document.getElementById('resultado').innerHTML = html;
        }
        
        function reiniciar() {
            document.getElementById('ingresoCantidad').style.display = 'block';
            document.getElementById('ingresoPedido').style.display = 'none';
            document.getElementById('cantidadPedidos').value = '';
            document.getElementById('cantidad').value = '';
            document.getElementById('resultado').innerHTML = '';
            totalPedidos = 0;
            contadorPedidos = 0;
            pedidos = [];
            costoTotal = 0;
        }
        
        // Eventos Enter
        document.getElementById('cantidadPedidos').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                iniciar();
            }
        });
        
        document.getElementById('cantidad').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                procesarPedido();
            }
        });
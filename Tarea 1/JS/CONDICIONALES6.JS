function calcular() {
            const clave = document.getElementById('clave').value;
            const materiaPrima = parseFloat(document.getElementById('materiaPrima').value);
            
            if (!clave || !materiaPrima || materiaPrima <= 0) {
                document.getElementById('resultado').innerHTML = 'Selecciona una clave e ingresa el costo de materia prima';
                return;
            }
            
            // Porcentajes según la clave
            let porcentajes = {};
            
            if (clave === '1') {
                porcentajes = { manoObra: 80, gastos: 40, utilidad: 50 };
            } else if (clave === '2') {
                porcentajes = { manoObra: 70, gastos: 30, utilidad: 40 };
            } else if (clave === '3') {
                porcentajes = { manoObra: 75, gastos: 35, utilidad: 45 };
            } else if (clave === '4') {
                porcentajes = { manoObra: 85, gastos: 45, utilidad: 55 };
            } else if (clave === '5') {
                porcentajes = { manoObra: 65, gastos: 25, utilidad: 35 };
            } else if (clave === '6') {
                porcentajes = { manoObra: 90, gastos: 50, utilidad: 60 };
            }
            
            // Calcular costos
            const manoObra = materiaPrima * (porcentajes.manoObra / 100);
            const gastosFabricacion = materiaPrima * (porcentajes.gastos / 100);
            const costoProduccion = materiaPrima + manoObra + gastosFabricacion;
            const utilidad = costoProduccion * (porcentajes.utilidad / 100);
            const precioVenta = costoProduccion + utilidad;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = `
                <div class="resultado">
                    <h3>Clave ${clave} - Desglose de Costos:</h3>
                    
                    <div class="linea">Materia Prima: $${materiaPrima.toFixed(2)}</div>
                    <div class="linea">Mano de Obra (${porcentajes.manoObra}% de MP): $${manoObra.toFixed(2)}</div>
                    <div class="linea">Gastos de Fabricación (${porcentajes.gastos}% de MP): $${gastosFabricacion.toFixed(2)}</div>
                    
                    <div class="total">Costo de Producción: $${costoProduccion.toFixed(2)}</div>
                    
                    <div class="linea" style="margin-top: 15px;">Utilidad (${porcentajes.utilidad}% del costo): $${utilidad.toFixed(2)}</div>
                    
                    <div class="total" style="background-color: #cce5ff; color: #004085;">
                        Precio de Venta: $${precioVenta.toFixed(2)}
                    </div>
                </div>
            `;
        }
        
        // Permitir calcular con Enter
        document.getElementById('materiaPrima').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calcular();
            }
        });
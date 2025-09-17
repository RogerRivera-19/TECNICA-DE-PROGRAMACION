 const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        
        function convertir() {
            // Obtener números del input
            const entrada = document.getElementById('numeros').value;
            const resultado = document.getElementById('resultado');
            
            if (!entrada.trim()) {
                resultado.innerHTML = '<div class="dia error"> Por favor ingresa algunos números</div>';
                return;
            }
            
            // Convertir texto a array de números
            const numeros = entrada.split(',').map(n => parseInt(n.trim()));
            
            let html = '<h3> Resultados:</h3>';
            let validos = 0;
            let invalidos = 0;
            
            // Procesar cada número
            numeros.forEach((numero, i) => {
                if (numero >= 1 && numero <= 7) {
                    //  Número válido - usar array directamente
                    const nombreDia = dias[numero - 1];
                    html += `<div class="dia"> #${i+1}: ${numero} → <strong>${nombreDia}</strong></div>`;
                    validos++;
                } else {
                    //  Número inválido
                    html += `<div class="dia error"> #${i+1}: ${numero} (debe ser 1-7)</div>`;
                    invalidos++;
                }
            });
            
            // Mostrar estadísticas
            html += `
                <div style="margin-top: 20px; text-align: center; background: #e8f5e8; padding: 15px; border-radius: 8px;">
                    <strong>📈 Resumen:</strong><br>
                    Total: ${numeros.length} |  Válidos: ${validos} |  Inválidos: ${invalidos}
                </div>
            `;
            
            resultado.innerHTML = html;
        }
        
        function limpiar() {
            document.getElementById('numeros').value = '';
            document.getElementById('resultado').innerHTML = '';
        }
        
        // Permitir Enter para convertir
        document.getElementById('numeros').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') convertir();
        });
import { useState } from 'react';

export const PromedioRanking = ({ promedio, ranking }: { promedio: string | number, ranking: number }) => {
    const [puntosEncuesta, setPuntosEncuesta] = useState<number | null>(null);

    // Función para actualizar los puntos según la respuesta del usuario
    const manejarRespuesta = (valor: number) => {
        setPuntosEncuesta(valor);
    };

    return (
        <div>
            <h3>Calculo de Promedio y Ranking</h3>
            <h1>Promedio: {promedio}</h1>
            <h1>Ranking: {ranking + (puntosEncuesta || 0)}</h1>
            <div>
                <h4>¿Contestaste las encuestas del cuatrimestre pasado?</h4>
                <div>
                    <input
                        type="checkbox"
                        id="primera"
                        checked={puntosEncuesta === 10}
                        onChange={() => manejarRespuesta(puntosEncuesta === 10 ? 0 : 10)}
                    />
                    <label htmlFor="primera">Sí, en el primer llamado</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="segunda"
                        checked={puntosEncuesta === 5}
                        onChange={() => manejarRespuesta(puntosEncuesta === 5 ? 0 : 5)}
                    />
                    <label htmlFor="segunda">Sí, en el segundo llamado</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="no"
                        checked={puntosEncuesta === 0}
                        onChange={() => manejarRespuesta(puntosEncuesta === 0 ? 0 : 0)}
                    />
                    <label htmlFor="no">No contesté</label>
                </div>
            </div>
        </div>
    );
};

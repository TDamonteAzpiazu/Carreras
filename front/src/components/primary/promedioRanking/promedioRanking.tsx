import { useState } from 'react';
import styles from './promedioRanking.module.css';

export const PromedioRanking = ({ promedio, ranking }: { promedio: string | number, ranking: number }) => {
    const [puntosEncuesta, setPuntosEncuesta] = useState<number | null>(null);
    const [mostrarEncuesta, setMostrarEncuesta] = useState<boolean>(false);

    // Función para actualizar los puntos según la respuesta del usuario
    const manejarRespuesta = (valor: number) => {
        setPuntosEncuesta(valor);
        // setMostrarEncuesta(!mostrarEncuesta);
    };

    // Función para alternar la visualización de la encuesta
    const toggleEncuesta = () => {
        setMostrarEncuesta(!mostrarEncuesta);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Cálculo de Promedio y Ranking</h2>

            <div className={styles.content}>
                {/* Componente de Promedio */}
                <div className={styles.leftComponent}>
                    <h3 className={styles.rankingTitle}>Promedio</h3>
                    <h1 className={styles.promedioValue}>{promedio}</h1>
                </div>

                {/* Componente de Ranking */}
                <div className={styles.rightComponent}>
                    <h3 className={styles.rankingTitle}>Ranking</h3>
                    <h1 className={styles.rankingValue}>{ranking + (puntosEncuesta || 0)}</h1>

                    {/* Dropdown para encuestas */}
                    <button className={styles.dropdownButton} onClick={toggleEncuesta}>
                        {mostrarEncuesta ? 'Cerrar Encuestas' : 'Encuestas'}
                    </button>

                    {mostrarEncuesta && (
                        <div className={styles.checkboxGroup}>
                            <h4>¿Contestaste las encuestas del cuatrimestre pasado?</h4>

                            <div>
                                <input
                                    type="checkbox"
                                    id="primera"
                                    checked={puntosEncuesta === 10}
                                    onChange={() => manejarRespuesta(puntosEncuesta === 10 ? 0 : 10)}
                                />
                                <label htmlFor="primera" className={styles.label}>Sí, en el primer llamado</label>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    id="segunda"
                                    checked={puntosEncuesta === 5}
                                    onChange={() => manejarRespuesta(puntosEncuesta === 5 ? 0 : 5)}
                                />
                                <label htmlFor="segunda" className={styles.label}>Sí, en el segundo llamado</label>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    id="no"
                                    checked={puntosEncuesta === 0}
                                    onChange={() => manejarRespuesta(puntosEncuesta === 0 ? 0 : 0)}
                                />
                                <label htmlFor="no" className={styles.label}>No contesté</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

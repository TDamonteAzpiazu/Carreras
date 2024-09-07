import React, { useState } from "react";
import { useMateriasStore } from "../../../store/useMateriasStore";
import { contador } from "../../../helpers/contador";
import style from "./contador.module.css";
import { Materia } from "../../../components/secondary/materia/materia";
import { CodigoColores } from "../../../components/secondary/codigoColores/codigoColores";

export const Contador = () => {
    const materiasNotas = useMateriasStore((state) => state.notas);

    const optativasAprobadas = contador.reduce((count, materia) => {
        const notas = materiasNotas[materia.codigo] || [];
        if (materia.esOptativa && notas.some(nota => nota >= 4)) {
            count++;
        }
        return count;
    }, 0);

    const [showOptativas, setShowOptativas] = useState(false);

    return (
        <div>
            <h2>Materias de contador</h2>
            <CodigoColores />
            <div className={style.container}>
                {contador
                    .filter(materia => !materia.esOptativa)
                    .map(materia => (
                        <Materia
                            key={materia.codigo}
                            codigo={materia.codigo}
                            nombre={materia.nombre}
                            cargaHoraria={materia.cargaHorariaSemanal}
                            correlativas={materia.correlativas}
                            esOptativa={materia.esOptativa}
                            optativas={1}
                            optativasAprobadas={optativasAprobadas}
                        />
                    ))
                }
            </div>
            <button
                className={style.toggleButton}
                onClick={() => setShowOptativas(!showOptativas)}
            >
                Necesitas 1 Optativa
                <span className={`${style.arrow} ${showOptativas ? style.up : style.down}`}></span>
            </button>
            {showOptativas && (
                <div className={style.container}>
                    {contador
                        .filter(materia => materia.esOptativa)
                        .map(materia => (
                            <Materia
                                key={materia.codigo}
                                codigo={materia.codigo}
                                nombre={materia.nombre}
                                cargaHoraria={materia.cargaHorariaSemanal}
                                correlativas={materia.correlativas}
                                esOptativa={materia.esOptativa}
                                optativas={1}
                                optativasAprobadas={optativasAprobadas}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    );
};

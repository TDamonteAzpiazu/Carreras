import React, { useState } from "react";
import { useMateriasStore } from "../../../store/useMateriasStore";
import { economia } from "../../../helpers/economia";
import style from "./economia.module.css";
import { Materia } from "../../../components/secondary/materia/materia";
import { CodigoColores } from "../../../components/secondary/codigoColores/codigoColores";

export const Economia = () => {
    const materiasNotas = useMateriasStore((state) => state.notas);

    const optativasAprobadas = economia.reduce((count, materia) => {
        const notas = materiasNotas[materia.codigo] || [];
        if (materia.esOptativa && notas.some(nota => nota >= 4)) {
            count++;
        }
        return count;
    }, 0);

    const [showOptativas, setShowOptativas] = useState(false);

    return (
        <div>
            <div className={style.header}>
                <h2 className={style.title}>Economía</h2>
                <div className={style.colores}>
                    <CodigoColores />
                </div>
            </div>
            <div className={style.container}>
                {economia
                    .filter(materia => !materia.esOptativa)
                    .map(materia => (
                        <Materia
                            key={materia.codigo}
                            codigo={materia.codigo}
                            nombre={materia.nombre}
                            cargaHoraria={materia.cargaHorariaSemanal}
                            correlativas={materia.correlativas}
                            esOptativa={materia.esOptativa}
                            optativas={3}
                            optativasAprobadas={optativasAprobadas}
                        />
                    ))
                }
            </div>
            <button
                className={style.toggleButton}
                onClick={() => setShowOptativas(!showOptativas)}
            >
                Necesitas 3 Optativas
                <span className={`${style.arrow} ${showOptativas ? style.up : style.down}`}></span>
            </button>
            {showOptativas && (
                <div className={style.container}>
                    {economia
                        .filter(materia => materia.esOptativa)
                        .map(materia => (
                            <Materia
                                key={materia.codigo}
                                codigo={materia.codigo}
                                nombre={materia.nombre}
                                cargaHoraria={materia.cargaHorariaSemanal}
                                correlativas={materia.correlativas}
                                esOptativa={materia.esOptativa}
                                optativas={3}
                                optativasAprobadas={optativasAprobadas}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    );
};

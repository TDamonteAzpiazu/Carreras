import React, { useState } from "react";
import { useMateriasStore } from "../../../store/useMateriasStore";
import { sistemas } from "../../../helpers/sistemas";
import style from "./sistemas.module.css";
import { Materia } from "../../../components/secondary/materia/materia";
import { CodigoColores } from "../../../components/secondary/codigoColores/codigoColores";

export const Sistemas = () => {
    const materiasNotas = useMateriasStore((state) => state.notas);

    const optativasAprobadas = sistemas.reduce((count, materia) => {
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
                <h2 className={style.title}>Sistemas de Información de las Organizaciones</h2>
                <div className={style.colores}>
                    <CodigoColores />
                </div>
            </div>
            <div className={style.container}>
                {sistemas
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
                    {sistemas
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

import React, { useState } from "react";
import { useMateriasStore } from "../../../store/useMateriasStore";
import { admin } from "../../../helpers/admin";
import style from "./admin.module.css";
import { Materia } from "../../../components/secondary/materia/materia";
import { CodigoColores } from "../../../components/secondary/codigoColores/codigoColores";

export const Admin = () => {
    const materiasNotas = useMateriasStore((state) => state.notas);

    const optativasAprobadas = admin.reduce((count, materia) => {
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
                <h2 className={style.title}>Administración</h2>
                <div className={style.colores}>
                    <CodigoColores />
                </div>
            </div>
            <div className={style.container}>
                {admin
                    .filter(materia => !materia.esOptativa)
                    .map(materia => (
                        <Materia
                            key={materia.codigo}
                            codigo={materia.codigo}
                            nombre={materia.nombre}
                            cargaHoraria={materia.cargaHorariaSemanal}
                            correlativas={materia.correlativas}
                            esOptativa={materia.esOptativa}
                            optativas={2}
                            optativasAprobadas={optativasAprobadas}
                        />
                    ))
                }
            </div>
            <button
                className={style.toggleButton}
                onClick={() => setShowOptativas(!showOptativas)}
            >
                Necesitas 2 Optativas
                <span className={`${style.arrow} ${showOptativas ? style.up : style.down}`}></span>
            </button>
            {showOptativas && (
                <div className={style.container}>
                    {admin
                        .filter(materia => materia.esOptativa)
                        .map(materia => (
                            <Materia
                                key={materia.codigo}
                                codigo={materia.codigo}
                                nombre={materia.nombre}
                                cargaHoraria={materia.cargaHorariaSemanal}
                                correlativas={materia.correlativas}
                                esOptativa={materia.esOptativa}
                                optativas={2}
                                optativasAprobadas={optativasAprobadas}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    );
};

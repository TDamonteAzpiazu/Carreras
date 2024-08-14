import React, { useState } from "react";
import { useMateriasStore } from "../../store/useMateriasStore";
import style from "./materia.module.css";

interface MateriaProps {
    codigo: number;
    nombre: string;
    cargaHoraria: number;
    correlativas: number[];
}

export const Materia: React.FC<MateriaProps> = ({ codigo, nombre, cargaHoraria, correlativas }) => {
    const [isOpen, setIsOpen] = useState(false);
    const notas = useMateriasStore((state) => state.notas[codigo]) || [];
    const addNota = useMateriasStore((state) => state.addNota);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleNotaChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newNota = parseFloat(e.target.value);
        if (!isNaN(newNota)) {
            addNota(codigo, newNota);
        }
    };

    return (
        <div className={style.card} onClick={toggleOpen}>
            <h3>{nombre}</h3>
            <div className={style.footer}>
                <span className={style.codigo}>{codigo}</span>
                <span className={style.cargaHoraria}>{cargaHoraria}</span>
            </div>
            {isOpen && (
                <>
                    <div className={style.correlativas}>
                        <p>Correlativas: {correlativas.length > 0 ? correlativas.join(", ") : "No hay correlativas"}</p>
                    </div>
                    <div className={style.notas}>
                        <p>Notas:</p>
                        {notas.map((nota, index) => (
                            <span
                                key={index}
                                style={{ color: nota < 4 ? 'red' : 'black' }}
                            >
                                {nota}
                                {index < notas.length - 1 && " - "}
                            </span>
                        ))}
                        {notas.every(nota => nota < 4) && (
                            <input
                                type="number"
                                value=""
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleNotaChange(e, notas.length)}
                                min={1}
                                max={10}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

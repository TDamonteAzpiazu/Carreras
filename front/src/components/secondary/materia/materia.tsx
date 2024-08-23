import React, { useState } from "react";
import { useMateriasStore } from "../../../store/useMateriasStore";
import style from "./materia.module.css";

interface MateriaProps {
    codigo: number;
    nombre: string;
    cargaHoraria: number;
    correlativas: number[];
    esOptativa: boolean;
    optativas: number;
    optativasAprobadas: number; 
}

export const Materia: React.FC<MateriaProps> = ({ codigo, nombre, cargaHoraria, correlativas, esOptativa, optativas, optativasAprobadas }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notaInput, setNotaInput] = useState('');
    const notas = useMateriasStore((state) => state.notas[codigo]) || [];
    const addNota = useMateriasStore((state) => state.addNota);
    const deleteLastNota = useMateriasStore((state) => state.deleteLastNota);
    const materiasNotas = useMateriasStore((state) => state.notas);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleNotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Permitir valores vacíos o números menores o iguales a 10
        if (value === '' || /^[0-9]*$/.test(value)) {
            const numericValue = parseFloat(value);
            if (numericValue <= 10 || isNaN(numericValue)) {
                setNotaInput(value);
            }
        }
    };

    const handleNotaSubmit = () => {
        const newNota = parseFloat(notaInput);
        // Aceptar solo valores válidos entre 1 y 10
        if (!isNaN(newNota) && newNota >= 1 && newNota <= 10) {
            addNota(codigo, newNota);
            setNotaInput('');
        }
    };

    const areCorrelativasApproved = correlativas.every(correlativa => {
        const correlativaNotas = materiasNotas[correlativa] || [];
        return correlativaNotas.some(nota => nota >= 4);
    });

    const canBeTaken = areCorrelativasApproved || !correlativas.length;

    const getCardColor = () => {
        if (notas.length > 0 && notas[notas.length - 1] >= 4) {
            return 'green';
        }
        if (esOptativa && optativasAprobadas >= optativas) {
            return 'lightgreen'; 
        }
        if (!canBeTaken) {
            return 'lightgray'; 
        }
        if (notas.length > 0 && notas[notas.length - 1] < 4) {
            return 'red'; 
        }
        return 'yellow'; 
    };

    return (
        <div
            className={`${style.card} ${isOpen ? style.expanded : ""}`} 
            style={{ backgroundColor: getCardColor() }}
            onClick={toggleOpen}
        >
            <div className={style.cardHeader}>
                <span className={style.codigo}>{codigo}</span>
            </div>
            <div className={style.cardBody}>
                <h3>{nombre}</h3>
            </div>
            {isOpen && (
                <>
                    <div className={style.cargaHoraria}>
                        <span>Carga horaria: {cargaHoraria} horas</span>
                    </div>
                    <div className={style.correlativas}>
                        <p>
                            Correlativas: {correlativas.length > 0
                                ? correlativas.join(", ")
                                : 'No hay correlativas'}
                        </p>
                        {!canBeTaken && (
                            <p className={style.error}>Debes aprobar las correlativas</p>
                        )}
                    </div>
                    <div className={style.notas}>
                        {notas.map((nota, index) => (
                            <span
                                key={index}
                                style={{ color: nota < 4 ? 'black' : 'black', backgroundColor: nota < 4 ? 'red' : 'transparent' }}
                            >
                                {nota}
                                {index === notas.length - 1 && (
                                    <button
                                        className={style.deleteButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteLastNota(codigo);
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                                {index < notas.length - 1 && " - "}
                            </span>
                        ))}
                        {canBeTaken && (notas.length === 0 || notas[notas.length - 1] < 4) && (
                            <input
                                type="number"
                                value={notaInput}
                                onClick={(e) => e.stopPropagation()}
                                onChange={handleNotaChange}
                                onBlur={handleNotaSubmit} 
                                min={1}
                                max={10}
                                className={style.numericInput}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleNotaSubmit();
                                    }
                                }}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

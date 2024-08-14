import React, { useState } from "react";
import { useMateriasStore } from "../../store/useMateriasStore";
import style from "./materia.module.css";

interface MateriaProps {
    codigo: number;
    nombre: string;
    cargaHoraria: number;
    correlativas: number[];
    esOptativa: boolean;
    optativas: number;
    optativasAprobadas: number; // Añade este prop
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
        setNotaInput(e.target.value);
    };

    const handleNotaSubmit = () => {
        const newNota = parseFloat(notaInput);
        if (!isNaN(newNota)) {
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
            return 'lightgreen'; // Cambia el color cuando se alcanzan las optativas requeridas
        }
        if (!canBeTaken) {
            return 'lightgray'; 
        }
        if (notas.length > 0 && notas[notas.length - 1] < 4) {
            return 'red'; 
        }
        return 'yellow'; 
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNotaSubmit();
        }
    };

    return (
        <div
            className={style.card}
            style={{ backgroundColor: getCardColor() }}
            onClick={toggleOpen}
        >
            <h3>{esOptativa ? `${nombre} (ELECTIVA)` : nombre}</h3>
            <div className={style.footer}>
                <span className={style.codigo}>{codigo}</span>
                <span className={style.cargaHoraria}>{cargaHoraria}</span>
            </div>
            {isOpen && (
                <>
                    <div className={style.correlativas}>
                        <p>
                            Correlativas: {correlativas.length > 0
                                ? canBeTaken
                                    ? 'Todas aprobadas'
                                    : correlativas.join(", ")
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
                                onKeyPress={handleKeyPress} 
                                onBlur={handleNotaSubmit} 
                                min={1}
                                max={10}
                                className={style.numericInput}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

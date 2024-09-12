import create from 'zustand';
import { persist } from 'zustand/middleware';

interface MateriaState {
    notas: { [codigo: string]: number[] };
    addNota: (codigo: number, nota: number) => void;
    deleteLastNota: (codigo: number) => void;
    reset: () => void;
}

export const useMateriasStore = create<MateriaState>()(
    persist(
        (set) => ({
            notas: {},
            addNota: (codigo, nota) => {
                set((state) => {
                    const existingNotas = state.notas[codigo] || [];
                    return {
                        notas: {
                            ...state.notas,
                            [codigo]: [...existingNotas, nota],
                        },
                    };
                });
            },
            deleteLastNota: (codigo) => {
                set((state) => {
                    const notas = state.notas[codigo];
                
                    if (notas && notas.length > 0) {
                        return {
                            notas: {
                                ...state.notas,
                                [codigo]: notas.slice(0, -1),
                            },
                        };
                    }

                    return state; // Retorna el estado sin cambios si no hay notas
                });
            },
            reset: () => set({ notas: {} }), // Implementación del método reset
        }),
        { name: 'notas-store' }
    )
);

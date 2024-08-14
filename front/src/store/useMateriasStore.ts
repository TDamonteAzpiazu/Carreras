import create from 'zustand';

interface MateriaState {
    notas: { [codigo: number]: number[] };
    addNota: (codigo: number, nota: number) => void;
    deleteLastNota: (codigo: number) => void;
}

export const useMateriasStore = create<MateriaState>((set) => ({
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

            // Retorna el estado sin cambios si no hay notas que eliminar
            return state;
        });
    },
}));

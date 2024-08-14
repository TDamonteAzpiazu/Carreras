import create from 'zustand';

interface MateriaState {
    notas: { [codigo: number]: number[] };
    addNota: (codigo: number, nota: number) => void;
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
}));

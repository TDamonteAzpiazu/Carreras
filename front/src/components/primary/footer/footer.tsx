import style from './footer.module.css';
import { useMateriasStore } from '../../../store/useMateriasStore';

export const Footer = () => {
    const handleClearStorage = () => {
        // Limpia el localStorage
        localStorage.removeItem('notas-store');

        // Limpia el estado global usando Zustand
        useMateriasStore.getState().reset(); // Asume que tienes un método `reset` en tu store
    };

    return (
        <footer className={style.footer}>
            <p>La información se está guardando en el localStorage.</p>
            <button className={style.clearButton} onClick={handleClearStorage}>
                Limpiar información
            </button>
        </footer>
    );
};

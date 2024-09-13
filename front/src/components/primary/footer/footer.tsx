import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Importamos íconos desde react-icons
import styles from './footer.module.css';
import { useMateriasStore } from '../../../store/useMateriasStore';

export const Footer = () => {
    const resetStore = useMateriasStore((state) => state.reset);

    const handleClearStorage = () => {
        localStorage.clear();
        resetStore();
        alert('LocalStorage y estado reseteados');
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Información de contacto: nombre + íconos */}
                <div className={styles.leftSection}>
                    <p className={styles.author}>Página creada por :</p>
                    <p className={styles.author} style={{ fontWeight: 'bold'}}>Tobías Damonte Azpiazu</p>
                    <a href="mailto:tobidamonte@gmail.com" className={styles.icon}>
                        <FaEnvelope />
                    </a>
                    <a href="https://www.linkedin.com/in/tobiasdamonteazpiazu/" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaLinkedin />
                    </a>
                </div>

                {/* Botón para vaciar el LocalStorage a la derecha */}
                <div className={styles.rightSection}>
                    <p>Haz click en el botón para vaciar el LocalStorage:</p>
                    <button onClick={handleClearStorage} className={styles.clearButton}>
                        Vaciar LocalStorage
                    </button>
                </div>
            </div>
        </footer>
    );
};

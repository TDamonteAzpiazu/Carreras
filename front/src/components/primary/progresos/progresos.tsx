import { ProgressBar } from "../../secondary/progressBar/progressBar";
import styles from "./progresos.module.css";

export const BarrasProgreso = ({ getProgreso }: { getProgreso: Function }) => {
    return (
        <div>
            <div>
                <h1 className={styles.title}>Progresos</h1>
            </div>
            <div>
                <h3>Sistemas:</h3>
                <ProgressBar progreso={getProgreso('sistemas')} />
            </div>
            <div>
                <h3>Actuario en Economía:</h3>
                <ProgressBar progreso={getProgreso('actuarioEconomia')} />
            </div>
            <div>
                <h3>Actuario en Administración:</h3>
                <ProgressBar progreso={getProgreso('actuarioAdministracion')} />
            </div>
            <div>
                <h3>Economía:</h3>
                <ProgressBar progreso={getProgreso('economia')} />
            </div>
            <div>
                <h3>Administración:</h3>
                <ProgressBar progreso={getProgreso('administracion')} />
            </div>
            <div>
                <h3>Contador:</h3>
                <ProgressBar progreso={getProgreso('contador')} />
            </div>
        </div>
    );
};

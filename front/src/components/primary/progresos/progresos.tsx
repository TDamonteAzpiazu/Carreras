import { ProgressBar } from "../../secondary/progressBar/progressBar";

export const BarrasProgreso = ({ getProgreso }: { getProgreso: Function }) => {
    return (
        <div>
            <div>
                <h3>Progreso en Sistemas:</h3>
                <ProgressBar progreso={getProgreso('sistemas')} />
            </div>
            <div>
                <h3>Progreso en Actuario en Economía:</h3>
                <ProgressBar progreso={getProgreso('actuarioEconomia')} />
            </div>
            <div>
                <h3>Progreso en Actuario en Administración:</h3>
                <ProgressBar progreso={getProgreso('actuarioAdministracion')} />
            </div>
            <div>
                <h3>Progreso en Economía:</h3>
                <ProgressBar progreso={getProgreso('economia')} />
            </div>
            <div>
                <h3>Progreso en Administración:</h3>
                <ProgressBar progreso={getProgreso('administracion')} />
            </div>
            <div>
                <h3>Progreso en Contador:</h3>
                <ProgressBar progreso={getProgreso('contador')} />
            </div>
        </div>
    );
};

import { InformacionGeneral } from "../../components/primary/informacionGeneral/informacionGeneral"
import { BarrasProgreso } from "../../components/primary/progresos/progresos"
import { PromedioRanking } from "../../components/primary/promedioRanking/promedioRanking"
import { RecomendacionMaterias } from "../../components/primary/recomendarMaterias/recomendarMaterias"
import { actuarioAdmin } from "../../helpers/actuarioAdmin"
import { actuarioEcon } from "../../helpers/actuarioEcon"
import { admin } from "../../helpers/admin"
import { contador } from "../../helpers/contador"
import { economia } from "../../helpers/economia"
import { materiasXCarrera } from "../../helpers/materiasXCarrera"
import { sistemas } from "../../helpers/sistemas"
import { useMateriasStore } from "../../store/useMateriasStore"  
import styles from "./home.module.css"

export const Home = () => {
    const notas = useMateriasStore((state) => state.notas)

    console.log(notas)

    let total = 0
    let materiasCursadas = 0
    for(const nota in notas){
        for(const i in notas[nota]){
            total += notas[nota][i]
            materiasCursadas++
        }
    }
    const promedio = materiasCursadas > 0 ? (total / materiasCursadas).toFixed(1) : '0.0';

    const getHelper = (carrera: string) => {
        switch (carrera) {
            case 'sistemas':
                return sistemas;
            case 'actuarioEconomia':
                return actuarioEcon;
            case 'actuarioAdministracion':
                return actuarioAdmin;
            case 'economia':
                return economia;
            case 'administracion':
                return admin;
            case 'contador':
                return contador;
            default:
                return [];
        }
    }

    const getProgreso = (carrera: keyof typeof materiasXCarrera) => {
        const { materias: totalMaterias , optativas: maxOptativas } = materiasXCarrera[carrera];
        const materiasHelper = getHelper(carrera);

        let materiasAprobadas = 0;
        let optativasAprobadas = 0;

        materiasHelper.forEach((materia) => {
            const notasMateria = notas[materia.codigo] || [];
            if (notasMateria.some((nota) => nota >= 4)) {
                if(materia.esOptativa){
                    if(optativasAprobadas < maxOptativas) {
                        optativasAprobadas++;
                    }
                } else {
                    materiasAprobadas++;
                }
            }
        });
        const progreso = ((materiasAprobadas + optativasAprobadas) / totalMaterias) * 100;
        return Math.floor(progreso);
    }

    return (
        <div className={styles.grid}>
            <div className={styles.infoGeneral}>
                <InformacionGeneral />
            </div>
            <div className={styles.calculoPromedio}>
                <PromedioRanking promedio={promedio} />
            </div>
            <div className={styles.barrasProgreso}>
                <BarrasProgreso getProgreso={getProgreso} />
            </div>
            <div className={styles.recomendacionMaterias}>
                <RecomendacionMaterias />
            </div>
        </div>
    );
};
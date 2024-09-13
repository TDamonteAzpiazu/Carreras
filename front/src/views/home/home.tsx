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

    let total = 0
    let materiasCursadas = 0
    for(const nota in notas){
        for(const i in notas[nota]){
            total += notas[nota][i]
            materiasCursadas++
        }
    }
    const promedio = materiasCursadas > 0 ? parseFloat((total / materiasCursadas).toFixed(1)) : 0;

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

    // Función para calcular el valor A
    const calcularValorA = (materiasAprobadas: number, materiasCursadas: number) => {
        return materiasCursadas > 0 ? (materiasAprobadas / materiasCursadas) * 100 : 0;
    };

    // Función para calcular el valor B
    const calcularValorB = (materiasAprobadas: number) => {
        return materiasAprobadas * 3;
    };

    // Función para calcular el valor C
    const calcularValorC = (promedio: number) => {
        return promedio * 3;
    };

    // Función para calcular el valor D
    const calcularValorD = (notas: any) => {
        const carreras = Object.keys(materiasXCarrera) as Array<keyof typeof materiasXCarrera>;
        let materiasFaltantesPorCarrera: { [key: string]: number } = {};

        // Calculamos las materias faltantes para cada carrera
        carreras.forEach(carrera => {
            const { materias: totalMaterias, optativas: maxOptativas } = materiasXCarrera[carrera];
            const materiasHelper = getHelper(carrera);

            let materiasAprobadas = 0;
            let optativasAprobadas = 0;

            materiasHelper.forEach((materia) => {
                const notasMateria = notas[materia.codigo] || [];
                if (notasMateria.some((nota : number) => nota >= 4)) {
                    if (materia.esOptativa) {
                        if (optativasAprobadas < maxOptativas) {
                            optativasAprobadas++;
                        }
                    } else {
                        materiasAprobadas++;
                    }
                }
            });

            const totalMateriasCursadas = materiasAprobadas + optativasAprobadas;
            const materiasFaltantes = totalMaterias - totalMateriasCursadas;

            materiasFaltantesPorCarrera[carrera] = materiasFaltantes;
        });

        // Encontramos el valor de D más alto según las materias faltantes
        let valorD = 0;
        for (const materiasFaltantes of Object.values(materiasFaltantesPorCarrera)) {
            if (materiasFaltantes === 1) valorD = Math.max(valorD, 90);
            else if (materiasFaltantes === 2) valorD = Math.max(valorD, 65);
            else if (materiasFaltantes === 3) valorD = Math.max(valorD, 45);
            else if (materiasFaltantes === 4) valorD = Math.max(valorD, 30);
            else if (materiasFaltantes === 5) valorD = Math.max(valorD, 20);
            else if (materiasFaltantes === 6) valorD = Math.max(valorD, 15);
            else if (materiasFaltantes === 7) valorD = Math.max(valorD, 10);
            else if (materiasFaltantes === 8) valorD = Math.max(valorD, 5);
            else if (materiasFaltantes >= 9) valorD = Math.max(valorD, 0);
        }

        return valorD;
    };

    // Función para calcular el ranking
    const calcularRanking = (notas: any, promedio: number) => {
        const materiasAprobadasSet = new Set<string>();
        const materiasCursadasSet = new Set<string>();

        // Recorremos todas las carreras
        const carreras = Object.keys(materiasXCarrera) as Array<keyof typeof materiasXCarrera>;

        carreras.forEach(carrera => {
            const { materias, optativas } = materiasXCarrera[carrera];
            const materiasHelper = getHelper(carrera);

            materiasHelper.forEach((materia) => {
                const notasMateria = notas[materia.codigo] || [];

                // Contamos las materias aprobadas
                if (notasMateria.some((nota: number) => nota >= 4)) {
                    materiasAprobadasSet.add(materia.codigo.toString());
                }

                // Contamos las materias cursadas
                if (notasMateria.length > 0) {
                    materiasCursadasSet.add(materia.codigo.toString());
                }
            });
        });

        const totalMateriasAprobadas = materiasAprobadasSet.size;
        const totalMateriasCursadas = materiasCursadasSet.size;

        const A = calcularValorA(totalMateriasAprobadas, totalMateriasCursadas);
        const B = calcularValorB(totalMateriasAprobadas);
        const C = calcularValorC(promedio);
        const D = calcularValorD(notas);

        return A + B + C + D;
    };

    return (
        <div className={styles.grid}>
            <div className={styles.infoGeneral}>
                <InformacionGeneral />
            </div>
            <div className={styles.barrasProgreso}>
                <BarrasProgreso getProgreso={getProgreso} />
            </div>
            <div className={styles.calculoPromedio}>
                <PromedioRanking promedio={promedio} ranking={calcularRanking(notas, promedio)} />
            </div>
            <div className={styles.recomendacionMaterias}>
                <RecomendacionMaterias />
            </div>
        </div>
    );
};

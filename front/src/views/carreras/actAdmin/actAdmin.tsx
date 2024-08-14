import { Materia } from "../../../components/materia/materia"
import { actuarioAdmin } from "../../../helpers/actuarioAdmin"
import style from "./actAdmin.module.css"
import { useMateriasStore } from "../../../store/useMateriasStore";

export const ActAdmin = () => {
    const materiasNotas = useMateriasStore((state) => state.notas);

    const optativasAprobadas = actuarioAdmin.reduce((count, materia) => {
        const notas = materiasNotas[materia.codigo] || [];
        if (materia.esOptativa && notas.some(nota => nota >= 4)) {
            count++
        }
        return count
    }, 0)

    return (
        <div>
            <h2>Materias de Actuario en Administración</h2>
            <div className={style.container}>
                {actuarioAdmin.map(materia => {
                    return <Materia key={materia.codigo} codigo={materia.codigo} nombre={materia.nombre} cargaHoraria={materia.cargaHorariaSemanal} correlativas={materia.correlativas} esOptativa={materia.esOptativa} optativas={2} optativasAprobadas={optativasAprobadas}/>
                })}
            </div>
        </div>
    )
}
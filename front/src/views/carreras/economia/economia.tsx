import { Materia } from "../../../components/materia/materia"
import { economia } from "../../../helpers/economia"
import style from "./economia.module.css"
import { useMateriasStore } from "../../../store/useMateriasStore";

export const Economia = () => {
    const materiasNotas = useMateriasStore((state) => state.notas);

    const optativasAprobadas = economia.reduce((count, materia) => {
        const notas = materiasNotas[materia.codigo] || [];
        if (materia.esOptativa && notas.some(nota => nota >= 4)) {
            count++
        }
        return count
    }, 0)

    return (
        <div>
            <h2>Materias de Economía</h2>
            <div className={style.container}>
                {economia.map(materia => {
                    return <Materia key={materia.codigo} codigo={materia.codigo} nombre={materia.nombre} cargaHoraria={materia.cargaHorariaSemanal} correlativas={materia.correlativas} esOptativa={materia.esOptativa} optativas={3} optativasAprobadas={optativasAprobadas}/>
                })}
            </div>
        </div>
    )
}
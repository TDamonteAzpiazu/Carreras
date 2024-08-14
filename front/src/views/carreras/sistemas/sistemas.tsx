import { Materia } from "../../../components/materia/materia"
import { sistemas } from "../../../helpers/sistemas"
import style from "./sistemas.module.css"
import { useMateriasStore } from "../../../store/useMateriasStore";

export const Sistemas = () => {
    const materiasNotas = useMateriasStore((state) => state.notas);

    const optativasAprobadas = sistemas.reduce((count, materia) => {
        const notas = materiasNotas[materia.codigo] || [];
        if (materia.esOptativa && notas.some(nota => nota >= 4)) {
            count++
        }
        return count
    }, 0)

    return (
        <div>
            <h2>Materias de Sistemas</h2>
            <div className={style.container}>
                {sistemas.map(materia => {
                    return <Materia key={materia.codigo} codigo={materia.codigo} nombre={materia.nombre} cargaHoraria={materia.cargaHorariaSemanal} correlativas={materia.correlativas} esOptativa={materia.esOptativa} optativas={1} optativasAprobadas={optativasAprobadas}/>
                })}
            </div>
        </div>
    )
}
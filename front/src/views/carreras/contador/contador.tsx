import { Materia } from "../../../components/materia/materia"
import { contador } from "../../../helpers/contador"
import style from "./contador.module.css"
import { useMateriasStore } from "../../../store/useMateriasStore";

export const Contador = () => {
    const materiasNotas = useMateriasStore((state) => state.notas);

    const optativasAprobadas = contador.reduce((count, materia) => {
        const notas = materiasNotas[materia.codigo] || [];
        if (materia.esOptativa && notas.some(nota => nota >= 4)) {
            count++
        }
        return count
    }, 0)

    return (
        <div>
            <h2>Materias de Contador</h2>
            <div className={style.container}>
                {contador.map(materia => {
                    return <Materia key={materia.codigo} codigo={materia.codigo} nombre={materia.nombre} cargaHoraria={materia.cargaHorariaSemanal} correlativas={materia.correlativas} esOptativa={materia.esOptativa} optativas={2} optativasAprobadas={optativasAprobadas}/>
                })}
            </div>
        </div>
    )
}
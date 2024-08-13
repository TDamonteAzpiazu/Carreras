import { Materia } from "../../../components/materia/materia"
import { sistemas } from "../../../helpers/sistemas"
import style from "./sistemas.module.css"

export const Sistemas = () => {
    return (
        <div>
            <h2>Materias de Sistemas</h2>
            <div className={style.container}>
                {sistemas.map(materia => {
                    return <Materia key={materia.codigo} codigo={materia.codigo} nombre={materia.nombre} cargaHoraria={materia.cargaHorariaSemanal} correlativas={materia.correlativas} />
                })}
            </div>
        </div>
    )
}
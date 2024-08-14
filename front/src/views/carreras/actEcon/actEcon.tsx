import { Materia } from "../../../components/materia/materia"
import { actuarioEcon } from "../../../helpers/actuarioEcon"
import style from "./actEcon.module.css"

export const ActEcon = () => {
    return (
        <div>
            <h2>Materias de Actuario en Economía</h2>
            <div className={style.container}>
                {actuarioEcon.map(materia => {
                    return <Materia key={materia.codigo} codigo={materia.codigo} nombre={materia.nombre} cargaHoraria={materia.cargaHorariaSemanal} correlativas={materia.correlativas} />
                })}
            </div>
        </div>
    )
}
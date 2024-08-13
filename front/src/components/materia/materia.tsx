import style from "./materia.module.css"

interface MateriaProps {
    codigo: number
    nombre: string
    cargaHoraria: number
    correlativas: number[]
}

export const Materia: React.FC<MateriaProps> = ({ codigo , nombre, cargaHoraria, correlativas}) => {
    return (
        <div className={style.card}>
            <h3>{nombre}</h3>
            <p>Codigo: {codigo}</p>
            <p>Carga Horaria: {cargaHoraria}</p>
            <p>Correlativas: {correlativas}</p>
        </div>
    )
}
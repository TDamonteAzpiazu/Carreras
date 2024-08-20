import { useMateriasStore } from "../../store/useMateriasStore"

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

    return (
        <div>
            <h3>Hola soy Home y aca va a estar la info general de la pag</h3>
            <h1>Promedio: {promedio}</h1>
        </div>
    )
}
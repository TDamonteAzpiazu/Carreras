import { sistemas } from "../../../helpers/sistemas";
import { actuarioAdmin } from "../../../helpers/actuarioAdmin";
import { actuarioEcon } from "../../../helpers/actuarioEcon";
import { admin } from "../../../helpers/admin";
import { contador } from "../../../helpers/contador";
import { economia } from "../../../helpers/economia";
import { useMateriasStore } from "../../../store/useMateriasStore";

interface RecomendacionMateriasProps {
  carrera: string;
}

export const RecomendacionMaterias = ({carrera} : RecomendacionMateriasProps) => {
  const notas = useMateriasStore((state) => state.notas);

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
  };

  const materiaAprobada = (codigoMateria: number): boolean => {
    const notasMateria = notas[codigoMateria];
    if (notasMateria && Array.isArray(notasMateria)) {
      return notasMateria.some((nota) => nota >= 4);
    }
    return false;
  };

  const todasCorrelativasAprobadas = (materia: any): boolean => {
    return materia.correlativas.every((codigoCorrelativa: number) =>
      materiaAprobada(codigoCorrelativa)
    );
  };

  const calcularPuntajeMateria = (codigoMateria: number, materiasCarrera: any[]): number => {
    const materiasDependientes = materiasCarrera.filter((materia) =>
      materia.correlativas.includes(codigoMateria)
    );

    if (materiasDependientes.length === 0) return 0;

    let puntaje = 1;
    for (const materia of materiasDependientes) {
      puntaje += calcularPuntajeMateria(materia.codigo, materiasCarrera);
    }

    return puntaje;
  };

  const obtenerMateriasOrdenadasPorPuntaje = (carrera: string) => {
    const materiasCarrera = getHelper(carrera);

    const materiasNoAprobadas = materiasCarrera.filter((materia) =>
      !materiaAprobada(materia.codigo) && todasCorrelativasAprobadas(materia)
    );

    const materiasConPuntaje = materiasNoAprobadas.map((materia) => {
      const puntaje = calcularPuntajeMateria(materia.codigo, materiasCarrera);
      return { ...materia, puntaje };
    });

    return materiasConPuntaje.sort((a, b) => b.puntaje - a.puntaje);
  };

  const materiasRecomendadas = obtenerMateriasOrdenadasPorPuntaje(carrera);
  const materiasAMostrar = materiasRecomendadas.slice(0, 3);

  return (
    <div>
      <h3>Recomendaciones</h3>
        {materiasAMostrar.map((materia) => (
          <li key={materia.codigo}>{materia.nombre}</li>
        ))}
    </div>
  );
};

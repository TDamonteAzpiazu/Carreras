import React, { useState } from 'react';
import { sistemas } from "../../../helpers/sistemas";
import { actuarioAdmin } from "../../../helpers/actuarioAdmin";
import { actuarioEcon } from "../../../helpers/actuarioEcon";
import { admin } from "../../../helpers/admin";
import { contador } from "../../../helpers/contador";
import { economia } from "../../../helpers/economia";
import { useMateriasStore } from "../../../store/useMateriasStore";
import styles from "./recomendarMaterias.module.css";

export const RecomendacionMaterias = () => {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState<string>('sistemas');
  const [cantidadMaterias, setCantidadMaterias] = useState<number>(3);
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

  const materiasRecomendadas = obtenerMateriasOrdenadasPorPuntaje(carreraSeleccionada);
  const materiasAMostrar = materiasRecomendadas.slice(0, cantidadMaterias);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Recomendaciones</h3>
      
      {/* Input para seleccionar la carrera */}
      <label>
        Selecciona una carrera:
        <select 
          value={carreraSeleccionada} 
          onChange={(e) => setCarreraSeleccionada(e.target.value)}
          className={styles.inputField}
        >
          <option value="sistemas">Sistemas</option>
          <option value="actuarioEconomia">Actuario Economía</option>
          <option value="actuarioAdministracion">Actuario Administración</option>
          <option value="economia">Economía</option>
          <option value="administracion">Administración</option>
          <option value="contador">Contador</option>
        </select>
      </label>

      {/* Reemplaza el input de cantidad de materias por un select */}
      <label>
        Cantidad de materias a recomendar (1-6):
        <select 
          value={cantidadMaterias} 
          onChange={(e) => setCantidadMaterias(Number(e.target.value))}
          className={styles.inputField}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </label>

      <div className={styles.materiasContainer}>
        {materiasAMostrar.map((materia) => (
          <div className={styles.materias}>
            <h3>{materia.nombre}</h3>
            <p>{materia.codigo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

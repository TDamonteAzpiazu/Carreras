import styles from './informacionGeneral.module.css';

export const InformacionGeneral = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Información General</h1>
            
            <section className={styles.section}>
                <h2>¿Cómo usar esta página?</h2>
                <p>
                    Esta página está diseñada para ayudar a los estudiantes a seleccionar las materias que cursarán en el próximo cuatrimestre y para mostrarles su promedio y ranking académico. Las recomendaciones se basan en el impacto que cada materia tiene en el progreso académico, teniendo en cuenta las correlatividades. Completa todas tus notas, tanto aprobadas como desaprobadas, para ver recomendaciones precisas, así como tu promedio y ranking actualizado.
                </p>
            </section>
            
            <section className={styles.section}>
                <h2>¿Por qué creé esta aplicación?</h2>
                <p>
                    Creé esta aplicación para simplificar la elección de materias para los estudiantes, ya que muchas veces resulta difícil identificar cuáles materias conviene cursar. Además, era un proyecto entretenido para desarrollar.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Detalles</h2>
                <p>
                    La página guarda tus notas en el LocalStorage de tu computadora, para que no las tengas que cargar cada vez que recargas la página. Abajo de todo hay un botón por si no quieres que se guarden.
                </p>
            </section>
        </div>
    );
};

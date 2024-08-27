import styles from './informacionGeneral.module.css';

export const InformacionGeneral = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Información General</h1>
            
            <section className={styles.section}>
                <h2>¿Cómo usar esta página?</h2>
                <p>
                    La idea de esta página es ayudar a los estudiantes a elegir qué materias cursar en el próximo cuatrimestre y mostrarle cuál es su promedio y ranking.
                    Las recomendaciones se basan en cuántos cuatrimestres tiene para adelante cada materia segun correlatividades.
                    Recién al completar todas las notas(aprobados y desaprobados), se va a ver el promedio, ranking y recomendaciones reales.
                </p>
            </section>
            
            <section className={styles.section}>
                <h2>¿Por qué creé esta aplicación?</h2>
                <p>
                    Creo que al principio a la gente le cuesta ver qué materias puede o le conviene hacer y cuáles no, asique fue un poco para ayudar a esa gente.
                    Y un poco porque estaba aburrido y no sabía que hacer como proyecto de programación.
                </p>
            </section>
            
            <section className={styles.section}>
                <h2>Contacto</h2>
                <p>
                    X si alguno tiene ganas de contratarme
                </p>
                <ul>
                    <li>Email: <a href="mailto:tobidamonte@gmail.com">tobidamonte@gmail.com</a></li>
                    <li>LinkedIn: <a href="https://www.linkedin.com/in/tobiasdamonteazpiazu/" target="_blank" rel="noopener noreferrer">Tobías Damonte Azpiazu</a></li>
                </ul>
            </section>
        </div>
    );
};

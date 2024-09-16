import { useEffect, useState } from 'react';

export const ProgressBar = ({ progreso }: { progreso: number }) => {
    const [displayProgress, setDisplayProgress] = useState(0);

    // Usa un efecto para animar la barra de progreso cuando el componente se monta
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayProgress(progreso);
        }, 100); // Pequeño retraso para la animación
        return () => clearTimeout(timer); // Limpieza del timeout
    }, [progreso]);

    // Función que calcula el color basado en el progreso
    const getProgressColor = (percentage: number) => {
        const r = Math.floor(241 - (percentage * (241 - 39)) / 100); // Va de 241 (amarillo) a 39 (verde)
        const g = Math.floor(196 + (percentage * (174 - 196)) / 100); // Va de 196 (amarillo) a 174 (verde)
        const b = 15; // Mantener el componente azul constante

        return `rgb(${r}, ${g}, ${b})`;
    };

    const progressStyle: React.CSSProperties = {
        width: `${displayProgress}%`, // Usa el progreso animado
        backgroundColor: getProgressColor(displayProgress), // Color cambia basado en el progreso
        height: '1.5rem',
        borderRadius: '0.75rem',
        textAlign: 'center', // Alinea el texto al centro
        color: 'white',
        lineHeight: '1.5rem', // Centra verticalmente el texto
        marginBottom: '0.625rem',
        marginTop: '0.625rem',
        transition: 'width 1s ease-in-out, background-color 1s ease-in-out', // Animación suave tanto en el ancho como en el color
    };

    return (
        <div style={{ width: '100%', backgroundColor: '#b3b3b1', borderRadius: '0.75rem' }}>
            <div style={progressStyle}>
                {`${displayProgress}%`} 
            </div>
        </div>
    );
};

export const ProgressBar = ({ progreso }: { progreso: number }) => {
    const progressStyle: React.CSSProperties = {
        width: progreso > 0 ? `${progreso}%` : '0', // Evita mostrar la barra si progreso es 0
        backgroundColor: progreso > 0 ? '#4caf50' : 'transparent', // Solo muestra color si hay progreso
        height: '1.5rem',
        borderRadius: '0.75rem',
        textAlign: progreso === 0 ? 'left' : 'center', // Alinea el texto a la izquierda
        paddingLeft: '0.5rem', // Espaciado interno para el texto
        color: 'white',
        lineHeight: '1.5rem', // Centra verticalmente el texto
        marginBottom: '0.625rem',
        marginTop: '0.625rem',
    };

    return (
        <div style={{ width: '100%', backgroundColor: '#b3b3b1', borderRadius: '0.75rem' }}>
            <div style={progressStyle}>
                {`${progreso}%`} 
            </div>
        </div>
    );
};

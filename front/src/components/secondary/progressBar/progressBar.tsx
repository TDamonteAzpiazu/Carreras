export const ProgressBar = ({ progreso } : { progreso: number }) => {
    const progressStyle : React.CSSProperties = {
        width: `${progreso}%`,
        backgroundColor: '#4caf50',
        height: '1.5rem',
        borderRadius: '0.75rem',
        textAlign: 'center',
        color: 'white',
        lineHeight: '1.5rem',
        marginBottom: '0.625rem',
        marginTop: '0.625rem',
    };

    return (
        <div style={{ width: '100%', backgroundColor: '#b3b3b1', borderRadius: '0.75rem' }}>
            <div style={progressStyle}>{`${progreso}%`}</div>
        </div>
    );
};
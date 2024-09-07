import style from './codigoColores.module.css';

export const CodigoColores = () => {

    return (
        <div className={style.colorCoding}>
        <span className={style.colorItem} style={{ color: '#4caf50' }}>
          <span className={style.colorCircle} style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}></span>
          Materias aprobadas
        </span>
        <span className={style.colorItem} style={{ color: '#f44336' }}>
          <span className={style.colorCircle} style={{ backgroundColor: '#f44336', borderColor: '#f44336' }}></span>
          Materias desaprobadas
        </span>
        <span className={style.colorItem} style={{ color: '#f4e300' }}>
          <span className={style.colorCircle} style={{ backgroundColor: '#f4e300', borderColor: '#f4e300' }}></span>
          Materias desbloqueadas
        </span>
        <span className={style.colorItem} style={{ color: '#9e9e9e' }}>
          <span className={style.colorCircle} style={{ backgroundColor: '#bdbdbd', borderColor: '#bdbdbd' }}></span>
          Materias bloqueadas
        </span>
        <span className={style.colorItem} style={{ color: '#4caf50' }}>
          <span className={style.colorCircle} style={{ backgroundColor: '#a5d6a7', borderColor: '#a5d6a7' }}></span>
          Electivas requeridas completadas
        </span>
      </div>
    )
}
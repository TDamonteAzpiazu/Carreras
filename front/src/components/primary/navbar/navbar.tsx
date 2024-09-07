import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdownAndNavigate = (path: string) => {
        setIsDropdownOpen(false);
        navigate(path);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link to='/'><button>Home</button></Link>
            </div>
            <div className={styles.right}>
                <div className={styles.carreras}>
                    <Link to='/sistemas'><button>Sistemas</button></Link>
                    <Link to='/actuarioEconomia'><button>Actuario Econ</button></Link>
                    <Link to='/actuarioAdministracion'><button>Actuario Admin</button></Link>
                    <Link to='/economia'><button>Economía</button></Link>
                    <Link to='/administracion'><button>Administración</button></Link>
                    <Link to='/contador'><button>Contador</button></Link>
                </div>
                <div className={styles.dropdownContainer}>
                    <button onClick={toggleDropdown}>Carreras</button>
                    {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <button onClick={() => closeDropdownAndNavigate('/sistemas')}>Sistemas</button>
                            <button onClick={() => closeDropdownAndNavigate('/actuarioEconomia')}>Actuario Econ</button>
                            <button onClick={() => closeDropdownAndNavigate('/actuarioAdministracion')}>Actuario Admin</button>
                            <button onClick={() => closeDropdownAndNavigate('/economia')}>Economía</button>
                            <button onClick={() => closeDropdownAndNavigate('/administracion')}>Administración</button>
                            <button onClick={() => closeDropdownAndNavigate('/contador')}>Contador</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

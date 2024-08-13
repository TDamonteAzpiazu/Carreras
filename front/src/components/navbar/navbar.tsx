import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div>
            <Link to='/'><button>Home</button></Link>
            <Link to='/sistemas'><button>Sistemas</button></Link>
            <Link to='/actuarioEconomia'><button>Actuario en Economía</button></Link>
            <Link to='/actuarioAdministracion'><button>Actuario en Administración</button></Link>
            <Link to='/economia'><button>Economía</button></Link>
            <Link to='/administracion'><button>Administración</button></Link>
            <Link to='/contador'><button>Contador</button></Link>
        </div>
    )
}
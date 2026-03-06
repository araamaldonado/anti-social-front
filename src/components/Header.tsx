import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import { useContext, useState } from "react";
import { Home, UserRound, LogOut} from "lucide-react";
import "../styles/header.css"
import { UserContext } from "../context/UserContext";
import TemaBoton from "./TemaBoton";

export default function Header() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null);
        navigate("/");
    };


    return (
        <header className="header">
            <div className="nav-container">
                <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                <img
                    src={logo}
                    alt="Logo"
                    className="nav-logo"
                    onClick={() => navigate("/home")}
                />

                <h4 className="text-center">
                    ¡Hola, <Link to="/profile"><i className="nickname">
                    {user?.nickname}
                    </i></Link>!
                </h4>

                <div className="nav-right">
                    {!user ? (
                        <div className="nav-right">
                        <nav className={`nav-icons ${menuOpen ? "open" : ""}`}>
                            <TemaBoton/>
                            <Link to="/">Inicia sesión</Link>
                        </nav>
                        </div>
                    )
                    : (
                    <div className="nav-right">
                        <nav className={`nav-icons ${menuOpen ? "open" : ""}`}>
                        <TemaBoton
                        />
                        <Home
                        className="nav-icon"
                        onClick={() => navigate("/home")}
                        size={26}
                        />
                        <UserRound
                        className="nav-icon"
                        onClick={() => navigate("/profile")}
                        size={26}
                        />
                        <LogOut
                        className="nav-icon logout"
                        onClick={handleLogout}
                        size={26}
                        />
                        </nav>
                    </div>
                    )
                    }
                </div>
            </div>
        </header>
    );
}
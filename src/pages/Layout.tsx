import { Link, Outlet } from "react-router-dom";
import { Aside } from "../components/Aside";
import { Footer } from "../components/Footer";
import "../styles/Layout.css"

export function Layout() {
    return (
        <div className="layout">
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Hem</Link></li>
                        <li><Link to="/about">Om</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
                    </ul>
                </nav>
            </header>
            <section>
                <aside>
                    <Aside />
                </aside>
                <main><Outlet /></main>
            </section>
            <footer><Footer /></footer>

            
        </div>        
    )
}
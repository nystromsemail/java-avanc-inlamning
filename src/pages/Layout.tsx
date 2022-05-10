import { Link, Outlet } from "react-router-dom";
import "../styles/Layout.css"

export function Layout() {
    return (
        <div className="layout">
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Hem</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <section>
                <aside>
                    <div>ASIDE</div>
                </aside>
                <main><Outlet /></main>
            </section>
            <footer>FOOTER</footer>

            
        </div>        
    )
}
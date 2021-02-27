import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

import Logo from "../../assets/logo-superlogica.svg";

const Main = props => {
    return (
        <>
            <div id="conteudo">
                <nav className="d-flex justify-content-center bg-dark p-4 shadow">
                    <Link to="/">
                        <img src={Logo} />
                    </Link>
                </nav>

                <div className="container">{props.children}</div>
            </div>

            <footer
                id="rodape"
                className="bg-dark text-light text-center py-2 shadow"
            >
                Desenvolvido para o teste da Superlógica
            </footer>
        </>
    );
};

export default Main;

import React from "react";

import "./style.css";

import Logo from "../../assets/logo-superlogica.svg";

const Main = props => {
    return (
        <>
            <div id="conteudo">
                <nav className="d-flex justify-content-center bg-dark p-4 shadow">
                    <a href="/">
                        <img src={Logo} />
                    </a>
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

import React from "react";

const Pagination = ({
    current_page,
    from,
    last_page,
    next_page_url,
    path,
    prev_page_url,
    to,
    total,
    mudaPagina
}) => {
    const gerarPaginas = () => {
        let links = [];

        for (let index = 1; index <= last_page; index++) {
            links.push(
                <li
                    className={
                        current_page === index
                            ? "page-item active"
                            : "page-item"
                    }
                    key={index}
                >
                    <button
                        className="page-link"
                        onClick={() => mudaPagina(`${path}?page=${index}`)}
                    >
                        {index}
                    </button>
                </li>
            );
        }

        return links;
    };

    return (
        <nav
            aria-label="Navegação"
            className="d-flex justify-content-between align-items-center"
        >
            <span className="">
                Exibindo de {from} até {to} - Total de registros: {total}
            </span>

            <ul className="pagination">
                <li
                    className={
                        prev_page_url ? "page-item" : "page-item disabled"
                    }
                >
                    <button
                        className="page-link"
                        onClick={() => mudaPagina(prev_page_url)}
                    >
                        Anterior
                    </button>
                </li>

                {gerarPaginas()}

                <li
                    className={
                        next_page_url ? "page-item" : "page-item disabled"
                    }
                >
                    <button
                        className="page-link"
                        onClick={() => mudaPagina(next_page_url)}
                    >
                        Próxima
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;

import React from "react";

const Filtro = ({ perPage, handlePerPage, filtro, handleFiltro }) => {
    return (
        <div className="form-inline d-flex justify-content-between mb-2">
            <div className="form-group">
                <label htmlFor="perpage" className="mr-1">
                    Por página
                </label>
                <select
                    defaultValue={perPage}
                    onChange={e => handlePerPage(e.target.value)}
                    className="form-control"
                    name="perpage"
                    id="perpage"
                >
                    <option value="5">5</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="filtro" className="mr-1">
                    Filtro
                </label>
                <input
                    className="form-control"
                    type="text"
                    name="filtro"
                    id="filtro"
                    value={filtro}
                    onChange={e => handleFiltro(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Filtro;

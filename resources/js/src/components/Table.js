import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { ConvertToReal } from "../util/locale";

const Table = ({ inventarios, excluir }) => {
    return (
        <table className="table table-striped table-hover table-sm">
            <thead className="thead-dark">
                <tr>
                    <th scope="col" className="align-middle text-center">
                        Código
                    </th>
                    <th
                        scope="col"
                        className="align-middle"
                        style={{ width: "50%" }}
                    >
                        Descrição
                    </th>
                    <th scope="col" className="align-middle text-center">
                        Qtd.
                    </th>
                    <th scope="col" className="align-middle">
                        Preço
                    </th>
                    <th
                        scope="col"
                        className="align-middle text-center"
                        style={{ width: "10%" }}
                    >
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody style={{ cursor: "pointer" }}>
                {inventarios.map(item => (
                    <tr key={item.id}>
                        <th scope="row" className="align-middle text-center">
                            {item.id}
                        </th>
                        <td className="align-middle">
                            {item.descricaoProduto}
                        </td>
                        <td className="align-middle text-center">
                            {item.qtdeProduto}
                        </td>
                        <td className="align-middle">
                            {ConvertToReal(item.precoProduto)}
                        </td>
                        <td className="align-middle text-center">
                            <Link
                                to={`/editar/${item.id}`}
                                className="btn btn-secondary btn-sm"
                            >
                                <FaEdit />
                            </Link>{" "}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => excluir(item)}
                            >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;

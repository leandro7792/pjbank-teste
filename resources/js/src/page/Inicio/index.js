import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaPrint } from "react-icons/fa";

import api from "../../services/api";
import Filtro from "../../components/Filtros";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

const Inicio = () => {
    const [data, setData] = useState({
        data: [],
        current_page: null,
        first_page_url: null,
        from: null,
        last_page: null,
        last_page_url: null,
        next_page_url: null,
        path: null,
        per_page: 20,
        prev_page_url: null,
        to: null,
        total: null,
        formAdd: false,
        formUpdate: false,
        itemSelecionado: false
    });

    const cookie_perpage = localStorage.getItem("per_page");
    const [porPagina, setPorPagina] = useState(
        cookie_perpage ? cookie_perpage : 20
    );

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        localStorage.setItem("per_page", porPagina);
        loadData();
    }, [porPagina]);

    const loadData = async (url = "/inventarios") => {
        const params = { per_page: porPagina };
        if (filtro) params.filtro = filtro;

        const inventarios = await api.get(url, {
            params
        });
        await setData({ ...inventarios.data });
    };

    const excluir = async item => {
        const pergunta = `Deseja realmente excluir o item ${item.descricaoProduto}?`;
        if (confirm(pergunta)) {
            await api.delete(`/inventarios/${item.id}`);
            loadData();
        }
    };

    const boleto = async () => {
        try {
            const boleto = await api.get("/boleto");

            const { url, dados } = boleto.data;
            const response = await api.post(url, dados);

            window.open(response.data.linkBoleto);
        } catch (error) {
            alert("Ocorreu um erro inesperado");
        }
    };

    const [filtro, setFiltro] = useState("");
    useEffect(() => {
        loadData();
    }, [filtro]);

    return (
        <>
            <div className="py-4 my-4 d-flex justify-content-between align-items-center border-bottom">
                <h2>Controle de Inventário</h2>

                <div className="d-flex">
                    <Link
                        to="/adicionar"
                        className="btn btn-primary btn-lg d-flex align-items-center mr-1"
                    >
                        <FaPlus /> Adicionar
                    </Link>
                    <button
                        className="btn btn-success btn-lg d-flex align-items-center"
                        onClick={boleto}
                    >
                        <FaPrint className="mr-1" /> Boleto
                    </button>
                </div>
            </div>

            <Filtro
                perPage={porPagina}
                handlePerPage={setPorPagina}
                filtro={filtro}
                handleFiltro={setFiltro}
            />

            <Table inventarios={data.data} excluir={excluir} />

            <Pagination {...data} mudaPagina={loadData} />
        </>
    );
};

export default Inicio;

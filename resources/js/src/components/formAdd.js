import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { realToDouble } from "../util/locale";
import api from "../services/api";

import CurrencyInput from "./CurrencyInput";

const formAdd = ({ adicionar }) => {
    const [hasError, setHasError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const initialValues = {
        descricao: "",
        quantidade: "",
        valor: ""
    };

    const validationSchema = yup.object().shape({
        descricao: yup.string().required("A descrição é obrigatória"),
        quantidade: yup
            .number()
            .positive("O valor informado não é válido")
            .integer("O valor informado não é válido")
            .required("Campo obrigatório."),
        valor: yup.string().required("Campo obrigatório.")
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const { descricao, quantidade, valor } = values;

        try {
            await api.post("/inventarios", {
                descricaoProduto: descricao,
                qtdeProduto: quantidade,
                precoProduto: realToDouble(valor)
            });

            setRedirect(true);
        } catch (error) {
            const { data, status } = error.response;

            let msg = [];

            if (status === 422) {
                if (data.descricaoProduto) msg.push(data.descricaoProduto);
                if (data.qtdeProduto) msg.push(data.qtdeProduto);
                if (data.precoProduto) msg.push(data.precoProduto);
            } else {
                msg.push(`Um erro desconhecido ocorreu - Code ${status}`);
            }

            setHasError(msg);
        }

        setSubmitting(false);
    };

    return (
        <>
            {redirect && <Redirect to="/" />}

            {hasError && (
                <div className="p-4 bg-danger text-white text-center">
                    {hasError}
                </div>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                render={formProps => (
                    <Form>
                        <fieldset disabled={formProps.isSubmitting}>
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="descricao"
                                    id="descricao"
                                    placeholder="Descrição detalhada do item"
                                />
                                <ErrorMessage
                                    className="text-danger"
                                    component="div"
                                    name="descricao"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantidade">Quantidade</label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    name="quantidade"
                                    id="quantidade"
                                    min="1"
                                />
                                <ErrorMessage
                                    className="text-danger"
                                    component="div"
                                    name="quantidade"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="valor">Valor</label>
                                <Field
                                    name="valor"
                                    render={({ field }) => {
                                        return (
                                            <CurrencyInput
                                                {...field}
                                                className="form-control"
                                                id="valor"
                                                placeholder="R$ 0,00"
                                            />
                                        );
                                    }}
                                />

                                <ErrorMessage
                                    className="text-danger"
                                    component="div"
                                    name="valor"
                                />
                            </div>

                            <div className="mt-5 py-4 d-flex justify-content-around border">
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary"
                                >
                                    Adicionar
                                </button>
                                <Link
                                    to="/"
                                    className="btn btn-secondary btn-lg d-flex align-items-center"
                                >
                                    Cancelar
                                </Link>
                            </div>
                        </fieldset>
                    </Form>
                )}
            />
        </>
    );
};

export default formAdd;

import React, { useState, useEffect } from "react";

import api from "../../services/api";
import FormUpdate from "../../components/formUpdate";

const Adicionar = props => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        const { id } = props.match.params;
        (async () => {
            const reponse = await api.get(`/inventarios/${id}`);
            setItem(reponse.data);
        })();
    }, []);

    return (
        <>
            <div className="py-4 my-4 border-bottom">
                <h2>Editar item</h2>
            </div>

            {item && <FormUpdate item={item} />}
        </>
    );
};

export default Adicionar;

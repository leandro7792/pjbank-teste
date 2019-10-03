export const ConvertToReal = valor => {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

export const realToDouble = valor => {
    return valor
        .substr(3, valor.length)
        .replace(/\./g, "")
        .replace(",", ".");
};

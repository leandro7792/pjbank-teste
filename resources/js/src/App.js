import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./page/Main/";

import Inicio from "./page/Inicio/";
import Adicionar from "./page/Adicionar/";
import Editar from "./page/Editar/";

const App = () => {
    return (
        <Main>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Inicio} />
                    <Route path="/adicionar" component={Adicionar} />
                    <Route path="/editar/:id" component={Editar} />
                </Switch>
            </BrowserRouter>
        </Main>
    );
};

export default App;

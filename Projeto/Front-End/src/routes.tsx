import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import VacanciesList from "./pages/VacanciesList";
import VacanciesForm from "./pages/VacanciesForm";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/vacancies" component={VacanciesList} />
      <Route path="/register" component={VacanciesForm} />
    </BrowserRouter>
  );
}

export default Routes;

import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Vacancie } from "../../components/VacananciesItem";
import Select from "../../components/Select";

import "./styles.css";
import api from "../../services/api";

function VacanciesList() {
  const [vacancies, setVacancies] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day] = useState("0");
  const [time] = useState("00:00");

  console.log(time);

  async function search(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("vacancy", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setVacancies(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estas são as vagas Disponíveis">
        <form id="search-teachers" onSubmit={search}>
          <Select
            name="suject"
            label="Vagas"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[{ value: "Estágio", label: "Estágio" }]}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {vacancies.map((vacancie: Vacancie) => {
          return <TeacherItem key={vacancie.id} vacancies={vacancie} />;
        })}
      </main>
    </div>
  );
}

export default VacanciesList;

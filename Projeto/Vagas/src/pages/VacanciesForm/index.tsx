import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import api from "../../services/api";

function VacanciesForm() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems] = useState([
    { week_day: 0, from: "00:00", to: "23:59" },
  ]);

  function handleCreateClass(e: FormEvent) {
    // Ele vai prevenir o comportamento padrão de um formúlario, evitando o reaload na página
    e.preventDefault();

    api
      .post("vacancy", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso !");

        history.push("/");
      })
      .catch((e) => {
        console.log(e);
        alert("Erro no cadastro, tente novamente !");
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer cadastrar vagas de emprego"
        description="O primeiro passo é prencher esse formulário de cadastro"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Dados da vaga</legend>

            <Input
              name="name"
              label="Vaga"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              name="avatar"
              label="logo da empresa"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />

            <Input
              name="whatsapp"
              label="Contato da empresa"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Descrição da vaga"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a Vaga</legend>

            <Select
              name="suject"
              label="Tipo da vaga"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              options={[{ value: "Estágio", label: "Estágio" }]}
            />
            <Input
              name="cost"
              label="Salário"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante ! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default VacanciesForm;

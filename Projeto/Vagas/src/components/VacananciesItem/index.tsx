import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

export interface Vacancie {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface VacananciesItemProps {
  vacancies: Vacancie;
}

const VacananciesItem: React.FC<VacananciesItemProps> = ({ vacancies }) => {
  return (
    <article className="teacher-item">
      <header>
        <img src={vacancies.avatar} alt={vacancies.name} />
        <div>
          <strong>{vacancies.name}</strong>
          <span>{vacancies.subject}</span>
        </div>
      </header>
      <p>{vacancies.bio}</p>

      <footer>
        <p>
          Sálario/Mês
          <strong>R$ {vacancies.cost}</strong>
        </p>

        <a
          target="_blank"
          href={`https://wa.me/${vacancies.whatsapp}?text=Eu%20tenho%20interesse%20nessa%20vaga`}
        >
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default VacananciesItem;

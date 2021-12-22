import React from "react";
import { Link } from "react-router-dom";

import landingImg from "../../assets/images/landing.svg";

import "./styles.css";

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <h2>Plataforma de vagas de emprego</h2>
        </div>
        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/vacancies" className="study">
            Vagas
          </Link>

          <Link to="/register" className="give-classes">
            Cadastrar vagas
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

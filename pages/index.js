import styled from "styled-components";
import { useState, useEffect } from "react";
import React from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/Commons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />

      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(prop) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {prop.title} ({prop.items.length})
      </h2>
      <ul>
        {prop.items
          .filter((item, index, arr) => index < 6)
          .map((itemAtual) => {
            console.log(itemAtual);

            return (
              <li key={itemAtual.id}>
                <a
                  href={`https://github.com/${itemAtual.login}`}
                  key={itemAtual.id}
                >
                  <img src={`https://github.com/${itemAtual.login}.png`} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            );
          })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = useState([
    {
      id: "01929838",
      titulo: "Eu odei Acordar Cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);
  const [seguidores, setSeguidores] = useState([]);

  function handleCriaComunidade(event) {
    event.preventDefault();
    const dadosDoForm = new FormData(event.target);

    dadosDoForm.get("title");
    dadosDoForm.get("image");

    const comunidade = {
      id: new Date().toDateString(),
      titulo: dadosDoForm.get("title"),
      image: dadosDoForm.get("image"),
    };
    setComunidades([...comunidades, comunidade]);
    console.log(event);
  }

  const githubUser = "VictorCmelo";

  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  useEffect(() => {
    fetch("https://api.github.com/users/victorCmelo/followers")
      .then(function (dado) {
        if (dado.ok) {
          return dado.json();
        }
        throw new Error("Deu erro:" + dado.status);
      })
      .then(function (dada) {
        setSeguidores(dada);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-vindo </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <form
              onSubmit={() => {
                handleCriaComunidade(event);
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  ariea-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  ariea-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.id}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas Favoritas ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

// Seletor da Seção About (section)
const about = document.querySelector("#about");

// Seletor da Seção Projects (Carrossel)
const swiperWrapper = document.querySelector(".swiper-wrapper");

// --- Função Sobre Mim ---
async function getAboutGitHub() {
  try {
    const resposta = await fetch("https://api.github.com/users/mc4rvalho");
    const perfil = await resposta.json();

    about.innerHTML = "";

    about.innerHTML = `
      <figure class="about-image">
        <img src="${perfil.avatar_url}" alt="Foto do perfil - ${perfil.name}">
      </figure>

      <article class="about-content">
        <h2>Sobre mim</h2>
        
        <p>
          ${perfil.bio ? perfil.bio : "Olá! Sou um desenvolvedor apaixonado por tecnologia."}
        </p>
        
        <p>
          Estou sempre em busca de novos desafios e aprendizados. 
          Atualmente focado em evoluir minhas habilidades no ecossistema JavaScript.
        </p>

        <div class="about-buttons-data">
          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="button">GitHub</a>
            <a href="#" class="button-outline">Currículo</a>
          </div>

          <div class="data-container">
            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>
            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>
          </div>
        </div>
      </article>
    `;
  } catch (error) {
    console.error("Erro ao buscar dados do Github:", error);
  }
}

// Chama a função About
getAboutGitHub();

// --- Função Projetos ---
async function getProjectsGitHub() {
  try {
    // Buscando 6 repositórios ordenados por atualização
    const resposta = await fetch(
      "https://api.github.com/users/mc4rvalho/repos?sort=updated&per_page=6",
    );
    const repositories = await resposta.json();

    swiperWrapper.innerHTML = "";

    const languages = {
      JavaScript: { icone: "javascript" },
      TypeScript: { icone: "typescript" },
      Python: { icone: "python" },
      Java: { icone: "java" },
      HTML: { icone: "html" },
      CSS: { icone: "css" },
      PHP: { icone: "php" },
      "C#": { icone: "csharp" },
      Go: { icone: "go" },
      Kotlin: { icone: "kotlin" },
      Swift: { icone: "swift" },
    };

    repositories.forEach((repository) => {
      // Verifica a linguagem, se for null usa 'GitHub'
      const languageShow = repository.language || "GitHub";
      // Busca o ícone no objeto, se não achar usa 'github'
      const config = languages[repository.language] || { icone: "github" };
      const urlIcon = `./assets/icons/languages/${config.icone}.svg`;

      // Descrição alternativa caso o repo não tenha descrição
      const description = repository.description
        ? repository.description
        : "Projeto desenvolvido para estudos e prática de programação.";

      // Monta o HTML do Card
      const html = `
        <div class="swiper-slide">
          <article class="project-card">
            <figure class="project-image">
              <img src="${urlIcon}" alt="Ícone ${languageShow}">
            </figure>

            <div class="project-content">
              <h3>${repository.name}</h3>
              <p>${description}</p>

              <div class="project-tags">
                <span class="tag">${languageShow}</span>
              </div>

              <div class="project-buttons">
                <a href="${repository.html_url}" target="_blank" class="button button-sm">GitHub</a>
                
                ${repository.homepage ? `<a href="${repository.homepage}" target="_blank" class="button-outline button-sm">Deploy</a>` : ""}
              </div>
            </div>
          </article>
        </div>
      `;

      // Adiciona o card ao wrapper
      swiperWrapper.innerHTML += html;
    });
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
  }
}

// Chama a função Projetos
getProjectsGitHub();

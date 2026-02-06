const about = document.querySelector("#about");

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

getAboutGitHub();

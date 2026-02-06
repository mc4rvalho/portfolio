// Seletor da Seção About (section)
const about = document.querySelector("#about");

// Seletor da Seção Projects (Carrossel)
const swiperWrapper = document.querySelector(".swiper-wrapper");

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

async function getProjectsGitHub() {
  try {
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
      const languageShow = repository.language || "GitHub";
      const config = languages[repository.language] || { icone: "github" };
      const urlIcon = `./assets/icons/languages/${config.icone}.svg`;

      const description = repository.description
        ? repository.description
        : "Projeto desenvolvido para estudos e prática de programação.";

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

      swiperWrapper.innerHTML += html;
    });

    iniciarSwiper();
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
  }
}

getProjectsGitHub();

function iniciarSwiper() {
  const swiperContainer = document.querySelector(".projects-swiper");
  if (swiperContainer.swiper) {
    swiperContainer.swiper.destroy(true, true);
  }

  new Swiper(".projects-swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    centeredSlides: false,
    loop: true,
    watchOverflow: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },

    grabCursor: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
  });
}

import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({appEl}) {

  // @TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appPost = posts.map((post) => {
                `
                  <li class="post">
                    <div class="post-header" data-user-id="${post.idUser}">
                        <img src="${post.imageUrlUser}">
                        <p class="post-header__user-name">${post.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrlUser}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.idPost}">
                        <img src="${post.imageUrlPost}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>2</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                     ${post.date}
                    </p>
                  </li>
                `
  })
   .join("");

   const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${appPost}
                </ul>
              </div>
  `

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

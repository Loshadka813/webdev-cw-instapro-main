import { renderHeaderComponent } from "./header-component.js";
import { posts } from "../index.js";
import { initLikePosts } from "./like-component.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderPostsPageComponent({ appEl }) {
  // @TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const appPost = posts.map((post) => {
    const date = new Date(post.date);
    const timeAgo = formatDistanceToNow(date, {
      addSuffix: true,
      locale: ru,
    })

    return ` <li class="post">
                    <div class="post-header" data-user-id="${post.idUser}">
                        <img src="${post.imageUrlUser}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.idPost}" class="like-button">
                        <img class="image-like" src="${post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>
                        ${Object.keys(post.likes).length}
                        </strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                     ${timeAgo}
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

  setTimeout(() => {
      initLikePosts();
    }, 0);
}

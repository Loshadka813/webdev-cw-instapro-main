import { getPosts, postPosts, getUserPosts } from "./api.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "./routes.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";
import { renderLoadingPageComponent } from "./components/loading-page-component.js";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "./helpers.js";

export let user = getUserFromLocalStorage();
export let page = null;
export let posts = [];

const getToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};

export const logout = () => {
  user = null;
  removeUserFromLocalStorage();
  goToPage(POSTS_PAGE);
};

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      /* Если пользователь не авторизован, то отправляем его на страницу авторизации перед добавлением поста */
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts({ token: getToken() })
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      // @@TODO: реализовать получение постов юзера из API
      page = LOADING_PAGE;
      posts = [];
      renderApp();

      return getUserPosts({ userId: data.userId, token: getToken() })
        .then((userPosts) => {
          page = USER_POSTS_PAGE;
          posts = userPosts;
          renderApp();
          console.log("Загружены посты пользователя:", userPosts);
        })
        .catch((error) => {
        console.error("Ошибка загрузки постов пользователя:", error);
        document.getElementById("app").innerHTML = `
        <div class="page-container">
          <p>Не удалось загрузить посты пользователя.</p>
          <button class="button" onclick="goToPage(POSTS_PAGE)">Назад к ленте</button>
        </div>
      `;
      });
      
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

const renderApp = () => {
  const appEl = document.getElementById("app");
  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        user = newUser;
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent({
      appEl,
      onAddPostClick({ description, imageUrl }) {

        // @TODO: реализовать добавление поста в API
        console.log("Добавляю пост...", { description, imageUrl });

        postPosts({
          description, 
          imageUrl, 
          token: getToken(),
        })
        .then(() => {
        return getPosts({ token: getToken() });
        })
        .then((newPosts) => {
          posts = newPosts;
          goToPage(POSTS_PAGE);
        })
        .catch((error) => {
          alert(`${error.message || "Не удалось добавить пост"}`);
          goToPage(ADD_POSTS_PAGE);
        });
      },
    });
  }

  if (page === POSTS_PAGE || page === USER_POSTS_PAGE) {
    renderPostsPageComponent({
      appEl,
    });
    appEl.addEventListener("click", onPostHeaderClick);
    return;
  }

  // if (page === USER_POSTS_PAGE) {
  //   // @TODO: реализовать страницу с фотографиями отдельного пользвателя
  //  return renderPostsPageComponent({ appEl });
  // }
};

goToPage(POSTS_PAGE);

function onPostHeaderClick(event) {
  const postHeader = event.target.closest(".post-header");
  if (postHeader) {
    const userId = postHeader.dataset.userId;
    if (userId) {
      goToPage(USER_POSTS_PAGE, { userId });
    }
  }
}

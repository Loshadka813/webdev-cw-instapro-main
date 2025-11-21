const personalKey = "marina-lebakina";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      const appPosts = data.posts.map((post) => {
        return {
          idPost: post.id,
          imageUrl: post.imageUrl,
          date: post.createdAt,
          description: post.description,
          idUser: post.user.id,
          name: post.user.name,
          imageUrlUser: post.user.imageUrl,
          likes: post.likes,
          isLiked: post.isLiked
        }
      })
      return appPosts;
    });
}

export function postPosts({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description: description,
      imageUrl: imageUrl,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

// Получение постов отдельного пользователя
export function getUserPosts({ userId, token }) {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      const appPosts = data.posts.map((post) => {
        return {
          idPost: post.id,
          imageUrl: post.imageUrl,
          date: post.createdAt,
          description: post.description,
          idUser: post.user.id,
          name: post.user.name,
          imageUrlUser: post.user.imageUrl,
          likes: post.likes,
          isLiked: post.isLiked
        }
      })
      return appPosts;
    });
}

// Поставить лайк
export function likePost({ postId, token }) {
  fetch(`${postsHost}/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      const likePost = data.posts.map((post) => {
        return {
          idPost: post.id,
          imageUrl: post.imageUrl,
          date: post.createdAt,
          description: post.description,
          idUser: post.user.id,
          name: post.user.name,
          imageUrlUser: post.user.imageUrl,
          likes: post.likes,
          isLiked: post.isLiked
        }
      })
      return likePost;
    });
}

// Убрать лайк
export function dislikePost({ postId, token }) {
  fetch(`${postsHost}/${postId}/dislike`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      const dislikePost = data.posts.map((post) => {
        return {
          idPost: post.id,
          imageUrl: post.imageUrl,
          date: post.createdAt,
          description: post.description,
          idUser: post.user.id,
          name: post.user.name,
          imageUrlUser: post.user.imageUrl,
          likes: post.likes,
          isLiked: post.isLiked
        }
      })
      return dislikePost;
    });
}
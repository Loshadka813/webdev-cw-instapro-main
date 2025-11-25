import { renderPostsPageComponent } from "./posts-page-component.js";
import { posts, getToken } from "../index.js";
import { getPosts, dislikePost, likePost } from "../api.js";

export function initLikePosts() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeElement) => {
    // Убедимся, что обработчик не висит дважды
    likeElement.removeEventListener("click", likeClick);
    likeElement.addEventListener("click", likeClick);
  });
}

function likeClick(event) {
  event.stopPropagation();

  const button = event.currentTarget;
  const imageLike = button.querySelector(".image-like");
  const postId = button.dataset.postId;
  const post = posts.find((p) => p.idPost === postId);

  if (!post) return;

  const wasLiked = post.isLiked;
  post.isLiked = !post.isLiked;
  imageLike.src = post.isLiked
    ? "./assets/images/like-active.svg"
    : "./assets/images/like-not-active.svg";

  const request = post.isLiked
    ? likePost({ postId, token: getToken() })
    : dislikePost({ postId, token: getToken() });

  request
    .then(() => {
      return getPosts({ token: getToken() });
    })
    .then((updatedPosts) => {
      posts.length = 0;
      posts.push(...updatedPosts);
      renderPostsPageComponent({ appEl: document.getElementById("app") });
      initLikePosts();
    })
    .catch((error) => {
      alert(error.message);
      post.isLiked = wasLiked;
      imageLike.src = wasLiked
        ? "./assets/images/like-active.svg"
        : "./assets/images/like-not-active.svg";
    });

}


import { renderPostsPageComponent } from "./posts-page-component.js";
import { posts } from "./postId.js";

export const initLikePosts = () => {
  for (const likeElement of document.querySelectorAll(".like-button")) {
    let imageLike = document.getElementById("image-like");
    const postId = likeElement.dataset.postId;

    if (posts[postId].isLiked) {
      imageLike.src = "./assets/images/like-active.svg";
    }

    likeElement.addEventListener("click", () => {
      if (posts[postId].isLiked) {
        posts[postId].likes--;
        posts[postId].isLiked = false;
        imageLike.src = "./assets/images/like-not-active.svg";
      } else {
        posts[postId].likes++;
        posts[postId].isLiked = true;
        imageLike.src = "./assets/images/like-active.svg";
      }

      renderPostsPageComponent();
    });
  }
};

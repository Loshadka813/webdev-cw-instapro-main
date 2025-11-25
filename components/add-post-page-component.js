import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const updateImageUrl = (newImageUrl) => {
    imageUrl = newImageUrl;
  };

  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
          </div>
          <label>
            Опишите фотографию: 
            <textarea 
            id="description-input" 
            class="input textarea" 
            rows="4"></textarea>
          </label>
        </div>
      </div>
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    
    renderUploadImageComponent({
      element: uploadImageContainer,
      onImageUrlChange: updateImageUrl,
    });
    

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.getElementById("description-input").value
      .trim()
      .replaceAll("<", "&lt")
      .replaceAll(">", "&gt");;

      if (!description) {
        alert("Введите описание картинки");
        return;
      }

      if (!imageUrl) {
        alert("Загрузите изображение");
        return;
      }

      onAddPostClick({
        description: description,
        imageUrl,
      });
    });
  };
  render();
}

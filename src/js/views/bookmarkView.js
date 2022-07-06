class bookmarkView {
  _parentElement = document.querySelector(".bookmarks-list");
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateBookmarkMarkup(data);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  removeAsideBookmarks(handler) {
    this._parentElement.innerHTML = "";
    handler();
  }

  addhandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const listItem = e.target.closest(".bookmarks-item-link");
      const user = listItem.dataset.username;

      if (!listItem) return;
      handler(user);
    });
  }

  addHandlerToggleBookmarkMenu(handler1, handler2) {
    const ham = document.querySelector(".hamburger-input");
    const bookmarks = document.querySelector(".bookmarks");
    const overlay = document.querySelector(".overlay");

    ham.addEventListener("click", function () {
      if (ham.checked) {
        handler1(bookmarks, overlay);
      } else {
        handler2(bookmarks, overlay);
      }
    });
    overlay.addEventListener("click", function () {
      handler2(bookmarks, overlay);
      ham.checked = !ham.checked;
    });
  }
  _generateBookmarkMarkup(data) {
    return `
    <a class="bookmarks-item-link" data-username=${this.#data.username}>
      <li class="bookmarks-item">
        <div class="bookmarksPic-box">
          <img src="${data.profilePic}" alt="" class="bookmarksPic" />
        </div>
        <div class="bookmarksDetails-box">
          <div class="buserID">${data.username}</div>
          <div class="bname">${data.name}</div>
        </div>
      </li>
    </a>
    `;
  }
}
export default new bookmarkView();

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
    this._parentElement.addEventListener("click", handler);
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

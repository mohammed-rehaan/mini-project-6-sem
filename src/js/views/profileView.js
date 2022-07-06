import view from "./view.js";

class ProfileView extends view {
  _parentElement = document.querySelector(".results-header");

  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup(data);
    console.log(this.#data);
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addhandler(handler1, handler2) {
    this._parentElement.addEventListener("click", function (e) {
      const bookmark_icon = document.querySelector(".bookmark-icon");
      if (!e.target.classList.contains("bookmark-icon")) return;

      if (bookmark_icon.name != "bookmark-outline") {
        bookmark_icon.setAttribute("name", "bookmark-outline");
        bookmark_icon.classList.remove("bookmark-icon-filled");
        handler1();
      } else {
        bookmark_icon.setAttribute("name", "bookmark");
        bookmark_icon.classList.add("bookmark-icon-filled");
        handler2();
      }
    });
  }
  renderBookmarkedID() {
    const markup = this._generateBookmarkMarkup();
  }

  renderError() {
    const markup = `<div class="error-box">
    <div class="error-icon">
      <ion-icon name="warning-outline" class="warning"></ion-icon>
    </div>
    <div class="error-msg">
      Hmm! Looks Like you have internet issue<br/>
      Check your connection and try again
    </div>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderUserError() {
    const markup = `<div class="error-box">
    <div class="error-icon">
      <ion-icon name="warning-outline" class="warning"></ion-icon>
    </div>
    <div class="error-msg">
      Arghh! Looks Like You searched for a user that does not exist. <br> Check the username and try again.
    </div>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = " ";
  }

  _formatDate(date) {
    const fullDate = new Date(date);
    return fullDate.toDateString();
  }

  _generateMarkup(data) {
    return `
        <ion-icon
          name="bookmark${data.is_bookmarked ? "" : "-outline"}"
          class="bookmark-icon bookmark-icon${
            data.is_bookmarked ? "-filled" : ""
          }"
        ></ion-icon>
        <div class="rprofileimagebox">
          <img src="${
            data.profilePic
          }" alt="Profile Picture" class="resultsImg" />
          <div class="follow-box">
            <div class="followers">
              <span class="followtext">Followers</span>
              <span class="follownum">${data.followers}</span>
            </div>
            <div class="seperator"></div>
            <div class="following">
              <span class="followtext">Following</span>
              <span class="follownum">${data.following}</span>
            </div>
          </div>
        </div>
        <div class="rinfo">
          <div class="idname">
            <span class="result-span rname">${data.name}</span>
            <span><a href="${
              data.profileLink
            }" target="blank" class="result-span ruserID">@${
      data.username
    }</a></span>
          </div>
          <span class="result-span remail"
            >${data.email ? data.email : "Email Not Provided"}</span
          >
          <span class="result-span bio">
            ${data.bio ? data.bio : "No Bio Found"}
          </span>
          <span class="result-span rjoinedAt">Joined on ${this._formatDate(
            data.created_at
          )}</span
          >
        </div>
        `;
  }
}
export default new ProfileView();

import view from "./view.js";
class RepositoriesView extends view {
  _parentElement = document.querySelector(".results-repos");
  #data;

  render(data) {
    this.#data = data;
    // console.log(data);
    const markup = this._generateMarkup(data);
    this._parentElement.innerHTML = "";

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      '<h3 class="repositories-heading">Repositories</h3>'
    );
  }
  renderError() {
    this._clear();
  }
  _clear() {
    this._parentElement.innerHTML = " ";
  }
  _generateMarkup(data) {
    return data
      .map((el) => {
        return `
        <a class="repo" href="${el.html_url}" target="blank">
          <div class="repo-head">
          <ion-icon
          name="folder-open-outline"
          class="repo-icon"
          ></ion-icon>
          <p class="repo-name">
          <span>${el.name}</span>
          <span class="public">public</span>
          </p>
          </div>
          <div class="repo-desc">
        <div class="languages-used">
          <ul class="languages-list">
            <li class="languages-item">Javascript</li>
            <li class="languages-item">CSS3</li>
            <li class="languages-item">HTML5</li>
            </ul>
        </div>
        <div class="repo-size">${el.size} KB</div>
      </div>
     </a>
  
  `;
      })
      .join("");
  }
}
export default new RepositoriesView();

import view from "./view.js";
class RepositoriesView extends view {
  _parentElement = document.querySelector(".results-repos");
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup(data);
    this._parentElement.innerHTML = "";
    // if (!markup) {
    //   renderNoRepos();
    //   return;
    // }
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      '<h3 class="repositories-heading">Repositories</h3>'
    );
  }
  renderError() {
    this._clear();
  }
  renderNoRepos() {
    markup = "<h2>No Repos Found</h2>";
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = " ";
  }
  _generateMarkup(data) {
    return data
      .map((el) => {
        return `
        <a class="repo"  href="${el.html_url}" target="blank">
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
        <!--
          <div class="languages-used">
            <ul class="languages-list">
              <div class="language">
                <span class="dot"></span>
                <span class="langtext">Javascript</span>
              </div>
              
              <div class="language">
                <span class="dot"></span>
                <span class="langtext">CSS</span>
              </div>
              
              <div class="language">
                <span class="dot"></span>
                <span class="langtext">HTML</span>
              </div>
              
            </ul>
          </div>
          -->
          <div class="repo-size">${el.size} KB</div>
        </div>
      </a>

  `;
      })
      .join("");
  }

  _generatelang() {}
}
export default new RepositoriesView();

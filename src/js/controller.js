import * as model from "./model.js";
import bookmarkView from "./views/bookmarkView.js";
import profileView from "./views/profileView.js";
import repositoriesView from "./views/repositoriesView.js";
import searchView from "./views/searchView.js";

const controlProfile = async function (userName) {
  try {
    profileView.renderSpinner(profileView._parentElement);
    repositoriesView.renderSpinner(repositoriesView._parentElement);
    await model.fetchData(`https://api.github.com/users/${userName}`, userName);
    await model.fetchRepos();
    // await model.fetchLang();
    if (!model.state.results.profile.username) {
      profileView.renderUserError();
      repositoriesView.renderError();
      return;
    }
    profileView.render(model.state.results.profile);
    repositoriesView.render(model.state.results.repos);

    // adding Handler for bookmark-icon
    // bookmarkView.addhandler(controlBookmarks);
  } catch (err) {
    profileView.renderError();
    repositoriesView.renderError();
  }
};
const controlSearch = function (val) {
  const userName = val;
  if (!userName) return;

  controlProfile(val);
};
const controlBookmarkIconToggling = function (e) {
  const bookmark_icon = document.querySelector(".bookmark-icon");
  const results_header = document.querySelector(".results-header");
  if (!e.target.classList.contains("bookmark-icon")) return;

  // Toggling bookmarks icon     filled > outline > filled
  if (bookmark_icon.name != "bookmark-outline") {
    // results_header.classList.add("white-border");
    bookmark_icon.setAttribute("name", "bookmark-outline");
    bookmark_icon.classList.remove("bookmark-icon-filled");
    model.deleteBookmark(model.state.results.profile.username);
    bookmarkView.removeAsideBookmarks(updateAsideBookmarks);
  } else {
    bookmark_icon.setAttribute("name", "bookmark");
    bookmark_icon.classList.add("bookmark-icon-filled");
    model.addBookmark(model.state.results.profile);
    bookmarkView.render(model.state.results.profile);
  }
};

const bookmarksClick = function (e) {
  const listItem = e.target.closest(".bookmarks-item-link");
  if (!listItem) return;
  const user = listItem.dataset.username;
  controlProfile(user);
};

const updateAsideBookmarks = function () {
  model.state.bookmarks.map((bookmark) => bookmarkView.render(bookmark));
};

const init = function () {
  searchView.addhandler(controlSearch);
  profileView.addhandler(controlBookmarkIconToggling);
  bookmarkView.addhandler(bookmarksClick);
};
init();

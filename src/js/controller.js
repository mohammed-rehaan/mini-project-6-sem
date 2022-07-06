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

    if (!model.state.results.profile.username) {
      profileView.renderUserError();
      repositoriesView.renderError();
      return;
    }
    profileView.render(model.state.results.profile);
    repositoriesView.render(model.state.results.repos);
  } catch (err) {
    profileView.renderError();
    repositoriesView.renderError();
  }
};
const controlSearch = function (val) {
  controlProfile(val);
};

const controlBookmarkIconFill = function () {
  model.deleteBookmark(model.state.results.profile.username);
  bookmarkView.removeAsideBookmarks(updateAsideBookmarks);
};

const controlBookmarkIconUnfill = function () {
  model.addBookmark(model.state.results.profile);
  bookmarkView.render(model.state.results.profile);
};

const bookmarksClick = function (user) {
  controlProfile(user);
};

const updateAsideBookmarks = function () {
  model.state.bookmarks.map((bookmark) => bookmarkView.render(bookmark));
};

const controlOpenMenu = function (bookmarks, overlay) {
  overlay.classList.remove("hidden");
  bookmarks.style.transform = "translateX(0%)";
};

const controlCloseMenu = function (bookmarks, overlay) {
  overlay.classList.add("hidden");
  bookmarks.style.transform = "translateX(100%)";
};

const init = function () {
  searchView.addhandler(controlSearch);
  profileView.addhandler(controlBookmarkIconFill, controlBookmarkIconUnfill);
  bookmarkView.addhandler(bookmarksClick);
  updateAsideBookmarks();
  bookmarkView.addHandlerToggleBookmarkMenu(controlOpenMenu, controlCloseMenu);
};
init();

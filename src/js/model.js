import { timeout } from "./helper.js";

export const state = {
  search: [],
  results: {
    profile: {},
    repos: [],
    languages_url: [],
    languages: [],
  },
  bookmarks: [],
};

export const fetchData = async function (url, username) {
  try {
    // const data = await fetch(url);
    const data = await Promise.race([fetch(url), timeout(10)]);
    const res = await data.json();
    if (!res) return;
    state.results.profile = {
      username: res.login,
      bio: res.bio,
      created_at: res.created_at,
      email: res.email,
      profileLink: res.html_url,
      name: res.name,
      followers: res.followers,
      following: res.following,
      public_repos: res.public_repos,
      profilePic: res.avatar_url,
      repos_url: res.repos_url,
    };
    if (state.bookmarks.some((bookmark) => bookmark.username === username)) {
      state.results.profile.is_bookmarked = true;
    } else state.results.profile.is_bookmarked = false;
  } catch (err) {
    console.log("Error ", err);
    throw err;
  }
};

export const fetchRepos = async function () {
  try {
    const data = await fetch(state.results.profile.repos_url);
    const res = await data.json();

    state.results.repos = res;
    // res.map((el) => state.results.languages_url.push(el.languages_url));
    // fetchLanguages();
    // console.log(state.results.languages);
    console.log(res);
  } catch (err) {
    console.log("Error ", err);
  }
};

const fetchLanguages = async function () {
  state.results.languages = [];

  // state.results.languages_url.forEach(async function (lang) {
  //   const data = await fetch(lang);
  //   const res = await data.json();
  //   state.results.languages.push(Object.keys(res));
  // });
  const data = await fetch(state.results.repos.languages_url);
  const res = await data.json();
  // state.results.languages = 
  console.log('fetchLang : ',res);
};

export const addBookmark = function (profile) {
  state.bookmarks.push(profile);
  // if (profile.username === state.results.profile.username) {
  state.results.profile.is_bookmarked = true;
  setLocalItem();
  // }
  console.log(state.bookmarks);
};

export const deleteBookmark = function (username) {
  const index = state.bookmarks.findIndex((name) => name.username === username);
  console.log("index : ", index);
  state.results.profile.is_bookmarked = false;
  state.bookmarks.splice(index, 1);
  console.log(state.bookmarks);
  setLocalItem();
};

const setLocalItem = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookmarks));
};
const getLocalItem = function () {
  const res = localStorage.getItem("bookmark");
  if (!res) return;

  state.bookmarks = JSON.parse(res);
};
getLocalItem();

// export const renderBookmarked = function () {
//   const bookmark_icon = document.querySelector(".bookmark-icon");
//   bookmark_icon.setAttribute("name", "bookmark");
//   bookmark_icon.classList.add("bookmark-icon-filled");
// };

class SearchView {
  addhandler(handler) {
    const searchbox = document.querySelector(".search-text-box");

    searchbox.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        if (!searchbox.value) return;
        handler(searchbox.value.toLowerCase());
        searchbox.value = "";
        searchbox.blur();
      }
    });
  }
}

export default new SearchView();

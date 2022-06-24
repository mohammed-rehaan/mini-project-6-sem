class SearchView {
  addhandler(handler) {
    const searchbox = document.querySelector(".search-text-box");
    // console.log(searchbox);
    searchbox.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        handler(searchbox.value);
        searchbox.value = "";
      }
    });
  }
}

export default new SearchView();

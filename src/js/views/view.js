export default class View {
  renderSpinner(parentElement) {
    const markup =
      '<div class="spinner-box"> <div class="spinner"></div> </div>';
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

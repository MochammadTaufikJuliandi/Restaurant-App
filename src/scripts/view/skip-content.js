class SkipContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <a href="../#maincontent" class="skip">Skip To Content</a>
    `;
  }
}

customElements.define('skip-content', SkipContent);

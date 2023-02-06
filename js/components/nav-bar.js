class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item has-text-weight-bold">
            <img class="mr-2" src="/images/logo.png" width="auto" height="60px">
            Flight Management
          </a>
    
        </div>
      
        <div class="navbar-menu has-text-weight-bold">
          <div class="navbar-end">
            <a class="navbar-item" href="/">
              Flights
            </a>
      
            <a class="navbar-item" href="/personnel">
              Personnel
            </a>
          </div>
        </div>
      </nav>`
    }
}

window.customElements.define('nav-bar', NavBar);
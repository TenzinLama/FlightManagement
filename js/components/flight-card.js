class FlightCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<div class="mb-4">
        <div class="box">
          <div class="columns">
            <div class="column">
              <p class="has-text-weight-bold">Flight Code</p>
              <p>${this.getAttribute("flightCode")}</p>
            </div>
            <div class="column">
              <p class="has-text-weight-bold">Origin</p>
              <p>${this.getAttribute("origin")}</p>
            </div>
            <div class="column">
              <p class="has-text-weight-bold">Destination</p>
              <p>${this.getAttribute("destination")}</p>
            </div>
            <div class="column">
              <p class="has-text-weight-bold">Departure Time</p>
              <p>${this.getAttribute("departureTime").toString("f")}</p>
            </div>
            <div class="column">
              <p class="has-text-weight-bold">Arrival Time</p>
              <p>${this.getAttribute("arrivalTime").toString("f")}</p>
            </div>
            <div class="column">
              <p class="has-text-weight-bold">Status</p>
              <p class="${this.getAttribute("isValid") === "true" ? `has-text-success`: `has-text-danger`}">
              ${this.getAttribute("isValid") === "true" ? `Ready`: `Invalid Crew`}
              </p>
            </div>
          <div class="column is-flex is-justify-content-center is-align-items-center">
            <button class="button is-info">Manage</button>
          </div>
        </div>
      </div>`
      ;

    }
}

window.customElements.define("flight-card", FlightCard);
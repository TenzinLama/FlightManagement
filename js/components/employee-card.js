class EmployeeCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<div class="box mb-4">
        <div class="columns">
           <div class="column">
              <p class="has-text-weight-bold">Id</p>
              <p>${this.getAttribute("employeeId")}</p>
           </div>
           <div class="column">
              <p class="has-text-weight-bold">Name</p>
              <p>${this.getAttribute("name")}</p>
           </div>
           <div class="column">
              <p class="has-text-weight-bold">Designation</p>
              <p>${this.getAttribute("designation")}</p>
           </div>
           <div class="column">
              <p class="has-text-weight-bold">Assigned Flight</p>
              <p>${this.getAttribute("flightAssigned")} </p>
           </div>
           <div class="column is-flex is-justify-content-center is-align-items-center">
            <button class="button is-danger">Delete</button>
           </div>
        </div>
      </div>`;
    }


}

window.customElements.define("employee-card", EmployeeCard);
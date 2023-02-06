class CreateEmployeeCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <form class="box">
            <div class="field-body is-horizontal field">
                <div class="field">
                    <label class="label" for="name">Name</label>
                    <div class="control">
                        <input class="input" type="text" id="name" name="name">
                    </div>
                </div>
            
                <div class="field">
                    <label class="label" for="designation">Designation:</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select id="designation" name="designation">
                                <option value="" selected disabled>select</option>
                                <option value="Captain">Captain</option>
                                <option value="First Officer">First Officer</option>
                                <option value="Attendant">Attendant</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field mt-2">
                <div class="control">
                    <button class="button is-primary" type="submit" value="Submit">Create Employee</button>
                </div>
            </div>
        </form>`
    }
}

window.customElements.define('create-employee-card', CreateEmployeeCard);
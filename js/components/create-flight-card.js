class CreateFlightCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <form class="box">
            <div class="field">
                <label class="label" for="flightCode">Flight Code:</label>
                <div class="control">
                    <input class="input" type="text" id="flightCode" name="flightCode">
                </div>
            </div>

            <div class="field field-body is-horizontal">
                <div class="field">
                    <label class="label" for="origin">Origin:</label>
                    <div class="control">
                        <input class="input" type="text" id="origin" name="origin">
                    </div>
                </div>
                <div class="field"> 
                    <label class="label" for="origin">Destination:</label>
                    <div class="control">
                        <input class="input" type="text" id="destination" name="destination">
                    </div>
                </div>
            </div>
            
            <div class="field-body is-horizontal">
                <div class="field">
                    <label class="label" for="departureTime">Departure Time:</label>
                    <div class="control">
                        <input class="input" type="datetime-local" id="departureTime" name="departureTime">
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="arrivalTime">Arrival Time:</label>
                    <div class="control">
                        <input class="input" type="datetime-local" id="arrivalTime" name="arrivalTime">
                    </div>
                </div>
            </div>

            <div class="columns mt-1">
                <div class="column">
                    <div class="field"> 
                        <label class="label"for="attendant-list">Select Attendants</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select id="attendant-list" name="attendant-list">
                                    <option value="" selected disabled>select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <p class="has-text-weight-bold">Crew list</p>
                    <div class="content">
                        <ol id="current-crew">
                        </ol>
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label class="label"for="captain-list">Select Captain</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select id="captain-list" name="captain-list">
                                    <option value="" selected disabled>select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <p class="has-text-weight-bold">Captain</p>
                    <div class="content">
                        <ol id="current-captain">
                        </ol>
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label class="label"for="fo-list">Select First Officer</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select id="fo-list" name="fo-list">
                                    <option value="" selected disabled>select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <p class="has-text-weight-bold">First Officer</p>
                    <div class="content">
                        <ol id="current-fo">
                        </ol>
                    </div>
                </div>
            </div>
            <button id="create-flight-button" class="button is-primary" type="submit" value="Submit">Create Flight</button>         
        </form>`
    }
}

window.customElements.define('create-flight-card', CreateFlightCard);
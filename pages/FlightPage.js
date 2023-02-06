const initdataStore = {
    attendants: [],
    captain: null,
    firstOfficer: null,
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    flightCode: ''
}

class FlightPage extends HTMLElement {

    constructor() {
        super();
        this.mode = 'create';
        this.flightFormData = JSON.parse(JSON.stringify(initdataStore));
    }


    connectedCallback() {
        this.render();
    }

    submitFlight(e) {
        e.preventDefault();
        const {
            captain, 
            firstOfficer, 
            flightCode, 
            origin, 
            destination, 
            arrivalTime, 
            departureTime, 
            attendants} = this.flightFormData;

        if(this.isFormValid()) {
            let newAttendants = [];
            attendants.forEach((a) => {
                const attendant = dataStore.employees.find((e) => e.id === a.id);
                attendant.assignFlight(flightCode);
                newAttendants.push(attendant.id);
            });

            const newCaptain = dataStore.employees.find(c => c.id === captain.id);
            newCaptain.assignFlight(flightCode);
        
            const newFirstOfficer = dataStore.employees.find(c => c.id === firstOfficer.id);
            newFirstOfficer.assignFlight(flightCode);

            // const crew = new Crew(captain.id, firstOfficer.id, newAttendants);
            let crew;
            if(this.mode === 'edit') {
                const flight = dataStore.flights.find(f => f.flightCode === flightCode);
                crew = dataStore.crews.find(c => c.id === flight.crew.id);
                //have to add new crew here;
                crew.captain = captain.id;
                crew.attendants = newAttendants;
                crew.firstOfficer = firstOfficer.id
            } else {
                crew = new Crew(captain.id, firstOfficer.id, newAttendants);
                dataStore.addCrew(crew);
            }

            const flight = new Flight(flightCode, 
                origin, 
                destination, 
                departureTime, 
                arrivalTime,
                crew
                );
            dataStore.addFlight(flight);
            this.flightFormData = JSON.parse(JSON.stringify(initdataStore));
            this.mode = 'create';
            this.render();
        } else {
            window.alert("invalid flight details submitted");
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        // check if selected crew is a pilot/fo/attendant
        if(name.includes('-list')) {
            const [ selectedOption ] = document.getElementById(name).selectedOptions;
            const { designation, crewname } = selectedOption.dataset;
            const el = document.createElement("li");
            const crewName = document.createTextNode(crewname);
            el.appendChild(crewName);
            if(designation === 'Captain') {
                this.flightFormData.captain = {name: crewname, id: value};
            } else if(designation === 'First Officer') {
                this.flightFormData.firstOfficer = {name: crewname, id: value};
            } else if(designation === 'Attendant') {
                    const newAttendants = Util.addObjToArrIfExists(this.flightFormData.attendants, {name: crewname, id: value}, "id");
                    if (newAttendants.length > 5) {
                        window.alert("Max number of attendants allocated for this flight! (max 5)");
                        return;
                    } else {
                        this.flightFormData.attendants = newAttendants;
                    }
            }
            this.render();
        } 
        else {
            this.flightFormData[name] = value;
        }
    }

    isFormValid() {
        const { 
            flightCode, 
            origin, 
            destination, 
            arrivalTime,
            departureTime,
            captain, 
            firstOfficer, 
            attendants,
         } = this.flightFormData;
        if(attendants.length > 5 || attendants.length < 3) {
            return false;
        }
        if(!flightCode.trim()
            || !origin
            || !destination
            || !arrivalTime
            || !departureTime
            || !captain
            || !firstOfficer
            ){
                return false;
            }
        return true;
    }

    createFlight(flight) {
        let el = document.createElement("flight-card");
        el.setAttribute("flightCode", flight.flightCode);
        el.setAttribute("origin", flight.origin);
        el.setAttribute("destination", flight.destination);
        el.setAttribute("arrivalTIme", flight.arrivalTime);
        el.setAttribute("departureTime", flight.departureTime);
        el.setAttribute("isValid", flight.isValid());
        document.getElementById("flight-list").appendChild(el);
    }

    editFlight(flightCode) {
        this.mode = 'edit';
        const flight = dataStore.flights.find(f => f.flightCode === flightCode);
        this.flightFormData = {
            flightCode: flightCode,
            attendants: dataStore.employees.filter(a => flight.crew.attendants.includes(a.id)) ,
            captain: dataStore.employees.find(c => c.id === flight.crew.captain),
            firstOfficer: dataStore.employees.find(fo => fo.id === flight.crew.firstOfficer),
            origin: flight.origin,
            destination: flight.destination, 
            arrivalTime: flight.arrivalTime,
            departureTime: flight.departureTime,
        }
        this.render();
    }

    addNameToList(name, listId) {
        const el = document.createElement("li");
        const crewName = document.createTextNode(name);
        el.appendChild(crewName);
        const currList = document.getElementById(listId);
        currList.appendChild(el);
    }


    render() {
        this.innerHTML = `
        <div>
            <h1 class="title">Flights</h1>
            <div class="is-flex"> 
                <div class="column is-half">
                    <create-flight-card />
                </div>
            </div>
        </div>

        <ul class="mt-4 p-1" id="flight-list">
        </ul>
        </div>`;
    
        const form = document.querySelector('form');
        form.addEventListener('input', this.handleChange.bind(this));
        form.addEventListener('submit', this.submitFlight.bind(this));
        dataStore.flights.forEach((f) => {
            this.createFlight(f);
        });

        if(this.mode === 'edit') {
            document.getElementById('create-flight-button').innerText = "Update";
        }

        // fill employee list 
        dataStore.employees.forEach((e) => {
            if(this.mode === 'edit' || !e.flightAssigned) {
                const el = document.createElement("option");
                el.setAttribute("value", e.id);
                el.setAttribute("data-designation", e.designation);
                el.setAttribute("data-crewname", e.name);
                const optionText = document.createTextNode(e.name);
                el.appendChild(optionText);
                if(e.designation === 'Attendant') {
                    document.getElementById("attendant-list").appendChild(el);
                } else if(e.designation === 'First Officer') {
                    document.getElementById("fo-list").appendChild(el);
                } else if(e.designation === 'Captain') {
                    document.getElementById("captain-list").appendChild(el);
                }
            }
        });

        //fill selected employee list on render
        if(this.flightFormData.captain) {
            this.addNameToList(this.flightFormData.captain.name, "current-captain")
        }

        if(this.flightFormData.firstOfficer) {
            this.addNameToList(this.flightFormData.firstOfficer.name, "current-fo")
        }

        this.flightFormData.attendants.forEach(a => {
            this.addNameToList(a.name, "current-crew")
        });

        document.getElementById("flightCode").value = this.flightFormData.flightCode;
        document.getElementById("origin").value = this.flightFormData.origin;
        document.getElementById("destination").value = this.flightFormData.destination;
        document.getElementById("arrivalTime").value = this.flightFormData.arrivalTime;
        document.getElementById("departureTime").value = this.flightFormData.departureTime;

        const cards = document.querySelectorAll('flight-card');
        cards.forEach(card => {
            const button = card.querySelector('button');
            button.addEventListener('click', _ => {
                const flightCode = card.getAttribute('flightCode');
                this.editFlight(flightCode);
            });
        });
    }
}

window.customElements.define("flight-page", FlightPage);
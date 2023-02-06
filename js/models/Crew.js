class Crew {

    #id;
    #captain;
    #firstOfficer;
    #attendants;

    constructor(captain, firstOfficer, attendants) {
        this.#id = Util.generateId();
        this.#captain = captain;
        this.#firstOfficer = firstOfficer;
        this.#attendants = attendants;
    }

    get id() {
        return this.#id;
    }

    get captain() {
        return this.#captain;
    }

    set captain(captain) {
        if(!(this.#captain == null) && this.#captain !== captain) {
            dataStore.employees.find(c => c.id === this.#captain).assignFlight(null);
        } 
        this.#captain = captain;
    }

    get firstOfficer() {
        return this.#firstOfficer;
    }

    set firstOfficer(firstOfficer) {
        if(!(this.#firstOfficer == null) && this.#firstOfficer !== firstOfficer) {
            dataStore.employees.find(c => c.id === this.#firstOfficer).assignFlight(null);
        } 
        this.#firstOfficer = firstOfficer;
    }

    get attendants() {
        return this.#attendants;
    }

    set attendants(attendants) {
        if(!(this.#attendants == null)) {
            // unassign all attendants that are not in the new attendants list
            this.#attendants.filter(a => !(attendants.includes(a))).forEach(a => {
                dataStore.employees.find(e => e.id === a).assignFlight(null);
            })
        }
        this.#attendants = attendants;
    }

    removeCrewMember(id) {
        if(id === this.#captain) {
            this.#captain = null;
        }
        else if(id === this.#firstOfficer) {
            this.#firstOfficer = null;
        } else {
            this.#attendants = this.#attendants.filter(a => a !== id);
        }
        return 
    }


}
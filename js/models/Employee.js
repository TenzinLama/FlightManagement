class Employee {
    #id;
    #name;
    #designation;
    #flightAssigned;

    constructor(id, name, designation, flightAssigned) {
        this.#id = id;
        this.#name = name;
        this.#designation = designation;
        this.#flightAssigned = flightAssigned;
    }
    
    get id() {
        return this.#id
    }

    get name() {
        return this.#name;
    }

    get designation() {
        return this.#designation;
    }

    get flightAssigned() {
        return this.#flightAssigned;
    }

    set flightAssigned(flightCode) {
        this.#flightAssigned = flightCode
    }

    assignFlight(flightCode) {
        this.#flightAssigned = flightCode;
    }

}


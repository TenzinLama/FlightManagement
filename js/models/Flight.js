class Flight {
    #flightCode;
    #origin;
    #destination;
    #departureTime;
    #arrivalTime;
    #crew;

    constructor(flightCode, origin, destination, departureTime, arrivalTime, crew) {
        this.#flightCode = flightCode;
        this.#origin = origin;
        this.#destination = destination;
        this.#departureTime = departureTime;
        this.#arrivalTime = arrivalTime;
        this.#crew = crew;
    }

    get flightCode() {
        return this.#flightCode;
    }
    
    set flightCode(code) {
        this.flightCode = code;
    }

    get crew() {
        return this.#crew;
    }

    set crew(crew) {
        this.#crew = crew;
    }

    get departureTime() {
        return this.#departureTime;
    }

    set departureTime(time) {
        this.#departureTime = time;
    }

    get origin(){
        return this.#origin;
    }

    set origin(origin) {
        this.#origin = origin;
    }

    get destination() {
        return this.#destination;
    }

    set destination(destination) {
        this.#destination = destination;
    }

    get arrivalTime() {
        return this.#arrivalTime;
    }

    set arrivalTime(time) {
        this.#arrivalTime = time;
    } 

    isValid() {
        if (this.crew.captain 
            && this.crew.firstOfficer 
            && this.crew.attendants.length >= 3
            && this.crew.attendants.length <= 5) {
                return true;
            }
        return false;
    }

}
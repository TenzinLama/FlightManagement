class DataStore {

    #employees = [];
    #flights = [];
    #crews = [];

    get employees(){
        return this.#employees;
    }

    get flights() {
        return this.#flights;
    }

    get crews() {
        return this.#crews;
    }

    addEmployee(employee) {
        this.#employees.push(employee);
    }

    deleteEmployee(employeeId) {
        this.#employees = this.#employees.filter(e => e.id !== employeeId);
        this.#crews.forEach(c => c.removeCrewMember(employeeId));
    }

    addFlight(flight) {
        this.#flights = this.#flights.filter(f => f.flightCode !== flight.flightCode);
        this.#flights.unshift(flight);
    }

    addCrew(crew) {
        this.#crews.push(crew);
    }
}


const dataStore = new DataStore();

dataStore.addEmployee(new Employee("2", "Cole", "Captain", "7x9343"));
dataStore.addEmployee(new Employee("1", "Lukaku", "Captain"));
dataStore.addEmployee(new Employee("23", "James", "First Officer", "7x9343"));
dataStore.addEmployee(new Employee("34", "Sterling", "Attendant", "7x9343"));
dataStore.addEmployee(new Employee("32", "Felix", "Attendant", "7x9343"));
dataStore.addEmployee(new Employee("11", "Morata", "Attendant", "7x9343"));
dataStore.addEmployee(new Employee("19", "Foden", "Attendant"));
dataStore.addEmployee(new Employee("22", "Bellingham", "Attendant"));
dataStore.addEmployee(new Employee("29", "Pirlo", "Attendant"));
dataStore.addEmployee(new Employee("663", "Linker", "First Officer"));


let crew = new Crew("2", "23", ["34","32","11"]);
dataStore.addCrew(crew);
dataStore.addFlight(new Flight("7x9343", "Toronto", "New York", "2023-02-11T20:11", "2023-02-12T20:11", crew));

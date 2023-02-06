
class EmployeePage extends HTMLElement{

    constructor() {
        super();
        this.formData = {
            name: '',
            designation: ''
        }
    }

    connectedCallback() {
        this.render();
    }


    isFormValid() {
        const {
            name,
            designation
        } = this.formData;
        if(!name.trim()
        || !designation.trim()) {
            return false;
        }
        return true;
    }

    createEmployee(employee) {
        const { id, name, designation, flightAssigned } = employee;
        let el = document.createElement("employee-card");
        el.setAttribute("name", name);
        el.setAttribute("designation", designation);
        el.setAttribute("employeeId", id);
        el.setAttribute("flightAssigned", flightAssigned ? flightAssigned : "N/A");
        document.getElementById("employee-list").appendChild(el);
    }

    submitEmployee(e) {
        e.preventDefault();
        const {
            name,
            designation
        } = this.formData;
        if(this.isFormValid()) {
            const newEmployee = new Employee(Util.generateId(), name, designation);
            dataStore.employees.unshift(newEmployee);
            this.formData = {
                name: '',
                designation: ''
            }
            this.render();
        } else {
            window.alert('Missing fields')
        }

    }


    handleChange(e) {
        const { name, value } = e.target;
        this.formData[name] = value;
    }


    render() {
        this.innerHTML = `<div>
            <h1 class="title">Personnel List</h1>
            <div class="column is-half">
                <create-employee-card></create-employee-card>
            </div>
            <ul class="mt-4 p-1" id="employee-list">
            </ul>
        </div>`;

        const form = document.querySelector('form');
        form.addEventListener('input', this.handleChange.bind(this));
        form.addEventListener('submit', this.submitEmployee.bind(this));

        dataStore.employees.forEach((e) => {
            this.createEmployee(e);
        });

        const cards = document.querySelectorAll('employee-card');
        cards.forEach(card => {
            const button = card.querySelector('button');
            button.addEventListener('click', _ => {
                const employeeId = card.getAttribute('employeeId');
                dataStore.deleteEmployee(employeeId);
                this.render();
            });
        });
    }
}

window.customElements.define("employee-page", EmployeePage);
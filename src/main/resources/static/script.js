const API = "http://localhost:8080/api/employees";

// Variables to store separate input fields
let empName = "";
let empEmail = "";
let empDept = "";

// Load employees from API
function loadEmployees() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            let table = "";
            data.forEach(emp => {
                table += `
                <tr>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.department}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteEmp(${emp.id})">Delete</button>
                    </td>
                </tr>`;
            });
            document.getElementById("empTable").innerHTML = table;
        });
}

// Add employee
function addEmployee() {
    empName = document.getElementById("name").value;
    empEmail = document.getElementById("email").value;
    empDept = document.getElementById("dept").value;

    if (empName === "" || empEmail === "" || empDept === "") {
        alert("Please fill all fields!");
        return;
    }

    const emp = { name: empName, email: empEmail, department: empDept };

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp)
    }).then(() => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("dept").value = "";
        loadEmployees();
    });
}

// Delete employee
function deleteEmp(id) {
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(() => loadEmployees());
}

// Load employees when page loads
loadEmployees();
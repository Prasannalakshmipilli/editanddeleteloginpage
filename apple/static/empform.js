// --------------------- ADD EMPLOYEE (POST) ----------------------

let addemp = document.getElementById("addemp");

function addEmployee(e) {
    e.preventDefault();

    let allEmps = JSON.parse(localStorage.getItem("emps")) || [];

    let newEmp = {
        name: document.getElementById("empname").value,
        email: document.getElementById("empemail").value,
        salary: document.getElementById("empsal").value,
    };

    fetch("/api/create_emp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmp)
    })
    .then(res => res.json())
    .then(res => {
        console.log("POST Response:", res);

        allEmps.push(res);
        localStorage.setItem("emps", JSON.stringify(allEmps));

        displayEmployees();

        alert("Employee added!");  // ✔ only 1 alert
    });
}

addemp.addEventListener("click", addEmployee);



// --------------------- UPDATE EMPLOYEE (PUT) ----------------------

let updateemp = document.getElementById("updateemp");

updateemp.addEventListener("click", (e) => {
    e.preventDefault();

    let allEmps = JSON.parse(localStorage.getItem("emps")) || [];

    let idToUpdate = 1;

    let updatedData = {
        name: document.getElementById("empname").value,
        email: document.getElementById("empemail").value,
        salary: document.getElementById("empsal").value,
    };

    fetch(`/api/update_emp/${idToUpdate}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .then(res => {
        console.log("PUT Response:", res);

        let index = allEmps.findIndex(emp => emp.id === idToUpdate);

        if (index !== -1) {
            allEmps[index] = res;
            localStorage.setItem("emps", JSON.stringify(allEmps));
        }

        displayEmployees();

        alert("Employee updated!");  // ✔ only 1 alert
    });
});



// ----------------------- DISPLAY EMPLOYEES ------------------------

function displayEmployees() {
    let allEmps = JSON.parse(localStorage.getItem("emps")) || [];

    let html = "<table border='1' cellpadding='5'>";
    html += "<tr><th>ID</th><th>Name</th><th>Email</th><th>Salary</th></tr>";

    allEmps.forEach(emp => {
        html += `
            <tr>
                <td>${emp.id || "-"}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.salary}</td>
            </tr>
        `;
    });

    html += "</table>";

    document.getElementById("showemps").innerHTML = html;
}

displayEmployees();

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("appointmentTableBody");
  if (!tableBody) return;

  const userAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

  if (userAppointments.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6">No upcoming appointments.</td></tr>`;
    return;
  }

  // Function to convert 24-hour time format to 12-hour format with AM/PM
  function to12HourFormat(time) {
    const [hour, minute] = time.split(":").map(num => parseInt(num));
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // 0 hour is considered 12 PM
    const minute12 = minute < 10 ? `0${minute}` : minute;
    return `${hour12}:${minute12} ${suffix}`;
  }

  userAppointments.forEach(app => {
    const row = document.createElement("tr");

    const prepayCell = document.createElement("td");
    if (app.status && app.status.toLowerCase() === "prepaid") {
      prepayCell.innerHTML = `<span>Paid</span>`;
    } else {
      prepayCell.innerHTML = `<button onclick="">Prepay</button>`;
    }

    row.innerHTML = `
      <td>${app.date}</td>
      <td>${to12HourFormat(app.time)}</td> <!-- Convert to 12-hour format here -->
      <td>${app.service}</td>
      <td>${app.stylist}</td>
      <td class="status-${(app.status || 'pending').toLowerCase()}">${capitalize(app.status || 'Pending')}</td>
    `;
    row.appendChild(prepayCell);

    tableBody.appendChild(row);
  });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

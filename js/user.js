document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("appointmentTableBody");
    if (!tableBody) return;
  
    const userAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
  
    if (userAppointments.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6">No upcoming appointments.</td></tr>`;
      return;
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
        <td>${app.time}</td>
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
  
  document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const monthYearLabel = document.getElementById("monthYearLabel");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    document.getElementById("prevMonth").addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
    });
  
    document.getElementById("nextMonth").addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
    });
  
    function renderCalendar(year, month) {
      calendar.innerHTML = ""; // Clear previous
      monthYearLabel.textContent = `${getMonthName(month)} ${year}`;
  
      daysOfWeek.forEach(day => {
        const header = document.createElement("div");
        header.className = "calendar-header";
        header.textContent = day;
        calendar.appendChild(header);
      });
  
      const totalDays = new Date(year, month + 1, 0).getDate();
      const firstDayIndex = new Date(year, month, 1).getDay();
  
      for (let i = 0; i < firstDayIndex; i++) {
        const empty = document.createElement("div");
        empty.className = "calendar-day";
        calendar.appendChild(empty);
      }
  
      for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("div");
        cell.className = "calendar-day";
  
        const label = document.createElement("strong");
        label.textContent = day;
        cell.appendChild(label);
  
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const dayAppointments = appointments.filter(app => app.date === dateStr);
  
        dayAppointments.forEach(app => {
          const div = document.createElement("div");
          div.className = `appointment status-${app.status?.toLowerCase()}`;
          div.textContent = `${app.time} - ${app.service}`;
          cell.appendChild(div);
        });
  
        calendar.appendChild(cell);
      }
    }
  
    function getMonthName(monthIndex) {
      return new Date(0, monthIndex).toLocaleString('default', { month: 'long' });
    }
  
    renderCalendar(currentYear, currentMonth);
  });
  
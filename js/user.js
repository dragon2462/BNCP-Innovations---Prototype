document.addEventListener("DOMContentLoaded", () => {
  // Table body for appointments in user.html
  const tableBody = document.getElementById("appointmentTableBody");
  
  // Calendar element in user-calendar.html
  const calendar = document.getElementById("calendar");
  const monthYearLabel = document.getElementById("monthYearLabel");

  // Get appointments from localStorage
  const userAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

  // Render Appointments Table in user.html
  if (tableBody) {
    renderAppointmentsTable(userAppointments);
  }

  // Render Calendar in user-calendar.html
  if (calendar && monthYearLabel) {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    
    renderCalendar(currentYear, currentMonth);
    
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
  }

  // Function to render appointments in user.html
  function renderAppointmentsTable(appointments) {
    if (appointments.length === 0) {
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

    appointments.forEach(app => {
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
  }

  // Function to capitalize status text
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Function to render the calendar for the given month and year
  function renderCalendar(year, month) {
    calendar.innerHTML = ""; // Clear existing calendar

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daysOfWeek.forEach(day => {
      const header = document.createElement("div");
      header.className = "calendar-header";
      header.textContent = day;
      calendar.appendChild(header);
    });

    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    // Create empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayIndex; i++) {
      const empty = document.createElement("div");
      empty.className = "calendar-day";
      calendar.appendChild(empty);
    }

    // Create cells for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement("div");
      cell.className = "calendar-day";

      const label = document.createElement("strong");
      label.textContent = day;
      cell.appendChild(label);

      // Append the day cell to the calendar
      calendar.appendChild(cell);
    }

    // Render appointments on the calendar days
    userAppointments.forEach(app => {
      const day = new Date(app.date).getDate(); // Extract the day from the date string
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      const calendarDay = calendar.querySelectorAll(".calendar-day")[day + firstDayIndex - 1];
      if (calendarDay && app.date === dateStr) {  // Only add appointment if date matches
        const appointmentDiv = document.createElement("div");
        appointmentDiv.className = `appointment status-${app.status.toLowerCase()}`;
        appointmentDiv.textContent = `${to12HourFormat(app.time)} - ${app.service}`;
        calendarDay.appendChild(appointmentDiv);
      }
    });

    // Update the month-year label
    monthYearLabel.textContent = `${getMonthName(month)} ${year}`;
  }

  // Function to format the month name
  function getMonthName(monthIndex) {
    return new Date(0, monthIndex).toLocaleString('default', { month: 'long' });
  }
});

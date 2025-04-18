const appointments = {
    "20": [
      { time: "10:00 AM", service: "Haircut", status: "confirmed" }
    ],
    "25": [
      { time: "2:00 PM", service: "Hair Coloring", status: "pending" }
    ],
    "30": [
      { time: "11:00 AM", service: "Hair Styling", status: "prepaid" }
    ]
  };
  
  const calendar = document.getElementById("calendar");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Headers
  daysOfWeek.forEach(day => {
    const header = document.createElement("div");
    header.className = "calendar-header";
    header.textContent = day;
    calendar.appendChild(header);
  });
  
  // Calendar for April 2025
  const totalDays = 30;
  const firstDayIndex = new Date(2025, 3, 1).getDay(); // April 1, 2025
  
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
  
    if (appointments[day]) {
      appointments[day].forEach(app => {
        const div = document.createElement("div");
        div.className = `appointment status-${app.status}`;
        div.textContent = `${app.time} - ${app.service}`;
        cell.appendChild(div);
      });
    }
  
    calendar.appendChild(cell);
  }
  
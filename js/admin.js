const appointments = {
    "1": [
      { name: "John Doe", time: "10:00 AM", service: "Haircut", status: "confirmed" },
      { name: "Jane Smith", time: "11:30 AM", service: "Hair Coloring", status: "canceled" },
      { name: "Emily Johnson", time: "1:00 PM", service: "Hair Styling", status: "confirmed" },
      { name: "Michael Brown", time: "2:30 PM", service: "Beard Trim", status: "confirmed" }
    ]
  };
  
  const calendar = document.getElementById("calendar");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Add headers
  daysOfWeek.forEach(day => {
    const header = document.createElement("div");
    header.className = "calendar-header";
    header.textContent = day;
    calendar.appendChild(header);
  });
  
  // Generate calendar
  const totalDays = 31;
  const firstDayIndex = new Date(2023, 9, 1).getDay(); // October 1, 2023
  
  for (let i = 0; i < firstDayIndex; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day";
    calendar.appendChild(empty);
  }
  
  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";
  
    const dayLabel = document.createElement("strong");
    dayLabel.textContent = day;
    cell.appendChild(dayLabel);
  
    if (appointments[day]) {
      appointments[day].forEach(app => {
        const div = document.createElement("div");
        div.className = `appointment status-${app.status}`;
        div.innerHTML = `${app.name}<br>${app.time} - ${app.service}`;
        cell.appendChild(div);
      });
    }
  
    calendar.appendChild(cell);
  }
  
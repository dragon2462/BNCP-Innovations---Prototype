const servicePrices = {
  "Haircut": 25,
  "Hair Coloring": 50,
  "Beard Trim": 15,
  "Hair Styling": 40,
  "Hair Treatment": 30
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  const timeSelect = document.getElementById("time");
  const bookingSection = document.getElementById("booking-section");
  const previewSection = document.getElementById("preview-section");
  const previewDetails = document.getElementById("preview-details");
  const previewPrice = document.getElementById("preview-price");

  // Populate time options with 15-minute intervals
  populateTimeOptions();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const service = form.service.value;
    const stylist = form.stylist.value || "Any Available";
    const date = form.date.value;
    const time = form.time.value;
    const notes = form.notes.value || "None";
    const price = servicePrices[service] || 0;

    previewDetails.innerHTML = `
      <li><strong>Service:</strong> ${service}</li>
      <li><strong>Stylist:</strong> ${stylist}</li>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
      <li><strong>Notes:</strong> ${notes}</li>
    `;
    previewPrice.textContent = `Estimated Price: $${price.toFixed(2)}`;

    bookingSection.style.display = "none";
    previewSection.style.display = "block";
  });

  function populateTimeOptions() {
    const timeOptions = [];
    const startTime = 9; // Start at 9 AM
    const endTime = 22; // End at 10 PM (22:00)
    
    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = convertTo12HourFormat(hour, minute);
        timeOptions.push(timeStr);
      }
    }

    // Append options to the time select dropdown
    timeOptions.forEach(time => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      timeSelect.appendChild(option);
    });
  }

  // Function to convert time to 12-hour format with AM/PM
  function convertTo12HourFormat(hour, minute) {
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Handle midnight (0 hour becomes 12 AM)
    const minute12 = minute < 10 ? `0${minute}` : minute; // Add leading zero for minutes if needed
    return `${hour12}:${minute12} ${suffix}`;
  }

  // Pad the hour or minute with leading zero if needed
  function pad(value) {
    return value < 10 ? "0" + value : value;
  }
});

function goBack() {
  document.getElementById("booking-section").style.display = "block";
  document.getElementById("preview-section").style.display = "none";
}

function confirmAppointment() {
  const form = document.getElementById("appointmentForm");
  const service = form.service.value;
  const stylist = form.stylist.value || "N/A";
  const date = form.date.value;
  const time = form.time.value;
  const notes = form.notes.value || "";
  const status = "Confirmed";

  const newAppointment = { service, stylist, date, time, notes, status };

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push(newAppointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  form.reset();
  document.getElementById("preview-section").style.display = "none";
  document.getElementById("confirmationModal").style.display = "block";

  setTimeout(() => {
    closeModal();
  }, 4000);
}

function closeModal() {
  document.getElementById("confirmationModal").style.display = "none";
  document.getElementById("booking-section").style.display = "block";
}

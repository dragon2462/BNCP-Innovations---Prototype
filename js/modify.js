document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("modifyForm");
    const messageDiv = document.getElementById("modifyMessage");
    const appointmentSelect = document.getElementById("appointment_select");
  
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  
    // Function to convert 24-hour time format to 12-hour format with AM/PM
    function to12HourFormat(time) {
      const [hour, minute] = time.split(":").map(num => parseInt(num));
      const suffix = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12; // 0 hour is considered 12 PM
      const minute12 = minute < 10 ? `0${minute}` : minute;
      return `${hour12}:${minute12} ${suffix}`;
    }
  
    // Populate the dropdown with available appointments
    appointments.forEach((app, index) => {
      const option = document.createElement("option");
      option.value = index;  // Store index as value
      option.textContent = `${app.service} on ${app.date} at ${to12HourFormat(app.time)}`;
      appointmentSelect.appendChild(option);
    });
  
    // Handle form submission (modify or cancel)
    form.addEventListener("submit", e => {
      e.preventDefault();
      messageDiv.textContent = "";
  
      const selectedIndex = appointmentSelect.value;
  
      if (selectedIndex === "") {
        messageDiv.textContent = "❌ Please select an appointment.";
        messageDiv.style.color = "red";
        return;
      }
  
      // Check which button was clicked: Modify or Cancel
      if (e.submitter.classList.contains("cancel-button")) {
        // -------- Cancel logic --------
        appointments.splice(selectedIndex, 1); // Remove the selected appointment
        localStorage.setItem("appointments", JSON.stringify(appointments));
        messageDiv.textContent = "✅ Appointment canceled.";
        messageDiv.style.color = "green";
  
        // Reset form without requiring date/time
        form.reset();
        setRequiredFields(false);  // Remove required fields for cancellation
      } else {
        // -------- Modify logic --------
        const newDate = document.getElementById("new_date").value;
        const newTime = document.getElementById("new_time").value;
  
        // If new date/time is empty, display error
        if (!newDate || !newTime) {
          messageDiv.textContent = "❌ Please select both a new date and time for the modification.";
          messageDiv.style.color = "red";
          return;
        }
  
        // Modify appointment data
        appointments[selectedIndex].date = newDate;
        appointments[selectedIndex].time = newTime;
        localStorage.setItem("appointments", JSON.stringify(appointments));
  
        messageDiv.textContent = "✅ Appointment modified.";
        messageDiv.style.color = "green";
  
        // Reset the form and keep date/time fields as required
        form.reset();
        setRequiredFields(true);  // Ensure required fields for modification
      }
    });
  
    // Function to set the required attribute on the date/time fields
    function setRequiredFields(isRequired) {
      const newDateField = document.getElementById("new_date");
      const newTimeField = document.getElementById("new_time");
  
      if (isRequired) {
        newDateField.setAttribute("required", "true");
        newTimeField.setAttribute("required", "true");
      } else {
        newDateField.removeAttribute("required");
        newTimeField.removeAttribute("required");
      }
    }
  });
  
document.addEventListener("DOMContentLoaded", () => {
  // Make sure to fetch appointments from localStorage
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  // Helper function to format date into "YYYY-MM-DD"
  function formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Extract date in "YYYY-MM-DD" format
  }

  // Extract the appointment dates and count them
  const appointmentDates = appointments.map(app => formatDate(app.date));

  // Create a date counter to track appointments per day
  const dateCount = {};
  appointmentDates.forEach(date => {
    dateCount[date] = (dateCount[date] || 0) + 1;
  });

  // Get date ranges for last 7 days, 30 days (for week and month trends)
  const getLastNDays = (n) => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(formatDate(date));
    }
    return dates.reverse();
  };

  // Data for the chart (e.g., last 7 days, 30 days)
  const last7Days = getLastNDays(7);
  const last30Days = getLastNDays(30);
  
  // Count appointments in last 7 days and 30 days
  const appointmentsLast7Days = last7Days.map(date => dateCount[date] || 0);
  const appointmentsLast30Days = last30Days.map(date => dateCount[date] || 0);

  // Check if Chart.js is loaded
  const ctx = document.getElementById("appointmentsTrendChart").getContext("2d");
  if (!ctx) {
    console.error("Chart.js context not found");
    return;
  }

  // Create the appointments trend chart
  const appointmentsTrendChart = new Chart(ctx, {
    type: "line", // You can change this to 'bar' or 'line' based on preference
    data: {
      labels: last30Days, // Use the last 30 days as labels for the X-axis
      datasets: [
        {
          label: "Appointments (Last 30 Days)",
          data: appointmentsLast30Days,
          borderColor: "#007BFF",
          backgroundColor: "rgba(0, 123, 255, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Appointments (Last 7 Days)",
          data: appointmentsLast7Days,
          borderColor: "#28a745",
          backgroundColor: "rgba(40, 167, 69, 0.1)",
          fill: true,
          tension: 0.4,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Date"
          }
        },
        y: {
          title: {
            display: true,
            text: "Number of Appointments"
          }
        }
      }
    }
  });
});

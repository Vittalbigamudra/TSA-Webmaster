class CalendarCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.shadowRoot.innerHTML = `
      <style>
        .calendar {
          margin: 2rem auto;
          width: 80%;
          padding: 1rem;
          border-radius: 20px;
          box-shadow: 2px 2px 10px 1px black;
          background-color: white;
          font-family: sans-serif;
        }

        .header {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
          text-align: center;
        }

        .day-name {
          font-weight: bold;
          color: #34495e;
        }

        .day {
          padding: 0.75rem;
          border-radius: 10px;
          background-color: #ecf0f1;
        }

        .today {
          background-color: #2c3e50;
          color: white;
          font-weight: bold;
        }
      </style>

      <div class="calendar">
        <div class="header">${this.getMonthName(month)} ${year}</div>
        <div class="grid">
          ${this.renderDayNames()}
          ${this.renderDays(month, year, today)}
        </div>
      </div>
    `;
  }

  getMonthName(monthIndex) {
    return [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ][monthIndex];
  }

  renderDayNames() {
    const names = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return names.map(n => `<div class="day-name">${n}</div>`).join("");
  }

  renderDays(month, year, today) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let cells = [];

    // Empty slots before first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(`<div></div>`);
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      cells.push(`<div class="day ${isToday ? 'today' : ''}">${d}</div>`);
    }

    return cells.join("");
  }
}

customElements.define('calendar-calendar', CalendarCalendar);

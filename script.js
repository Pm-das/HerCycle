document.addEventListener("DOMContentLoaded", function() {
    // DARK MODE TOGGLE
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });

    // FUN FACT POPUP
    const funFacts = [
        "The average cycle length is 28 days, but it can vary!",
        "The menstrual cycle can be affected by stress and diet.",
        "Ovulation usually occurs around day 14 of the cycle.",
        "Some women experience increased creativity before their period.",
        "Exercise can help relieve period cramps!"
    ];
    
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    document.getElementById("funFactText").innerText = randomFact;
    document.getElementById("funFactPopup").style.display = "block";

    window.closePopup = function() {
        document.getElementById("funFactPopup").style.display = "none";
    };

    // LOG PERIOD DATA
    const periodForm = document.getElementById("periodForm");
    const cycleList = document.getElementById("cycleList");
    const cyclePrediction = document.getElementById("cyclePrediction");

    let periodLogs = [];

    periodForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const startDate = document.getElementById("start_date").value;
        const endDate = document.getElementById("end_date").value;
        const flow = document.getElementById("flow").value;
        const notes = document.getElementById("notes").value;

        if (!startDate || !endDate) return;

        const cycleDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        periodLogs.push({ startDate, endDate, cycleDays });

        let listItem = document.createElement("li");
        listItem.innerHTML = `Cycle: ${startDate} to ${endDate} (${cycleDays} days) - Flow: ${flow} - Notes: ${notes}`;
        cycleList.appendChild(listItem);

        if (periodLogs.length > 1) {
            let avgCycleLength = periodLogs.reduce((sum, log) => sum + log.cycleDays, 0) / periodLogs.length;
            let nextPeriodDate = new Date(startDate);
            nextPeriodDate.setDate(nextPeriodDate.getDate() + avgCycleLength);
            cyclePrediction.innerHTML = `Predicted Next Cycle: ${nextPeriodDate.toDateString()}`;
        }
    });

    // REMINDERS
    const reminderForm = document.getElementById("reminderForm");
    const reminderList = document.getElementById("reminderList");

    reminderForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const reminderDate = document.getElementById("reminder_date").value;
        const reminderText = document.getElementById("reminder_text").value;
        
        let listItem = document.createElement("li");
        listItem.innerText = `Reminder for ${reminderDate}: ${reminderText}`;
        reminderList.appendChild(listItem);
    });
});

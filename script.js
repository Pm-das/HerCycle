document.addEventListener("DOMContentLoaded", () => {
    const periodForm = document.getElementById("periodForm");
    const cycleList = document.getElementById("cycleList");
    const fertilityInfo = document.getElementById("fertilityInfo");

    const symptomForm = document.getElementById("symptomForm");
    const symptomList = document.getElementById("symptomList");

    const reminderForm = document.getElementById("reminderForm");document.addEventListener("DOMContentLoaded", function() {
    // Random Fact Pop-up
    const facts = [
        "The average cycle lasts 28 days, but it can range from 21-35 days.",
        "Your period can be affected by stress and diet.",
        "Ovulation usually happens around day 14 of a 28-day cycle.",
        "Hormones like estrogen and progesterone regulate the cycle.",
        "Drinking more water can reduce bloating during your period."
    ];
    document.getElementById("randomFact").textContent = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("factPopup").style.display = "block";

    // Close Pop-up
    window.closePopup = function() {
        document.getElementById("factPopup").style.display = "none";
    };

    // Dark Mode Toggle
    document.getElementById("darkModeToggle").addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });

    // Period Log
    document.getElementById("periodForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let startDate = document.getElementById("start_date").value;
        let endDate = document.getElementById("end_date").value;
        let flow = document.getElementById("flow").value;
        let notes = document.getElementById("notes").value;

        if (startDate && endDate) {
            let cycleList = document.getElementById("cycleList");
            let listItem = document.createElement("li");
            listItem.textContent = `Start: ${startDate}, End: ${endDate}, Flow: ${flow}, Notes: ${notes}`;
            cycleList.appendChild(listItem);

            updateCalendar(startDate, endDate);
            predictNextCycle(startDate, endDate);
        }
    });

    // Update Calendar View
    function updateCalendar(start, end) {
        document.getElementById("calendarView").innerHTML = `Last period: ${start} - ${end}`;
    }

    // Predict Next Cycle
    function predictNextCycle(start, end) {
        let startDate = new Date(start);
        let endDate = new Date(end);
        let avgCycle = (endDate - startDate) / (1000 * 60 * 60 * 24);

        let nextStart = new Date(endDate);
        nextStart.setDate(endDate.getDate() + avgCycle);

        let fertilityStart = new Date(nextStart);
        fertilityStart.setDate(nextStart.getDate() - 14);

        let fertilityEnd = new Date(fertilityStart);
        fertilityEnd.setDate(fertilityStart.getDate() + 4);

        document.getElementById("fertilityInfo").textContent =
            `Predicted next cycle: ${nextStart.toDateString()} 
             Fertile Window: ${fertilityStart.toDateString()} - ${fertilityEnd.toDateString()}`;
    }
});

    const reminderList = document.getElementById("reminderList");

    let cycles = [];
    let symptoms = [];
    let reminders = [];

    // Log period cycle
    periodForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const startDate = document.getElementById("start_date").value;
        const endDate = document.getElementById("end_date").value;
        const flow = document.getElementById("flow").value;
        const notes = document.getElementById("notes").value;

        const cycle = { startDate, endDate, flow, notes };
        cycles.push(cycle);
        updateCycleList();
        predictFertility();
    });

    function updateCycleList() {
        cycleList.innerHTML = "";
        cycles.forEach((cycle, index) => {
            const li = document.createElement("li");
            li.textContent = `Cycle ${index + 1}: ${cycle.startDate} - ${cycle.endDate} | Flow: ${cycle.flow}`;
            cycleList.appendChild(li);
        });
    }

    function predictFertility() {
        if (cycles.length === 0) {
            fertilityInfo.textContent = "Enter at least one cycle to predict your ovulation window.";
            return;
        }

        const lastCycle = cycles[cycles.length - 1];
        const ovulationDay = new Date(lastCycle.startDate);
        ovulationDay.setDate(ovulationDay.getDate() + 14);

        const fertileStart = new Date(ovulationDay);
        fertileStart.setDate(fertileStart.getDate() - 3);
        const fertileEnd = new Date(ovulationDay);
        fertileEnd.setDate(fertileEnd.getDate() + 1);

        fertilityInfo.textContent = `Ovulation Day: ${ovulationDay.toDateString()}. Fertile Window: ${fertileStart.toDateString()} - ${fertileEnd.toDateString()}`;
    }

    // Log symptoms
    symptomForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const symptom = document.getElementById("symptom").value;
        const date = new Date().toISOString().split("T")[0];

        symptoms.push({ date, symptom });
        updateSymptomList();
    });

    function updateSymptomList() {
        symptomList.innerHTML = "";
        symptoms.forEach((s, index) => {
            const li = document.createElement("li");
            li.textContent = `${s.date}: ${s.symptom}`;
            symptomList.appendChild(li);
        });
    }

    // Set reminders
    reminderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const reminderDate = document.getElementById("reminder_date").value;
        const reminderText = document.getElementById("reminder_text").value;

        reminders.push({ reminderDate, reminderText });
        updateReminderList();
    });

    function updateReminderList() {
        reminderList.innerHTML = "";
        reminders.forEach((r, index) => {
            const li = document.createElement("li");
            li.textContent = `Reminder: ${r.reminderText} on ${r.reminderDate}`;
            reminderList.appendChild(li);
        });
    }
});

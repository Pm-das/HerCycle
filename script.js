document.addEventListener("DOMContentLoaded", () => {
    const periodForm = document.getElementById("periodForm");
    const cycleList = document.getElementById("cycleList");
    const fertilityInfo = document.getElementById("fertilityInfo");

    const symptomForm = document.getElementById("symptomForm");
    const symptomList = document.getElementById("symptomList");

    const reminderForm = document.getElementById("reminderForm");
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

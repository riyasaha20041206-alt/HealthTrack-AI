

let weight = document.getElementById("weight");
let bloodPressure = document.getElementById("bloodPressure");
let bloodSugar = document.getElementById("bloodSugar");
let heartRate = document.getElementById("heartRate");
let waterIntake = document.getElementById("waterIntake");
let sleepHours = document.getElementById("sleepHours");

let healthScoreElement = document.getElementById("healthScore");
let waterScoreElement = document.getElementById("waterScore");
let sleepScoreElement = document.getElementById("sleepScore");
let heartRateScoreElement = document.getElementById("heartRateScore");
let bloodSugarScoreElement = document.getElementById("bloodSugarScore");
let bloodPressureScoreElement = document.getElementById("bloodPressureScore");
let weightScoreElement = document.getElementById("weightScore");

let weeklyData = JSON.parse(localStorage.getItem("weeklyData")) || [];

let saveBtn = document.getElementById("saveBtn");


// Safely update an HTML element
function setText(element, value) {
    if (element) {
        element.textContent = value;
    }
}


// Calculate Health Score
function calculateHealthScore() {

    console.log("Days Completed:", weeklyData.length);

    // Health score cannot be calculated before 7 days
    if (weeklyData.length < 7) {

        setText(healthScoreElement, "-- / 100");

        setText(waterScoreElement, "-- / 20");
        setText(sleepScoreElement, "-- / 20");
        setText(heartRateScoreElement, "-- / 20");
        setText(bloodSugarScoreElement, "-- / 15");
        setText(bloodPressureScoreElement, "-- / 15");
        setText(weightScoreElement, "-- / 10");

        return;
    }


    // ---------------- WATER SCORE ----------------

    let goodWaterDays = 0;

    for (let i = 0; i < 7; i++) {

        if (weeklyData[i].waterIntake >= 2) {
            goodWaterDays++;
        }
    }

    let waterFinalScore = (goodWaterDays / 7) * 20;

    console.log("Good Water Days:", goodWaterDays);
    console.log("Water Score:", waterFinalScore);


    // ---------------- SLEEP SCORE ----------------

    let goodSleepDays = 0;

    for (let i = 0; i < 7; i++) {

        if (weeklyData[i].sleepHours >= 7) {
            goodSleepDays++;
        }
    }

    let sleepFinalScore = (goodSleepDays / 7) * 20;

    console.log("Good Sleep Days:", goodSleepDays);
    console.log("Sleep Score:", sleepFinalScore);


    // ---------------- HEART RATE SCORE ----------------

    let goodHeartRateDays = 0;

    for (let i = 0; i < 7; i++) {

        let heartRateValue = Number(weeklyData[i].heartRate);

        if (
            heartRateValue >= 60 &&
            heartRateValue <= 100
        ) {
            goodHeartRateDays++;
        }
    }

    let heartRateFinalScore = (goodHeartRateDays / 7) * 20;

    console.log("Good Heart Rate Days:", goodHeartRateDays);
    console.log("Heart Rate Score:", heartRateFinalScore);


    // ---------------- BLOOD SUGAR SCORE ----------------

    let goodBloodSugarDays = 0;

    for (let i = 0; i < 7; i++) {

        let sugar = Number(weeklyData[i].bloodSugar);

        if (
            sugar >= 70 &&
            sugar <= 99
        ) {
            goodBloodSugarDays++;
        }
    }

    let bloodSugarFinalScore = (goodBloodSugarDays / 7) * 15;

    console.log("Good Blood Sugar Days:", goodBloodSugarDays);
    console.log("Blood Sugar Score:", bloodSugarFinalScore);


    // ---------------- BLOOD PRESSURE SCORE ----------------

    let goodBloodPressureDays = 0;

    for (let i = 0; i < 7; i++) {

        let bp = String(weeklyData[i].bloodPressure).split("/");

        let systolic = Number(bp[0]);
        let diastolic = Number(bp[1]);

        if (
            systolic >= 90 &&
            systolic <= 120 &&
            diastolic >= 60 &&
            diastolic <= 80
        ) {
            goodBloodPressureDays++;
        }
    }

    let bloodPressureFinalScore =
        (goodBloodPressureDays / 7) * 15;

    console.log(
        "Good Blood Pressure Days:",
        goodBloodPressureDays
    );

    console.log(
        "Blood Pressure Score:",
        bloodPressureFinalScore
    );


    // ---------------- WEIGHT SCORE ----------------

    let totalWeight = 0;

    for (let i = 0; i < 7; i++) {
        totalWeight += Number(weeklyData[i].weight);
    }

    let averageWeight = totalWeight / 7;

    console.log("Average Weight:", averageWeight);


    let goodWeightDays = 0;

    for (let i = 0; i < 7; i++) {

        let difference = Math.abs(
            Number(weeklyData[i].weight) - averageWeight
        );

        if (difference <= 5) {
            goodWeightDays++;
        }
    }

    let weightFinalScore = (goodWeightDays / 7) * 10;

    console.log(
        "Good Weight Days:",
        goodWeightDays
    );

    console.log(
        "Weight Score:",
        weightFinalScore
    );


    // ---------------- FINAL HEALTH SCORE ----------------

    let totalHealthScore =
        waterFinalScore +
        sleepFinalScore +
        heartRateFinalScore +
        bloodSugarFinalScore +
        bloodPressureFinalScore +
        weightFinalScore;

    totalHealthScore = Math.round(totalHealthScore);

    console.log(
        "FINAL HEALTH SCORE:",
        totalHealthScore + "/100"
    );


    // Safely display scores

    setText(
        healthScoreElement,
        totalHealthScore + " / 100"
    );

    setText(
        waterScoreElement,
        waterFinalScore.toFixed(1) + " / 20"
    );

    setText(
        sleepScoreElement,
        sleepFinalScore.toFixed(1) + " / 20"
    );

    setText(
        heartRateScoreElement,
        heartRateFinalScore.toFixed(1) + " / 20"
    );

    setText(
        bloodSugarScoreElement,
        bloodSugarFinalScore.toFixed(1) + " / 15"
    );

    setText(
        bloodPressureScoreElement,
        bloodPressureFinalScore.toFixed(1) + " / 15"
    );

    setText(
        weightScoreElement,
        weightFinalScore.toFixed(1) + " / 10"
    );
}


// ---------------- SAVE BUTTON ----------------

if (saveBtn) {

    saveBtn.addEventListener("click", async function () {

        // Validate Weight
        if (weight.value === "") {
            alert("Please enter your weight");
            return;
        }


        // Validate Blood Pressure
        if (bloodPressure.value === "") {
            alert("Please enter Blood Pressure");
            return;
        }


        // Validate Blood Sugar
        if (bloodSugar.value === "") {
            alert("Please enter Blood Sugar");
            return;
        }


        // Validate Heart Rate
        if (heartRate.value === "") {
            alert("Please enter Heart Rate");
            return;
        }


        // Validate Water Intake
        if (waterIntake.value === "") {
            alert("Please enter Water Intake");
            return;
        }


        // Validate Sleep Hours
        if (sleepHours.value === "") {
            alert("Please enter Sleep Hours");
            return;
        }


        // Check 7 days limit
        if (weeklyData.length >= 7) {

            alert("7 days data already completed!");

            return;
        }


        // Today's health data
        let todayData = {

            weight: Number(weight.value),

            bloodPressure: bloodPressure.value,

            bloodSugar: Number(bloodSugar.value),

            heartRate: Number(heartRate.value),

            waterIntake: Number(waterIntake.value),

            sleepHours: Number(sleepHours.value)
        };


        // Save data
        weeklyData.push(todayData);


        localStorage.setItem(
            "weeklyData",
            JSON.stringify(weeklyData)
        );


        console.log(
            "Today's Data:",
            todayData
        );

        console.log(
            "Weekly Data:",
            weeklyData
        );

        console.log(
            "Days Completed:",
            weeklyData.length
        );


        // Calculate health score
        calculateHealthScore();


        // Send to Render backend after 7 days
        if (weeklyData.length === 7) {

            await sendDataToBackend();

        }


        alert("Data Saved Successfully!");

    });

}


// ---------------- SEND DATA TO BACKEND ----------------

async function sendDataToBackend() {

    try {

        const response = await fetch(
            "https://healthtrack-ai-oydh.onrender.com/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    healthData: weeklyData
                })
            }
        );


        const result = await response.json();


        console.log(
            "Backend Response:",
            result
        );


        localStorage.setItem(
            "healthAnalysis",
            JSON.stringify(result)
        );


        console.log(
            "AI RESULT SAVED:",
            result
        );


    } catch (error) {

        console.error(
            "Backend Error:",
            error
        );

    }
}

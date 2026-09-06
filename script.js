

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


// ======================================
// HEALTH SCORE CALCULATION FUNCTION
// ======================================

function calculateHealthScore() {

    // Need exactly 7 days
    if (weeklyData.length < 7) {
        console.log("Days Completed:", weeklyData.length);
        healthScoreElement.textContent = "-- / 100";
        return;
    }


    // ======================================
    // WATER SCORE - 20
    // ======================================

    let goodWaterDays = 0;

    for (let i = 0; i < 7; i++) {
        if (weeklyData[i].waterIntake >= 2) {
            goodWaterDays++;
        }
    }

    let waterFinalScore = (goodWaterDays / 7) * 20;

    console.log("Good Water Days:", goodWaterDays);
    console.log("Water Score:", waterFinalScore);


    // ======================================
    // SLEEP SCORE - 20
    // ======================================

    let goodSleepDays = 0;

    for (let i = 0; i < 7; i++) {
        if (weeklyData[i].sleepHours >= 7) {
            goodSleepDays++;
        }
    }

    let sleepFinalScore = (goodSleepDays / 7) * 20;

    console.log("Good Sleep Days:", goodSleepDays);
    console.log("Sleep Score:", sleepFinalScore);


    // ======================================
    // HEART RATE SCORE - 20
    // ======================================

    let goodHeartRateDays = 0;

    for (let i = 0; i < 7; i++) {

        let heartRateValue = weeklyData[i].heartRate;

        if (heartRateValue >= 60 && heartRateValue <= 100) {
            goodHeartRateDays++;
        }
    }

    let heartRateFinalScore = (goodHeartRateDays / 7) * 20;

    console.log("Good Heart Rate Days:", goodHeartRateDays);
    console.log("Heart Rate Score:", heartRateFinalScore);


    // ======================================
    // BLOOD SUGAR SCORE - 15
    // ======================================

    let goodBloodSugarDays = 0;

    for (let i = 0; i < 7; i++) {

        let sugar = weeklyData[i].bloodSugar;

        if (sugar >= 70 && sugar <= 99) {
            goodBloodSugarDays++;
        }
    }

    let bloodSugarFinalScore = (goodBloodSugarDays / 7) * 15;

    console.log("Good Blood Sugar Days:", goodBloodSugarDays);
    console.log("Blood Sugar Score:", bloodSugarFinalScore);


    // ======================================
    // BLOOD PRESSURE SCORE - 15
    // ======================================

    let goodBloodPressureDays = 0;

    for (let i = 0; i < 7; i++) {

        let bp = weeklyData[i].bloodPressure.split("/");

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

    let bloodPressureFinalScore = (goodBloodPressureDays / 7) * 15;

    console.log("Good Blood Pressure Days:", goodBloodPressureDays);
    console.log("Blood Pressure Score:", bloodPressureFinalScore);


    // ======================================
    // WEIGHT SCORE - 10
    // ======================================

    let totalWeight = 0;

    for (let i = 0; i < 7; i++) {
        totalWeight += weeklyData[i].weight;
    }

    let averageWeight = totalWeight / 7;

    console.log("Average Weight:", averageWeight);


    let goodWeightDays = 0;

    for (let i = 0; i < 7; i++) {

        let difference = Math.abs(
            weeklyData[i].weight - averageWeight
        );

        if (difference <= 5) {
            goodWeightDays++;
        }
    }

    let weightFinalScore = (goodWeightDays / 7) * 10;

    console.log("Good Weight Days:", goodWeightDays);
    console.log("Weight Score:", weightFinalScore);


    // ======================================
    // FINAL HEALTH SCORE - 100
    // ======================================

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


    // Show score on webpage

    healthScoreElement.textContent =
        totalHealthScore + " / 100";

    waterScoreElement.textContent =
        waterFinalScore.toFixed(1) + " / 20";

    sleepScoreElement.textContent =
        sleepFinalScore.toFixed(1) + " / 20";

    heartRateScoreElement.textContent =
        heartRateFinalScore.toFixed(1) + " / 20";

    bloodSugarScoreElement.textContent =
        bloodSugarFinalScore.toFixed(1) + " / 15";

    bloodPressureScoreElement.textContent =
        bloodPressureFinalScore.toFixed(1) + " / 15";

    weightScoreElement.textContent =
        weightFinalScore.toFixed(1) + " / 10";
}


// ======================================
// SAVE TODAY'S DATA
// ======================================

saveBtn.addEventListener("click", async function () {

    // Validation

    if (weight.value === "") {
        alert("Please enter your weight");
        return;
    }

    if (bloodPressure.value === "") {
        alert("Please enter Blood Pressure");
        return;
    }

    if (bloodSugar.value === "") {
        alert("Please enter Blood Sugar");
        return;
    }

    if (heartRate.value === "") {
        alert("Please enter Heart Rate");
        return;
    }

    if (waterIntake.value === "") {
        alert("Please enter Water Intake");
        return;
    }

    if (sleepHours.value === "") {
        alert("Please enter Sleep Hours");
        return;
    }


    // ======================================
    // TODAY'S DATA
    // ======================================

    let todayData = {

        weight: Number(weight.value),

        bloodPressure: bloodPressure.value,

        bloodSugar: Number(bloodSugar.value),

        heartRate: Number(heartRate.value),

        waterIntake: Number(waterIntake.value),

        sleepHours: Number(sleepHours.value)
    };


    // ======================================
    // CHECK MAX 7 DAYS
    // ======================================

    if (weeklyData.length >= 7) {

        alert("7 days data already completed!");

        return;
    }


    // Add today's data

    weeklyData.push(todayData);


    // Save to Local Storage

    localStorage.setItem(
        "weeklyData",
        JSON.stringify(weeklyData)
    );


    console.log("Today's Data:", todayData);

    console.log("Weekly Data:", weeklyData);

    console.log(
        "Days Completed:",
        weeklyData.length
    );


    // Calculate Health Score

    calculateHealthScore();


    // ======================================
    // SEND DATA AFTER 7 DAYS
    // ======================================

    if (weeklyData.length === 7) {

        await sendDataToBackend();

    }


    alert("Data Saved Successfully!");

});


// ======================================
// CALCULATE SCORE WHEN PAGE OPENS
// ======================================

//calculateHealthScore();


// ======================================
// SEND DATA TO BACKEND
// ======================================

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


    } catch (error) {

        console.error(
            "Backend Error:",
            error
        );

    }
}


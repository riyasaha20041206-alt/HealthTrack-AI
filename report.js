
console.log("REPORT JS LOADED");


// ==========================================
// GET 7 DAYS DATA FROM LOCAL STORAGE
// ==========================================

let weeklyData =
    JSON.parse(localStorage.getItem("weeklyData")) || [];

console.log("Weekly Data:", weeklyData);
console.log("Days:", weeklyData.length);


// ==========================================
// GET HTML ELEMENTS
// ==========================================

let healthScoreElement =
    document.getElementById("healthScore");

let waterScoreElement =
    document.getElementById("waterScore");

let sleepScoreElement =
    document.getElementById("sleepScore");

let heartRateScoreElement =
    document.getElementById("heartRateScore");

let bloodSugarScoreElement =
    document.getElementById("bloodSugarScore");

let bloodPressureScoreElement =
    document.getElementById("bloodPressureScore");

let weightScoreElement =
    document.getElementById("weightScore");

let healthSummaryElement =
    document.getElementById("healthSummary");


// ==========================================
// CHECK 7 DAYS DATA
// ==========================================

if (weeklyData.length < 7) {

    healthScoreElement.textContent = "-- / 100";

    console.log("7 days data not completed");

} else {

    // ======================================
    // WATER SCORE - 20
    // ======================================

    let goodWaterDays = 0;

    for (let i = 0; i < 7; i++) {

        if (weeklyData[i].waterIntake >= 2) {
            goodWaterDays++;
        }

    }

    let waterScore =
        (goodWaterDays / 7) * 20;


    // ======================================
    // SLEEP SCORE - 20
    // ======================================

    let goodSleepDays = 0;

    for (let i = 0; i < 7; i++) {

        if (weeklyData[i].sleepHours >= 7) {
            goodSleepDays++;
        }

    }

    let sleepScore =
        (goodSleepDays / 7) * 20;


    // ======================================
    // HEART RATE SCORE - 20
    // ======================================

    let goodHeartRateDays = 0;

    for (let i = 0; i < 7; i++) {

        let heartRate =
            weeklyData[i].heartRate;

        if (
            heartRate >= 60 &&
            heartRate <= 100
        ) {
            goodHeartRateDays++;
        }

    }

    let heartRateScore =
        (goodHeartRateDays / 7) * 20;


    // ======================================
    // BLOOD SUGAR SCORE - 15
    // ======================================

    let goodBloodSugarDays = 0;

    for (let i = 0; i < 7; i++) {

        let sugar =
            weeklyData[i].bloodSugar;

        if (
            sugar >= 70 &&
            sugar <= 99
        ) {
            goodBloodSugarDays++;
        }

    }

    let bloodSugarScore =
        (goodBloodSugarDays / 7) * 15;


    // ======================================
    // BLOOD PRESSURE SCORE - 15
    // ======================================

    let goodBloodPressureDays = 0;

    for (let i = 0; i < 7; i++) {

        let bp =
            weeklyData[i].bloodPressure.split("/");

        let systolic =
            Number(bp[0]);

        let diastolic =
            Number(bp[1]);

        if (
            systolic >= 90 &&
            systolic <= 120 &&
            diastolic >= 60 &&
            diastolic <= 80
        ) {

            goodBloodPressureDays++;

        }

    }

    let bloodPressureScore =
        (goodBloodPressureDays / 7) * 15;


    // ======================================
    // WEIGHT SCORE - 10
    // ======================================

    let totalWeight = 0;

    for (let i = 0; i < 7; i++) {

        totalWeight +=
            weeklyData[i].weight;

    }

    let averageWeight =
        totalWeight / 7;


    let goodWeightDays = 0;

    for (let i = 0; i < 7; i++) {

        let difference =
            Math.abs(
                weeklyData[i].weight -
                averageWeight
            );

        if (difference <= 5) {
            goodWeightDays++;
        }

    }

    let weightScore =
        (goodWeightDays / 7) * 10;


    // ======================================
    // FINAL HEALTH SCORE
    // ======================================

    let totalHealthScore =
        waterScore +
        sleepScore +
        heartRateScore +
        bloodSugarScore +
        bloodPressureScore +
        weightScore;

    totalHealthScore =
        Math.round(totalHealthScore);


    // ======================================
    // SHOW SCORES ON REPORT PAGE
    // ======================================

    healthScoreElement.textContent =
        totalHealthScore + " / 100";


    waterScoreElement.textContent =
        waterScore.toFixed(1) + " / 20";


    sleepScoreElement.textContent =
        sleepScore.toFixed(1) + " / 20";


    heartRateScoreElement.textContent =
        heartRateScore.toFixed(1) + " / 20";


    bloodSugarScoreElement.textContent =
        bloodSugarScore.toFixed(1) + " / 15";


    bloodPressureScoreElement.textContent =
        bloodPressureScore.toFixed(1) + " / 15";


    weightScoreElement.textContent =
        weightScore.toFixed(1) + " / 10";


    // ======================================
    // CONSOLE OUTPUT
    // ======================================

    console.log("==============================");
    console.log("WEEKLY REPORT");
    console.log("==============================");

    console.log(
        "Water Score:",
        waterScore
    );

    console.log(
        "Sleep Score:",
        sleepScore
    );

    console.log(
        "Heart Rate Score:",
        heartRateScore
    );

    console.log(
        "Blood Sugar Score:",
        bloodSugarScore
    );

    console.log(
        "Blood Pressure Score:",
        bloodPressureScore
    );

    console.log(
        "Weight Score:",
        weightScore
    );

    console.log(
        "FINAL HEALTH SCORE:",
        totalHealthScore + "/100"
    );


    // ======================================
    // AI HEALTH SUMMARY
    // ======================================

    healthSummaryElement.innerHTML = "";


    // Water recommendation

    if (waterScore < 20) {

        let li =
            document.createElement("li");

        li.textContent =
            "Your water intake was low on some days. Try to increase your daily water intake.";

        healthSummaryElement.appendChild(li);

    } else {

        let li =
            document.createElement("li");

        li.textContent =
            "Excellent water intake throughout the week.";

        healthSummaryElement.appendChild(li);

    }


    // Sleep recommendation

    if (sleepScore < 20) {

        let li =
            document.createElement("li");

        li.textContent =
            "Your sleep was below 7 hours on some days. Try to maintain a regular sleep schedule.";

        healthSummaryElement.appendChild(li);

    } else {

        let li =
            document.createElement("li");

        li.textContent =
            "Excellent sleep consistency this week.";

        healthSummaryElement.appendChild(li);

    }


    // Heart rate recommendation

    if (heartRateScore < 20) {

        let li =
            document.createElement("li");

        li.textContent =
            "Heart rate was outside the selected normal range on some days.";

        healthSummaryElement.appendChild(li);

    } else {

        let li =
            document.createElement("li");

        li.textContent =
            "Heart rate remained within the selected normal range on most days.";

        healthSummaryElement.appendChild(li);

    }


    // Blood sugar recommendation

    if (bloodSugarScore < 15) {

        let li =
            document.createElement("li");

        li.textContent =
            "Blood sugar was outside the selected target range on some days.";

        healthSummaryElement.appendChild(li);

    } else {

        let li =
            document.createElement("li");

        li.textContent =
            "Blood sugar remained within the selected target range throughout the week.";

        healthSummaryElement.appendChild(li);

    }


    // Blood pressure recommendation

    if (bloodPressureScore < 15) {

        let li =
            document.createElement("li");

        li.textContent =
            "Blood pressure was outside the selected range on some days.";

        healthSummaryElement.appendChild(li);

    } else {

        let li =
            document.createElement("li");

        li.textContent =
            "Blood pressure remained within the selected range throughout the week.";

        healthSummaryElement.appendChild(li);

    }


    // Weight recommendation

    if (weightScore < 10) {

        let li =
            document.createElement("li");

        li.textContent =
            "Your weight varied during the week. Continue monitoring your weight regularly.";

        healthSummaryElement.appendChild(li);

    } else {

        let li =
            document.createElement("li");

        li.textContent =
            "Your weight remained relatively stable this week.";

        healthSummaryElement.appendChild(li);

    }


    // Final summary

    let finalLi =
        document.createElement("li");

    finalLi.textContent =
        "Your overall weekly health score is " +
        totalHealthScore +
        " out of 100.";

    healthSummaryElement.appendChild(finalLi);


    // ======================================
    // SHOW 7 DAYS DATA
    // ======================================

    console.log("==============================");
    console.log("7 DAYS HEALTH DATA");
    console.log("==============================");

    console.table(weeklyData);

}
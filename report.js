
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

    //healthSummaryElement.innerHTML = "";


    // Water recommendation

    //if (waterScore < 20) {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Your water intake was low on some days. Try to increase your daily water intake.";

    //     healthSummaryElement.appendChild(li);

    // } else {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Excellent water intake throughout the week.";

    //     healthSummaryElement.appendChild(li);

    // }


    // // Sleep recommendation

    // if (sleepScore < 20) {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Your sleep was below 7 hours on some days. Try to maintain a regular sleep schedule.";

    //     healthSummaryElement.appendChild(li);

    // } else {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Excellent sleep consistency this week.";

    //     healthSummaryElement.appendChild(li);

    // }


    // // Heart rate recommendation

    // if (heartRateScore < 20) {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Heart rate was outside the selected normal range on some days.";

    //     healthSummaryElement.appendChild(li);

    // } else {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Heart rate remained within the selected normal range on most days.";

    //     healthSummaryElement.appendChild(li);

    // }


    // // Blood sugar recommendation

    // if (bloodSugarScore < 15) {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Blood sugar was outside the selected target range on some days.";

    //     healthSummaryElement.appendChild(li);

    // } else {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Blood sugar remained within the selected target range throughout the week.";

    //     healthSummaryElement.appendChild(li);

    // }


    // // Blood pressure recommendation

    // if (bloodPressureScore < 15) {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Blood pressure was outside the selected range on some days.";

    //     healthSummaryElement.appendChild(li);

    // } else {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Blood pressure remained within the selected range throughout the week.";

    //     healthSummaryElement.appendChild(li);

    // }


    // // Weight recommendation

    // if (weightScore < 10) {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Your weight varied during the week. Continue monitoring your weight regularly.";

    //     healthSummaryElement.appendChild(li);

    // } else {

    //     let li =
    //         document.createElement("li");

    //     li.textContent =
    //         "Your weight remained relatively stable this week.";

    //     healthSummaryElement.appendChild(li);

    // }


    // Final summary

    // let finalLi =
    //     document.createElement("li");

    // finalLi.textContent =
    //     "Your overall weekly health score is " +
    //     totalHealthScore +
    //     " out of 100.";

    // healthSummaryElement.appendChild(finalLi);


    // ======================================
    // SHOW 7 DAYS DATA
    // ======================================

    console.log("==============================");
    console.log("7 DAYS HEALTH DATA");
    console.log("==============================");

    console.table(weeklyData);

}


// ==========================================
// SVG WEIGHT TREND CHART
// ==========================================

function createWeightChart() {

    let chartContainer = document.getElementById("weightChart");

    if (!chartContainer) {
        return;
    }

    // Clear placeholder
    chartContainer.innerHTML = "";

    // If no data
    if (weeklyData.length === 0) {
        chartContainer.textContent = "No weight data available";
        return;
    }

    // Get weight values
    let weights = weeklyData.map(day => Number(day.weight));

    console.log("Weight Data:", weights);

    // SVG dimensions
    let width = 400;
    let height = 100;

    let padding = 25;

    // Find minimum and maximum weight
    let minWeight = Math.min(...weights);
    let maxWeight = Math.max(...weights);

    // Prevent same min/max problem
    if (minWeight === maxWeight) {
        minWeight -= 1;
        maxWeight += 1;
    }

    // Create SVG
    let svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100");

    // ======================================
    // DRAW LINE
    // ======================================

    let points = [];

    weights.forEach((weight, index) => {

        let x =
            padding +
            index *
            ((width - 2 * padding) /
            Math.max(weights.length - 1, 1));

        let y =
            height -
            padding -
            ((weight - minWeight) /
            (maxWeight - minWeight)) *
            (height - 2 * padding);

        points.push(`${x},${y}`);
    });

    let polyline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline"
    );

    polyline.setAttribute(
        "points",
        points.join(" ")
    );

    polyline.setAttribute(
        "fill",
        "none"
    );

    polyline.setAttribute(
        "stroke",
       "#8B0000"
    );

    polyline.setAttribute(
        "stroke-width",
        "3"
    );

    polyline.setAttribute(
        "stroke-linecap",
        "round"
    );

    polyline.setAttribute(
        "stroke-linejoin",
        "round"
    );

    svg.appendChild(polyline);


    // ======================================
    // DRAW POINTS
    // ======================================

    weights.forEach((weight, index) => {

        let x =
            padding +
            index *
            ((width - 2 * padding) /
            Math.max(weights.length - 1, 1));

        let y =
            height -
            padding -
            ((weight - minWeight) /
            (maxWeight - minWeight)) *
            (height - 2 * padding);

        let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "3.5");
        circle.setAttribute("fill", "#8B0000");

        svg.appendChild(circle);


        // Weight value above point
        let valueText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        valueText.setAttribute("x", x);
        valueText.setAttribute("y", y - 10);
        valueText.setAttribute("text-anchor", "middle");
        valueText.setAttribute("fill", "black");
        valueText.setAttribute("font-size", "10");
        valueText.textContent = weight + " kg";

        svg.appendChild(valueText);


        // Day label
        let dayText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        dayText.setAttribute("x", x);
        dayText.setAttribute("y", height - 10);
        dayText.setAttribute("text-anchor", "middle");
        dayText.setAttribute("fill", "black");
        dayText.setAttribute("font-size", "9");

        dayText.textContent = "Day " + (index + 1);

        svg.appendChild(dayText);

    });


    // Add SVG to chart container
    chartContainer.appendChild(svg);
}


// ==========================================
// CALL WEIGHT CHART
// ==========================================

createWeightChart();

// ==========================================
// SVG WATER INTAKE TREND CHART
// ==========================================

function createWaterChart() {

    let chartContainer = document.getElementById("waterChart");

    if (!chartContainer) return;

    chartContainer.innerHTML = "";

    if (weeklyData.length === 0) {
        chartContainer.textContent = "No water data available";
        return;
    }

    let values = weeklyData.map(day => Number(day.waterIntake));

    let width = 400;
    let height = 100;
    let padding = 25;

    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);

    if (minValue === maxValue) {
        minValue -= 1;
        maxValue += 1;
    }

    let svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100");

    let points = [];

    values.forEach((value, index) => {

        let x = padding +
            index *
            ((width - 2 * padding) /
            Math.max(values.length - 1, 1));

        let y = height -
            padding -
            ((value - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);

        points.push(`${x},${y}`);
    });

    let polyline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline"
    );

    polyline.setAttribute("points", points.join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "#8B0000");
    polyline.setAttribute("stroke-width", "3");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke-linejoin", "round");

    svg.appendChild(polyline);

    values.forEach((value, index) => {

        let x = padding +
            index *
            ((width - 2 * padding) /
            Math.max(values.length - 1, 1));

        let y = height -
            padding -
            ((value - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);

        // Point
        let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "3.5");
        circle.setAttribute("fill", "#8B0000");

        svg.appendChild(circle);

        // Value
        let valueText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        valueText.setAttribute("x", x);
        valueText.setAttribute("y", y - 8);
        valueText.setAttribute("text-anchor", "middle");
        valueText.setAttribute("fill", "black");
        valueText.setAttribute("font-size", "9");

        valueText.textContent = value + " L";

        svg.appendChild(valueText);

        // Day
        let dayText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        dayText.setAttribute("x", x);
        dayText.setAttribute("y", height - 5);
        dayText.setAttribute("text-anchor", "middle");
        dayText.setAttribute("fill", "black");
        dayText.setAttribute("font-size", "9");

        dayText.textContent = "Day " + (index + 1);

        svg.appendChild(dayText);
    });

    chartContainer.appendChild(svg);
}

createWaterChart();



// ==========================================
// SVG SLEEP TREND CHART
// ==========================================

function createSleepChart() {

    let chartContainer = document.getElementById("sleepChart");

    if (!chartContainer) return;

    chartContainer.innerHTML = "";

    if (weeklyData.length === 0) {
        chartContainer.textContent = "No sleep data available";
        return;
    }

    let values = weeklyData.map(day => Number(day.sleepHours));

    let width = 400;
    let height = 100;
    let padding = 25;

    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);

    if (minValue === maxValue) {
        minValue -= 1;
        maxValue += 1;
    }

    let svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100");

    let points = [];

    values.forEach((value, index) => {

        let x = padding +
            index *
            ((width - 2 * padding) /
            Math.max(values.length - 1, 1));

        let y = height -
            padding -
            ((value - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);

        points.push(`${x},${y}`);
    });

    // Line
    let polyline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline"
    );

    polyline.setAttribute("points", points.join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "#8B0000");
    polyline.setAttribute("stroke-width", "3");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke-linejoin", "round");

    svg.appendChild(polyline);

    // Points + Labels
    values.forEach((value, index) => {

        let x = padding +
            index *
            ((width - 2 * padding) /
            Math.max(values.length - 1, 1));

        let y = height -
            padding -
            ((value - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);

        // Point
        let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "3.5");
        circle.setAttribute("fill", "#8B0000");

        svg.appendChild(circle);

        // Sleep value
        let valueText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        valueText.setAttribute("x", x);
        valueText.setAttribute("y", y - 8);
        valueText.setAttribute("text-anchor", "middle");
        valueText.setAttribute("fill", "black");
        valueText.setAttribute("font-size", "9");

        valueText.textContent = value + " h";

        svg.appendChild(valueText);

        // Day label
        let dayText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        dayText.setAttribute("x", x);
        dayText.setAttribute("y", height - 5);
        dayText.setAttribute("text-anchor", "middle");
        dayText.setAttribute("fill", "black");
        dayText.setAttribute("font-size", "9");

        dayText.textContent = "Day " + (index + 1);

        svg.appendChild(dayText);
    });

    chartContainer.appendChild(svg);
}

createSleepChart();


// ==========================================
// SVG HEART RATE TREND CHART
// ==========================================

function createHeartRateChart() {

    let chartContainer = document.getElementById("heartRateChart");

    if (!chartContainer) return;

    chartContainer.innerHTML = "";

    if (weeklyData.length === 0) {
        chartContainer.textContent = "No heart rate data available";
        return;
    }

    let values = weeklyData.map(day => Number(day.heartRate));

    let width = 400;
    let height = 100;
    let padding = 25;

    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);

    if (minValue === maxValue) {
        minValue -= 1;
        maxValue += 1;
    }

    let svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100");

    let points = [];

    values.forEach((value, index) => {

        let x = padding +
            index *
            ((width - 2 * padding) /
            Math.max(values.length - 1, 1));

        let y = height -
            padding -
            ((value - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);

        points.push(`${x},${y}`);
    });

    // Line
    let polyline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline"
    );

    polyline.setAttribute("points", points.join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "#8B0000");
    polyline.setAttribute("stroke-width", "3");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke-linejoin", "round");

    svg.appendChild(polyline);

    // Points + Labels
    values.forEach((value, index) => {

        let x = padding +
            index *
            ((width - 2 * padding) /
            Math.max(values.length - 1, 1));

        let y = height -
            padding -
            ((value - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);

        // Point
        let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "3.5");
        circle.setAttribute("fill", "#8B0000");

        svg.appendChild(circle);

        // Heart rate value
        let valueText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        valueText.setAttribute("x", x);
        valueText.setAttribute("y", y - 8);
        valueText.setAttribute("text-anchor", "middle");
        valueText.setAttribute("fill", "black");
        valueText.setAttribute("font-size", "9");

        valueText.textContent = value + " bpm";

        svg.appendChild(valueText);

        // Day label
        let dayText = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        dayText.setAttribute("x", x);
        dayText.setAttribute("y", height - 5);
        dayText.setAttribute("text-anchor", "middle");
        dayText.setAttribute("fill", "black");
        dayText.setAttribute("font-size", "9");

        dayText.textContent = "Day " + (index + 1);

        svg.appendChild(dayText);
    });

    chartContainer.appendChild(svg);
}

createHeartRateChart();


// ==========================================
// SVG BLOOD SUGAR TREND CHART
// ==========================================

function createBloodSugarChart() {

    let chartContainer =
        document.getElementById("bloodSugarChart");

    if (!chartContainer) return;

    chartContainer.innerHTML = "";

    if (weeklyData.length === 0) {
        chartContainer.textContent =
            "No blood sugar data available";
        return;
    }

    let values = weeklyData.map(day =>
        Number(day.bloodSugar)
    );

    let width = 400;
    let height = 100;
    let padding = 25;

    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);

    if (minValue === maxValue) {
        minValue -= 1;
        maxValue += 1;
    }

    let svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute(
        "viewBox",
        `0 0 ${width} ${height}`
    );

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100");

    let points = [];

    values.forEach((value, index) => {

        let x =
            padding +
            index *
            ((width - 2 * padding) /
            Math.max(values.length - 1, 1));

        let y =
            height -
            padding -
            ((value - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);

        points.push(`${x},${y}`);
    });

    // ======================================
    // LINE
    // ======================================

    let polyline =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
        );

    polyline.setAttribute(
        "points",
        points.join(" ")
    );

    polyline.setAttribute(
        "fill",
        "none"
    );

    polyline.setAttribute(
        "stroke",
        "#8B0000"
    );

    polyline.setAttribute(
        "stroke-width",
        "3"
    );

    polyline.setAttribute(
        "stroke-linecap",
        "round"
    );

    polyline.setAttribute(
        "stroke-linejoin",
        "round"
    );

    svg.appendChild(polyline);


    // ======================================
    // POINTS + LABELS
    // ======================================

    values.forEach((value, index) => {

        let x =
            padding +
            index *
            ((width - 2 * padding) /
            Math.max(values.length - 1, 1));

        let y =
            height -
            padding -
            ((value - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);


        // Point
        let circle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "3.5");
        circle.setAttribute(
            "fill",
            "#8B0000"
        );

        svg.appendChild(circle);


        // Blood Sugar Value
        let valueText =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );

        valueText.setAttribute("x", x);
        valueText.setAttribute(
            "y",
            y - 8
        );

        valueText.setAttribute(
            "text-anchor",
            "middle"
        );

        valueText.setAttribute(
            "fill",
            "black"
        );

        valueText.setAttribute(
            "font-size",
            "9"
        );

        valueText.textContent =
            value + " mg/dL";

        svg.appendChild(valueText);


        // Day Label
        let dayText =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );

        dayText.setAttribute("x", x);

        dayText.setAttribute(
            "y",
            height - 5
        );

        dayText.setAttribute(
            "text-anchor",
            "middle"
        );

        dayText.setAttribute(
            "fill",
            "black"
        );

        dayText.setAttribute(
            "font-size",
            "9"
        );

        dayText.textContent =
            "Day " + (index + 1);

        svg.appendChild(dayText);

    });

    chartContainer.appendChild(svg);
}

createBloodSugarChart();


// ==========================================
// SVG BLOOD PRESSURE TREND CHART
// ==========================================

function createBloodPressureChart() {

    let chartContainer =
        document.getElementById("bloodPressureChart");

    if (!chartContainer) return;

    chartContainer.innerHTML = "";

    if (weeklyData.length === 0) {
        chartContainer.textContent =
            "No blood pressure data available";
        return;
    }

    // Get systolic and diastolic values
    let systolicValues = weeklyData.map(day =>
        Number(day.bloodPressure.split("/")[0])
    );

    let diastolicValues = weeklyData.map(day =>
        Number(day.bloodPressure.split("/")[1])
    );

    let width = 400;
    let height = 100;
    let padding = 25;

    // Find overall min and max
    let allValues = [
        ...systolicValues,
        ...diastolicValues
    ];

    let minValue = Math.min(...allValues);
    let maxValue = Math.max(...allValues);

    if (minValue === maxValue) {
        minValue -= 1;
        maxValue += 1;
    }

    // Create SVG
    let svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute(
        "viewBox",
        `0 0 ${width} ${height}`
    );

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100");


    // ======================================
    // FUNCTION TO CREATE POINTS
    // ======================================

    function getPoints(values) {

        let points = [];

        values.forEach((value, index) => {

            let x =
                padding +
                index *
                ((width - 2 * padding) /
                Math.max(values.length - 1, 1));

            let y =
                height -
                padding -
                ((value - minValue) /
                (maxValue - minValue)) *
                (height - 2 * padding);

            points.push(`${x},${y}`);

        });

        return points;
    }


    // ======================================
    // SYSTOLIC LINE
    // ======================================

    let systolicPoints =
        getPoints(systolicValues);

    let systolicLine =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
        );

    systolicLine.setAttribute(
        "points",
        systolicPoints.join(" ")
    );

    systolicLine.setAttribute(
        "fill",
        "none"
    );

    systolicLine.setAttribute(
        "stroke",
        "#8B0000"
    );

    systolicLine.setAttribute(
        "stroke-width",
        "3"
    );

    systolicLine.setAttribute(
        "stroke-linecap",
        "round"
    );

    systolicLine.setAttribute(
        "stroke-linejoin",
        "round"
    );

    svg.appendChild(systolicLine);


    // ======================================
    // DIASTOLIC LINE
    // ======================================

    let diastolicPoints =
        getPoints(diastolicValues);

    let diastolicLine =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
        );

    diastolicLine.setAttribute(
        "points",
        diastolicPoints.join(" ")
    );

    diastolicLine.setAttribute(
        "fill",
        "none"
    );

    diastolicLine.setAttribute(
        "stroke",
        "#8B0000"
    );

    diastolicLine.setAttribute(
        "stroke-width",
        "2"
    );

    diastolicLine.setAttribute(
        "stroke-dasharray",
        "5,3"
    );

    svg.appendChild(diastolicLine);


    // ======================================
    // POINTS + LABELS
    // ======================================

    weeklyData.forEach((day, index) => {

        let systolic =
            systolicValues[index];

        let diastolic =
            diastolicValues[index];

        let x =
            padding +
            index *
            ((width - 2 * padding) /
            Math.max(weeklyData.length - 1, 1));


        // Systolic Y
        let systolicY =
            height -
            padding -
            ((systolic - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);


        // Diastolic Y
        let diastolicY =
            height -
            padding -
            ((diastolic - minValue) /
            (maxValue - minValue)) *
            (height - 2 * padding);


        // Systolic Point
        let systolicCircle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        systolicCircle.setAttribute(
            "cx",
            x
        );

        systolicCircle.setAttribute(
            "cy",
            systolicY
        );

        systolicCircle.setAttribute(
            "r",
            "3.5"
        );

        systolicCircle.setAttribute(
            "fill",
            "#8B0000"
        );

        svg.appendChild(systolicCircle);


        // Diastolic Point
        let diastolicCircle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        diastolicCircle.setAttribute(
            "cx",
            x
        );

        diastolicCircle.setAttribute(
            "cy",
            diastolicY
        );

        diastolicCircle.setAttribute(
            "r",
            "3"
        );

        diastolicCircle.setAttribute(
            "fill",
            "#8B0000"
        );

        svg.appendChild(diastolicCircle);


        // Blood Pressure Label
        let valueText =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );

        valueText.setAttribute(
            "x",
            x
        );

        valueText.setAttribute(
            "y",
            Math.min(
                systolicY,
                diastolicY
            ) - 7
        );

        valueText.setAttribute(
            "text-anchor",
            "middle"
        );

        valueText.setAttribute(
            "fill",
            "black"
        );

        valueText.setAttribute(
            "font-size",
            "8"
        );

        valueText.textContent =
            systolic + "/" + diastolic;

        svg.appendChild(valueText);


        // Day Label
        let dayText =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );

        dayText.setAttribute(
            "x",
            x
        );

        dayText.setAttribute(
            "y",
            height - 5
        );

        dayText.setAttribute(
            "text-anchor",
            "middle"
        );

        dayText.setAttribute(
            "fill",
            "black"
        );

        dayText.setAttribute(
            "font-size",
            "9"
        );

        dayText.textContent =
            "Day " + (index + 1);

        svg.appendChild(dayText);

    });


    // ======================================
    // LEGEND
    // ======================================

    let legend =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

    legend.setAttribute(
        "x",
        width - 25
    );

    legend.setAttribute(
        "y",
        12
    );

    legend.setAttribute(
        "text-anchor",
        "end"
    );

    legend.setAttribute(
        "fill",
        "black"
    );

    legend.setAttribute(
        "font-size",
        "8"
    );

    legend.textContent =
        "— Systolic   - - Diastolic";

    svg.appendChild(legend);


    chartContainer.appendChild(svg);
}

createBloodPressureChart();

async function getMCPHealthAnalysis() {
    try {
        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                healthData: weeklyData
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        console.log("MCP HEALTH ANALYSIS:", data);

        return data;

    } catch (error) {
        console.error("MCP Analysis Error:", error);
    }
}

async function getMCPHealthAnalysis() {
    try {
        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                healthData: weeklyData
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        console.log("MCP HEALTH ANALYSIS:", data);

        return data;

    } catch (error) {
        console.error("MCP Analysis Error:", error);
    }
}


async function loadMCPReport() {

    const response = await getMCPHealthAnalysis();

    if (!response) {
        console.error("No MCP response received");
        return;
    }

    const mcpData = JSON.parse(
        response.result.content[0].text
    );

    console.log("FINAL MCP REPORT DATA:", mcpData);


    // ======================================
    // SHOW SCORES
    // ======================================

    healthScoreElement.textContent =
        `${mcpData.healthScore} / 100`;

    waterScoreElement.textContent =
        `${mcpData.scores.water} / 20`;

    sleepScoreElement.textContent =
        `${mcpData.scores.sleep} / 20`;

    heartRateScoreElement.textContent =
        `${mcpData.scores.heartRate} / 20`;

    bloodSugarScoreElement.textContent =
        `${mcpData.scores.bloodSugar} / 15`;

    bloodPressureScoreElement.textContent =
        `${mcpData.scores.bloodPressure} / 15`;

    weightScoreElement.textContent =
        `${mcpData.scores.weight} / 10`;


    // ======================================
    // SHOW AI HEALTH SUMMARY
    // ======================================

    healthSummaryElement.innerHTML = "";

    let summary = mcpData.aiSummary;


    // Remove Markdown ### and ** symbols
    summary = summary
        .replace(/###/g, "")
        .replace(/\*\*/g, "");


    // Split into lines
    let lines = summary.split("\n");

    let html = "";

    let inList = false;


    lines.forEach(line => {

        line = line.trim();

        if (!line) return;


        // ==================================
        // HEADINGS
        // ==================================

        if (
            line.toLowerCase() === "personalized health summary" ||
            line.toLowerCase() === "7-day health summary" ||
            line.toLowerCase() === "practical recommendations"
        ) {

            if (inList) {
                html += "</ol>";
                inList = false;
            }

            html += `<h3>${line}</h3>`;
        }


        // ==================================
        // NUMBERED RECOMMENDATIONS
        // ==================================

        else if (/^\d+\.\s/.test(line)) {

            if (!inList) {
                html += "<ol>";
                inList = true;
            }

            let recommendation =
                line.replace(/^\d+\.\s*/, "");

            html += `<li>${recommendation}</li>`;
        }


        // ==================================
        // NORMAL PARAGRAPH
        // ==================================

        else {

            if (inList) {
                html += "</ol>";
                inList = false;
            }

            html += `<p>${line}</p>`;
        }

    });


    if (inList) {
        html += "</ol>";
    }


    // Show final formatted summary
    healthSummaryElement.innerHTML = html;

}


// ==========================================
// LOAD MCP REPORT
// ==========================================

loadMCPReport();
// ===============================
// DOWNLOAD PDF REPORT
// ===============================

document.getElementById("downloadBtn").addEventListener("click", async () => {

    const button = document.getElementById("downloadBtn");

    try {

        button.textContent = "Generating PDF...";
        button.disabled = true;

        const report = document.querySelector(".report-card");

        const canvas = await html2canvas(report, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        });

        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = 210;
        const pageHeight = 297;

        const margin = 10;

        const imgWidth = pageWidth - (margin * 2);

        const imgHeight =
            (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(
            imgData,
            "PNG",
            margin,
            position,
            imgWidth,
            imgHeight
        );

        heightLeft -= pageHeight - margin * 2;

        while (heightLeft > 0) {

            position = heightLeft - imgHeight + margin;

            pdf.addPage();

            pdf.addImage(
                imgData,
                "PNG",
                margin,
                position,
                imgWidth,
                imgHeight
            );

            heightLeft -= pageHeight - margin * 2;
        }

        pdf.save("HealthTrack-AI-Weekly-Report.pdf");

        button.textContent = "📄 Download PDF Report";
        button.disabled = false;

        console.log("PDF generated successfully!");

    } catch (error) {

        console.error("PDF Generation Error:", error);

        button.textContent = "📄 Download PDF Report";
        button.disabled = false;

        alert("Unable to generate PDF. Please try again.");
    }

});
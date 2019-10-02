$(document).ready(function () {

    const firebaseConfig = {
        apiKey: "AIzaSyC_NXp45q1_f_8YYVFGH2RNvevoUaiHqjw",
        authDomain: "trainscheduler-7d1af.firebaseapp.com",
        databaseURL: "https://trainscheduler-7d1af.firebaseio.com",
        projectId: "trainscheduler-7d1af",
        storageBucket: "",
        messagingSenderId: "179437553427",
        appId: "1:179437553427:web:9c3a1dd360226fabbebce6",
        measurementId: "G-0XZ3KS52KD"
      };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function(event){
    event.preventDefault()
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var firstTrainTime = $("#first-time-input").val().trim();
    var frequency = $("#freq-input").val().trim();

    console.log("thomas" + trainName)
    console.log("where we be" + destination)
    console.log("1st Time: " + firstTrainTime)
    console.log("Frequency: " + frequency)
    
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
      });
});

// Firebase watcher .on("child_added"
database.ref().on("child_added",function(snapshot) {
 var currentTime =  moment()
  var sv = snapshot.val();
  var randomTime = (sv.firstTrainTime);
  console.log(randomTime);
   if(currentTime < randomTime)
{

}  var randomFormat = "HH:mm";
  var convertedTime = moment(randomTime, randomFormat).subtract(1, "years");

console.log("CT: " + convertedTime)

// moment(currentTime).format("HH:mm")
console.log("current: " + moment(currentTime).format("HH:mm"))

var timeDiff = moment().diff(convertedTime, "minutes")
console.log("time diff: " + timeDiff)

var remainder = timeDiff % sv.frequency
// console.log("minAway: " + minAway)

var minAway = sv.frequency - remainder
console.log("minAway: " + minAway)

var trainIsHere = moment().add(minAway, "minutes")

console.log("train arrives: " + convertedTrainIsHere)

var convertedTrainIsHere = moment(trainIsHere).format("HH:mm")

// storing the snapshot.val() in a variable for convenience

console.log("TN: " + sv.trainName);
var trainRow = $("<tr>").append(
    $("<td>").text(sv.trainName),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency),
    $("<td>").text(convertedTrainIsHere),
    $("<td>").text(minAway),

)
 $(".train-data-here").append(trainRow)




});

}); 

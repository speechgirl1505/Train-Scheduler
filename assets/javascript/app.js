$(document).ready(function () {

const firebaseConfig = {
    apiKey: "AIzaSyCuaymKmBnFLmk0A4Bci0U3MNHH_FxVrUE",
    authDomain: "fir-project-2adfc.firebaseapp.com",
    databaseURL: "https://fir-project-2adfc.firebaseio.com",
    projectId: "fir-project-2adfc",
    storageBucket: "",
    messagingSenderId: "637065856827",
    appId: "1:637065856827:web:f06c58585c35a16454191e"
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
  var sv = snapshot.val();
  var randomTime = (sv.firstTrainTime);
  var randomFormat = "HH:mm";
  var convertedTime = moment(randomTime, randomFormat).subtract(1, "years");

// console.log("CT: " + convertedTime)

// console.log("TN: " + convertedTime.toNow());

var currentTime =  moment()

// moment(currentTime).format("HH:mm")
console.log("current: " + moment(currentTime).format("HH:mm"))

var timeDiff = moment().diff(moment(convertedTime), "minutes")
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

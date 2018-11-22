'use strict';
 
var https = require ('https');
var fetch = require("node-fetch");
const functions = require('firebase-functions');
const DialogFlowApp = require('actions-on-google').DialogFlowApp;
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  let action = request.body.queryResult.action;
    console.log(action);
    const parameters = request.body.queryResult.parameters;
    var elevatorId = parameters['number'];
    var buildingId = parameters ['number'];
    
  response.setHeader('Content-Type','applicaiton/json');
  if (action== 'input.getElevatorsDeployed'){
  	getElevatorsDeployed(response);
  	return;
  } 
  else if (action== 'input.getNeedElevatorStatus($number)') {
  	getNeedElevatorStatus(response, elevatorId);
  	return;
  } 
  else {
      getBuildingName(response, buildingId); 
      return; 
  }
  

});

function getElevatorsDeployed (CloudFnResponse) {
    var answers = {};
	fetch("https://rocketapi.azure-api.net/api/elevators/total").then(r => r.json()).then(response => {

	    var chat = response.length;
	    answers.elevator_total = chat;

	}).then(() => {
	fetch("https://rocketapi.azure-api.net/api/buildings/total").then(r => r.json()).then(response => {
	    
	    var chat = response.length;
	    answers.buildings_total = chat;

	}).then(() => { 
	 fetch("https://rocketapi.azure-api.net/api/elevators").then(r => r.json()).then(response => {
	     
	    var chat = response.length;
	    answers.elevators = chat;

	}).then(() => {
	  fetch("https://rocketapi.azure-api.net/api/city").then(r => r.json()).then(response => {
	     
	    var chat = response.length;
	    answers.city = chat;

	}).then(() => {
	    fetch("https://rocketapi.azure-api.net/api/quotes").then(r => r.json()).then(response => {
	     
	    var chat = response.length;
	    answers.quotes = chat;

	    
	}).then(() => {
	    fetch("https://rocketapi.azure-api.net/api/customers/total").then(r => r.json()).then(response => {
	     
	    var chat = response.length;
	    answers.customers_total = chat;

	}).then(() => {
	    fetch("https://rocketapi.azure-api.net/api/batteries/total").then(r => r.json()).then(response => {
	     
	    var chat = response.length;
	    answers.batteries_total = chat;

	}).then(() => {
	    fetch("https://rocketapi.azure-api.net/api/leads").then(r => r.json()).then(response => {
	     
	    var chat = response.length;
	    answers.leads = chat;
	    
	    CloudFnResponse.send(buildChatResponse("Bonjour/Hi! This is your daily Rocket Elevator Briefing: Today, there are currently " + answers.elevator_total + " elevators deployed in the " + answers.buildings_total + " buildings of your " + answers.customers_total + " customers. Please take care of my Trump Towers or I will call you Crooked Rocket Elevators. Currently, there is absolutely no Russian collusion and " + answers.elevators + " elevators are not in Running status and are being serviced. " + answers.batteries_total + " HUGE batteries are deployed across " + answers.city + " cities, none of them being shitholes of course. On another note, you currently have " + answers.quotes + " quotes awaiting to be processed... if you don't act now, YOU'RE FIRED!!! You also have " + answers.leads + " leads in your contact requests and unless they work at CNN and are therefore the ennemy of the people, or illegals, it's CLIENTS FIRST. They're great. With this being said, don't forget to follow me on twitter @realDonaldTrumpBot and MAKE AMERICA GREAT AGAIN!"));
	    
	});
	});
	});
	});
	});
	});
});
});
}

function getNeedElevatorStatus (CloudFnResponse, elevatorID) {
    fetch("https://rocketapi.azure-api.net/api/elevators/" + elevatorID).then(r => r.json()).then(response => {

            var status = response.status;
            var id = response.id;

    	    CloudFnResponse.send(buildChatResponse("The status of the great great elevators " + id + " is " + status));
    	    
        });
}

function getBuildingName (CloudFnResponse, buildingID) {
    fetch("https://rocketapi.azure-api.net/api/buildings/" + buildingID).then(r => r.json()).then(response => {

            var BuildingName = response.BuildingName;
            var id = response.id;

    	    CloudFnResponse.send(buildChatResponse("The name of the building " + id + " is " + BuildingName));
    	    
        });
    
}


function buildChatResponse(chat) {
	return JSON.stringify({"fulfillmentText": chat});
}


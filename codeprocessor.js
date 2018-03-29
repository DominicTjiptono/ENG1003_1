/**
 * Your header documentation here for _listen
 *    For your reference...
 * 		event will hold an Event object with the pixels in
 *   	event.detail.data and the timestamp in event.timeStamp
 */

// Creating data structure which represents the relationship between characters in plain text and characters in tap code (Step 1)

let codeAndText = [["e", "t", "a", "n", "d"], ["o", "i", "r", "u", "c"], ["s", "h", "m", "f", "p"], ["l", "y", "g", "v", "j"], ["w", "b", "x", "q", "z"]]; // a 5x5 array representing letters

// Declaring other variables

let rxCodeRef = document.getElementById("rx-code");
let rxTranslatedRef = document.getElementById("rx-translated");
let fullGap = 0;
let tap = 0;
let tapCode = "";
let str1 = ""; // String for the message from the user
let halfGap = 0;
let flag1 = 0;
let flag2 = 0;
let flag3 = 0;
let gentime = 0;
let gaptime = 0;
let eventTimeB1 = 0;
let totalTime = 0;
let border = 100;
let listeningLength;

// Flags to be used
let startTapFlag = false;
let endTapFlag = false;
let inTap = false;

_listen = function(event)
{
	// your code here
    // Conversion to grayscale (Step 2)
    let myObject = event;
    let grayscale = 0;
    let arrayForRGB = event.detail.data;
    // Using a loop to convert RGB of each pixel into grayscale
    for (let i = 0; i < arrayForRGB.length; i += 4){
        let avgOfRGB = (event.detail.data[i] + event.detail.data[i + 1] + event.detail.data[i + 2]); // Excluding event.detail.data[i + 3] (which is the alpha component of each pixel)
        event.detail.data[i] = Math.round(avgOfRGB);
        event.detail.data[i + 1] = Math.round(avgOfRGB);
        event.detail.data[i + 2] = Math.round(avgOfRGB);
        grayscale += avgOfRGB;
    }
    let average = Math.round(grayscale/400);
    let avgOutputString = "The average value for grayscale is ";
    console.log(avgOutputString + average); // testing only
    
    // White/Black Duration (Step 3)
    
    // Checking whether the colour is white or black
    
    listeningLength = listening.tapgap.length;
    tapCode = "";
    for (i = 0; i < listeningLength; i++){
        if (listening.tapgap[i]=="Black"){
            if (tapCode !== ""){
                totalTime += listening.timing[i] - listening.timing[i - 1]; 
            }
            else if (listening.tapgap[i]=="White"){
                if (listening.tapgap[i-1]!=="White"){
                    tapCode += "*";
                    totalTime = 0;
                }
            }
            if (totalTime > 450 && totalTime < 600){
                tapCode+=" ";
            }
        }
    }
};

/**
 * Your header documentation here for clear
 */
clear = function()
{
	// your code here
    str1 = ""; // Resetting str1 (message string) into nothing at all
    tapCode = ""; // Resetting tapCode into nothing at all
};

/**
 * Your header documentation here for translate
 */
translate = function()
{
	// your code here
     // Converting into characters (Steps 5 and 7)
    
     for (let i = 0; i < str1.length; i++){
        let particularChar = str1.charAt[i]; // character at a particular index of str1
        if (particularChar = " "){ // if the particular character is a space
            // replace character with "wuw"
            particularChar = "wuw";
        }
        else if (particularChar = "k"){ // if the particular character is "k"
            // replace character with "qc"
            particularChar = "qc";
        }
        // else, match each character of str1 with the codeAndText array
        for (let j = 0; j < codeAndText.length; j++){ // accessing each row of codeAndText array
            for (let k = 0; k < codeAndText.length; k++){ // accessing each column of codeAndText array
                // If the character matches with an element in the codeAndText array
                if (particularChar.equals(codeAndText[j][k])){
                    // Add the tapCode string with asterisks
                    tapCode += "*" * j + " " + "*" * k + " ";
                }
            }
        }
 }
            
    console.log(tapCode); // Testing only
    
    // Displaying output and clearing (Step 8)
    
    rxCodeRef.innerHTML = str1; // coded version of the message
    rxTranslatedRef.innerHTML = tapCode; // translated version of the message
};
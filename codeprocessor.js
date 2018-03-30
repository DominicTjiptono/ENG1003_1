/**
 * Your header documentation here for _listen
 *    For your reference...
 * 		event will hold an Event object with the pixels in
 *   	event.detail.data and the timestamp in event.timeStamp
 */

// Step 1: Using data type 2D Array to store the 25 characters
let characters=[
    ["e","t","a","n","d"],
    ["o","i","r","u","c"],
    ["s","h","m","f","p"],
    ["l","y","g","v","j"],
    ["w","b","x","q","z"]
];

// Declaring variables

let red=0;
let green=0;
let blue=0;
var listening={
    tapgap:[],
    timing:[]
};
let output="";
let totaltime=0;
let code="";
let final=[];
let finalcode=[];

let rxcodeRef=document.getElementById("rx-code");
let rxtranslatedRef=document.getElementById("rx-translated");

_listen = function(event)
{
    // Step 2: Conversion to grayscale 
	for (let i=0; i<1600; i=i+4)
        {
            red+=event.detail.data[i];
            green+=event.detail.data[i+1];
            blue+=event.detail.data[i+2];
            // event.detail.data[i + 3] is ignored because it represents alpha values
        }
    
    // Calculating average value of red, green, and blue elements out of 400 values of red, green, and blue taken in the 'event.detail.data' array
    // Average value of red, green, and blue for one square is (red + green + blue)/3
    // Hence, average value of red, green, and blue for 400 squares = avg for one square/400
    //                                                              = ((red + green + blue)/3)*(1/400)
    //                                                              = (red + green + blue)/1200
    avg=(red+green+blue)/1200;
    
    // Step 3: White/Black Duration
    
    if (avg<(255/2))
        {
            listening.tapgap.push("Black"); // Black square detected
            listening.timing.push(event.timeStamp);
        }
    else
        {
            listening.tapgap.push("White"); // White square detected
            listening.timing.push(event.timeStamp);   
        }
    
    listeninglength=listening.tapgap.length;
    code="";
    // Checking each element of the 'listening' array
    for(i=0; i<listeninglength; i++)
        {
            if(listening.tapgap[i]=="Black")
                {
                    if (code!=="")
                        {
                            totaltime+=listening.timing[i]-listening.timing[i-1];
                        }
                }
            else if(listening.tapgap[i]=="White")
                {
                    if(listening.tapgap[i-1]!=="White")
                        {
                            code+="*";
                            totaltime=0;
                            // The white square represents a tap
                        }
                }
            
            // Step 4: Determining whether the black square represents a half-gap or a full-gap by checking the value of 'totaltime'
            if (totaltime>450 && totaltime<600)
                {
                    code+=" ";
                }
        }
    // Resetting values of red, green, and blue to 0
    red=0;
    green=0;
    blue=0;
};

/**
 * Your header documentation here for clear
 */
clear = function()
{
    // Resetting the current state message
    code = "";
    output = "";
    // Showing empty strings for 'code' and 'output' variables in the website
    rxcodeRef.innerHTML=code;
    rxtranslatedRef.innerHTML=output;
};

/**
 * Your header documentation here for translate
 */
translate = function()
{
    // Step 5: Conversion to characters
    // Showing the original code as an output (Step 8)
    rxcodeRef.innerHTML=code;
	code=code.split(" ");
    for (let j=0;j<code.length;j++)
        {
            if (code[j]!=="")
                {
                    finalcode.push(code[j].length);
                }
        }
    
    for(i=0; i<finalcode.length;i+=2)
        {
            output += characters[finalcode[i]-1][finalcode[i+1]-1];
        }
    
    // Step 7: Convert special characters which are not in the 'characters' array (i.e. spaces and "k")
    output=output.replace(/wuw/g," ");
    output=output.replace(/qc/g,"k");
    
    // Showing the translated code as an output (Step 8)
    rxtranslatedRef.innerHTML=output; 
    
    // Calling clear function since we are done with our tap code conversion
    // Clear function helps us reuse the program without reloading
    clear;
};
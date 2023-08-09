/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();
/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessages = document.getElementById('all-messages');
const usernameElem = document.getElementById('username');
const messageElem = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
sendBtn.onclick = updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */
function updateDB(event) {
    //prevent the form/page from refreshing
    event.preventDefault();

    //store the data and values inside of a temporary object
    const data = {
        USERNAME: usernameElem.value,
        MESSAGE: messageElem.value
    }

    //write data object to the database
    database.push(data);

    //resetting the value of messageElem
    messageElem.value = '';
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on('child_added', addMessageToBoard);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessageToBoard(rowData) {
    //getting the object form of data from rowData
    const data = rowData.val();
    //print to console for good measure
    console.log(data);

    //create our single message with the appropriate data
    let singleMessageElem = makeSingleMessageHTML(data.USERNAME, data.MESSAGE);

    //appending the single message element to the allMessages div
    allMessages.append(singleMessageElem);
}
/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */
function makeSingleMessageHTML(usernameTxt, messageTxt) {
    //creating a new div element 
    let parentDiv = document.createElement('div');
    //adds a class of 'single-message' to parentDiv
    parentDiv.classList.add('single-message');

    //create a new p element
    let usernameP = document.createElement('p');
    //adds a class of 'single-message-username' to usernameP
    usernameP.classList.add('single-message-username');
    //updates innerHTML of usernameP to be the username
    usernameP.innerHTML = usernameTxt + ':';
    //appends usernameP to parentDiv
    parentDiv.append(usernameP);

    //create a new p element
    let messageP = document.createElement('p');
    messageP.innerHTML = messageTxt;
    //append messageP to parentDiv
    parentDiv.append(messageP);

    return parentDiv;
}
/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */
var BookmarkNameInput = document.getElementById('BookmarkName');
var BookmarkURLInput = document.getElementById('BookmarkURL');
var deletBbtn = document.getElementById('deleteBtn');
var visitBtn = document.getElementById('visitBtn');
var boxModel = document.getElementById('box');

var bookmarks = [];

// ! check if the bookmrk in localStorage
if(localStorage.getItem("bookmark") !== null){
    bookmarks = JSON.parse(localStorage.getItem("bookmark"));
    displayBookmarks(bookmarks);
}

// ! create bookmarks
function createBookmarks(){
    var bookmark = {
        name : BookmarkNameInput.value,
        url : BookmarkURLInput.value
    };
    return bookmark;
}

// ! add bookmark
function addBookmark(){
    // if(validNameAndURL() === true){
        var bookmark = createBookmarks();
        bookmarks.push(bookmark);
        console.log(bookmarks);
        clearInputs();
        setInLocalStorage();
        displayBookmarks();
    // }
    // else{
    //     var alertBox = `
    //     <div class="box-header mb-4 w-100 d-flex justify-content-between align-items-center">
    //         <div class="circles d-flex">
    //             <span class="rounded-circle me-1"></span>
    //             <span class="rounded-circle me-1"></span>
    //             <span class="rounded-circle"></span>
    //         </div>
    //         <button id="closeBtn" class="btn border-0" onclick="closeAlertBox()"><i class="fa-solid fa-xmark"></i></button>
    //     </div>
    //     <p class="h5 pb-3">Site Name or Url is not valid, Please follow the rules below :</p>
    //     <ol class="list-unstyled">
    //         <li>
    //             <i class="fa-regular fa-circle-right pe-1"></i>
    //             Site name must contain at least 3 characters
    //         </li>
    //         <li>
    //             <i class="fa-regular fa-circle-right pe-1"></i>
    //             Site URL must be a valid one
    //         </li>
    //     </ol>
    //     `;
    //     document.getElementById("box").innerHTML = alertBox;
    // }
}


// ! clear inputs
function clearInputs(){
    BookmarkNameInput.value = "";
    BookmarkURLInput.value = "";
}

// ! display rhe bookmarks in the table
function displayBookmarks(){
    var newBookmark = ``;
    for(var i = 0 ; i < bookmarks.length ; i++){
        newBookmark += `
        <tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>
        <td>
            <button id="visitBtn" onclick="visitBookmark(${i})" class="btn btn-visit">
                <i class="fa-solid fa-eye"></i>
                Visit
            </button>
        </td>
        <td>
            <button id="deleteBtn" onclick="deleteBookmark(${i})" class="btn btn-delete">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>
        </td>
    </tr>
        `;
    }
    document.getElementById("tBody").innerHTML = newBookmark;
}

// ! save in localStorage
function setInLocalStorage(){
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
}

// ! delete bookmark
function deleteBookmark(index){
    // ! bookmark
    bookmarks.splice(index, 1);
    console.log(bookmarks);
    // ! table
    displayBookmarks();
    // !localStorage
    setInLocalStorage();
}

// ! visit bookmark
function visitBookmark(index){
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[index].url)) {
        open(bookmarks[index].url);
    } 
    else
    {
        open(`https://${bookmarks[index].url}.com`);
    }
}

// ! regex
// function validNameAndURL(){
//     var URLREGEX = /^https?:\/\//gm;
//     var nameRegex = /^\w{3,}(\s+\w+)*$/;
//     if(URLREGEX.test(BookmarkURLInput.value) === true && nameRegex.test(BookmarkNameInput.value === true)){
        
//         return true;
//     }
//     else{
        
//         return false;
//     }
// }
// ! close the alert box
function closeAlertBox(){
    boxModel.classList.add("d-none");
}
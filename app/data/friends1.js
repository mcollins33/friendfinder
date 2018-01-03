$(document).ready(function() {

    var dropdowns = [];
    var surveyResponse = [];
    var user;
    var friendlist = [];
    var selectedFriend;
    var index = -1;
    var users = [];
    var nameInput;
    var imageLink;

    function buildQuestion() {
        var questionArray = ["Are you an extrovert?", "Are you adventurous?", "Do you like to read?", "Are you a romantic?", "Are you frugal?", "Do you like sports?", "Do you like the outdoors?", "Do you like animals?", "Are you sensitive?", "Are you patient?"];
        var j = 1;
        var inputGroup = "<p>Name (Required)</p><input type='text' class='form-control' id='nameInput'><p>Link to Photo Image (Required)</p><input type='text' class='form-control' id='imageLink'>";
        $("#inputs").append(inputGroup);

        for (var i = 0; i < questionArray.length; i++) {
            $("#questions").append("<h3>Question " + j + "</h3>");
            $("#questions").append("<p>" + questionArray[i]);
            var dropdownID = "menu" + j;
            dropdowns.push(dropdownID);
            var dropdown = "<div><select class='chosen-select form-control' id=" + dropdownID + "><option></option><option>5 - Strongly Agree</option><option>4</option><option>3</option><option>2</option><option>1 - Strongly Disagree</option></select></div>";
            $("#questions").append(dropdown);
            j++;
        }
    }

    function NewUser(name, photo, scores) {
        this.name = name;
        this.photo = photo;
        this.scores = scores;
    };

    $("#submitbutton").on("click", function(event) {
        event.preventDefault();

        checkInputs();

        if (surveyResponse.length === 10) {
            user = new NewUser(nameInput, imageLink, surveyResponse);
            selectFriend();
            postNewUser();
            emptyContents();
            buildQuestion();
        }
    });

    function checkInputs() {
        surveyResponse = [];
        nameInput = $("#nameInput").val().trim();
        imageLink = $("#imageLink").val().trim();

        if (nameInput && imageLink) {
            for (var i = 0; i < dropdowns.length; i++) {
                var selection = $("#" + dropdowns[i] + "").val();
                console.log(selection);
                if (selection) {
                    checkResponse(selection);
                } else {
                    $("#inputerrortitle").text("You must answer all questions");
                    $("#inputerror").modal("show");
                }
            }
        } else {
            $("#inputerrortitle").text("You must provide input in all fields");
            $("#inputerror").modal("show");
        }
        console.log(surveyResponse);
    }

    function checkResponse(selection) {
        if (selection === "5 - Strongly Agree") {
            var response = 5;
            surveyResponse.push(response);
        } else if (selection === "1 - Strongly Disagree") {
            var response = 1;
            surveyResponse.push(response);
        } else {
            surveyResponse.push(parseInt(selection));
        }
    }

    function Friend(name, score) {
        this.name = name;
        this.score = score;
    };

    function selectFriend() {

        for (var j = 0; j < users.length; j++) {
            var score = 0;
            for (var i = 0; i < 10; i++) {
                // console.log(user.scores[i]);
                // console.log(users);
                score = score + Math.abs(user.scores[i] - parseInt(users[j].scores[i]));

            }
            var friend = new Friend(users[j].name, score);
            friendlist.push(friend);
        }
        findMinimum();
    }

    function importUsers() {
        var currentURL = window.location.origin;

        $.ajax({ url: currentURL + "/api/friends", method: "GET" })
            .done(function(userlist) {
                users = userlist;
            });
    }

    function postNewUser() {
        $.post("/api/friends", user,
            function(data) {
                $("#nameInput").val("");
                $("#imageLink").val("");
            })
    };

    function findWithAttr(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].name === value) {
                index = i;
            }
        }
    }

    function findMinimum() {
        friendlist.sort(function(a, b) {
            return a.score - b.score;
        })
        var min = friendlist[0];
        findWithAttr(users, min.name);
        displayMatch();
        $("#matchModal").modal("show");
    }

    function displayMatch() {
        $("#matchName").empty();
        $("#imageName").empty();
        $("#matchName").append(users[index].name);
        $("#imageName").append("<img src='" + users[index].photo + "'>");
    }

    function emptyContents() {
        $("#inputs").empty();
        $("#questions").empty();

        dropdowns = [];
        surveyResponse = [];
        user;
        friendlist = [];
        selectedFriend;
        index = -1;
    }

    buildQuestion();
    importUsers();

});
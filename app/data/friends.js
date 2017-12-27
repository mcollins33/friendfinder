$(document).ready(function() {

    var dropdowns = [];

    function buildQuestion() {
        var questionArray = ["Are you an extrovert", "Are you adventurous", "Do you like to read?", "Are you a romantic?", "Are you frugal?", "Do you like sports?", "Do you like the outdoors?", "Do you like animals?", "Are you sensitive?", "Are you patient?"];
        var j = 1;

        for (var i = 0; i < questionArray.length; i++) {
            $("#questions").append("Question " + j);
            $("#questions").append("<p>" + questionArray[i]);
            var dropdownID = "menu" + j;
            dropdowns.push(dropdownID);
            var dropdown = "<div class='input-group'><select class='form-control' id=" + dropdownID + "><option>Select</option><option>5 - Strongly Agree</option><option>4</option><option>3</option><option>2</option><option>1 - Strongly Disagree</option></select>";
            $("#questions").append(dropdown);
            j++;
        }
    }

    buildQuestion();

    var surveyResponse = [];
    var users = [{
            "name": "Ahmed",
            "photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg",
            "scores": [
                "5",
                "1",
                "4",
                "4",
                "5",
                "1",
                "2",
                "5",
                "4",
                "1"
            ]
        },
        {
            "name": "Jacob",
            "photo": "http://static2.businessinsider.com/image/5899ffcf6e09a897008b5c04-1200/.jpg",
            "scores": [
                "4",
                "2",
                "5",
                "1",
                "3",
                "2",
                "2",
                "1",
                "3",
                "2"
            ]
        },
        {
            "name": "Jeremiah",
            "photo": "https://avatars2.githubusercontent.com/u/8504998?v=3&s=460",
            "scores": [
                "5",
                "2",
                "2",
                "2",
                "4",
                "1",
                "3",
                "2",
                "5",
                "5"
            ]
        },
        {
            "name": "Louis",
            "photo": "https://pbs.twimg.com/profile_images/639214960049000449/lNCRC-ub.jpg",
            "scores": [
                "3",
                "3",
                "4",
                "2",
                "2",
                "1",
                "3",
                "2",
                "2",
                "3"
            ]
        },
        {
            "name": "Lou",
            "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAkDAAAAJDhhZTI5NTk2LWQzZjUtNDJjZi1hMTM2LTQ3ZjNmYjE0YmY2NA.jpg",
            "scores": [
                "4",
                "3",
                "4",
                "1",
                "5",
                "2",
                "5",
                "3",
                "1",
                "4"
            ]
        },
        {
            "name": "Jordan",
            "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAisAAAAJGUxYzc4YzA0LWQxMzUtNGI4NS04YTFiLTkwYzM0YTZkNzA2NA.jpg",
            "scores": [
                "4",
                "4",
                "2",
                "3",
                "2",
                "2",
                "3",
                "2",
                "4",
                "5"
            ]
        },
        {
            "name": "Taylor",
            "photo": "http://www.sepeb.com/profile-pictures/profile-pictures-005.jpg",
            "scores": [
                "3",
                "1",
                "5",
                "1",
                "4",
                "5",
                "3",
                "4",
                "5",
                "2"
            ]
        },
        {
            "name": "James",
            "photo": "http://www.maheshbabufans.com/wp-content/uploads/2013/05/profile-new-Copy-350x350.jpg",
            "scores": [
                "3",
                "3",
                "2",
                "4",
                "2",
                "4",
                "5",
                "5",
                "2",
                "1"
            ]
        }
    ];

    function NewUser(name, image, survey) {
        this.name = name;
        this.image = image;
        this.survey = survey;
    };

    var user;
    var friendlist = [];
    var selectedFriend;
    var index = -1;

    $("#submitbutton").on("click", function(event) {
        event.preventDefault();
        surveyResponse = [];
        for (var i = 0; i < dropdowns.length; i++) {
            var selection = $("#" + dropdowns[i] + "").val();
            // console.log(selection);
            checkResponse(selection);
        }

        var nameInput = $("#nameInput").val().trim();
        var imageLink = $("#imageLink").val().trim();
        user = new NewUser(nameInput, imageLink, surveyResponse);
        selectFriend();
        users.push(user);
    });

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
                score = score + Math.abs(user.survey[i] - parseInt(users[j].scores[i]));
            }
            var friend = new Friend(users[j].name, score);
            // console.log(friend);
            friendlist.push(friend);
        }
        // console.log(friendlist);
        findMinimum();
    }

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
        $("#matchName").append(users[index].name);
        console.log(users[index].photo);
        $("#imageName").append("<img src='" + users[index].photo + "'>");
    }

});
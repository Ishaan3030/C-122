var date = new Date()
let display_date = "Date: " + date.toLocaleDateString()

let predicted_emotion;

$(document).ready(function(){
    $("#display_date").html(display_date)
    $('#save_button').prop('disabled', true);
    displayBot()
})

$(function(){
    $("#predicted_button").click(function(){
        let input_data = {
            "text": $("text").val()
        }
        $.ajax({
            type: 'POST',
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: 'json',
            contentType: 'application/json',
            success: function(result){

                predicted_emotion = result.data.predicted_emotion
                emotion_img_url = result.data.predicted_emotion_img_url

                $("#prediction").html(predicted_emotion)
                $('#emotion__url').attr('src', emotion_img_url)

                $("#prediction").css("display","")
                $("#emotion__url").css("display","")

                $("#save__button").prop('disabled', false);
            },
            error: function (result){
                alert(result.responseJSON.message)
            }
        });
    });
});

$("#save__button").click(function (){
    save_data = {
        "date": display_date,
        "text": $("#text").val(),
        "emotion": predicted_emotion
    }
    $.ajax({
        type:'POST',
        url: '/save-entry',
        data: JSON.stringify(save_data),
        dataType: "json",
        contentType: 'application/json',
        success: function(){
            alert("Your entry has been saved succesfully!")
            window.location.reload()
        },
        error: function(result){
            alert(result.responseJSON.message)
        }
    });
});

function displayBot(){
    $('.chatbox__button').click(function(){
        $('chatbox_chat').toggle()
    });
    askBot()
}

function askBot(){
    $('#send_buttton').click(function(){
        var user_bot_input_text = $("#bot_input_text").val()

        if (user_bot_input_text != "") {
           
            $("#chat_messages").append('<div class="user__messages">' + user_bot_input_text + ' </div>')
            
            //Clear the text input box after sending message
            $("#bot_input_text").val('');

            let chat_input_data = {
                "user_bot_input_text": user_bot_input_text
            }
            //Write AJAX call here
            $.ajax({


            });

        }

    })
}
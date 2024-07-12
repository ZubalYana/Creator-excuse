//account pages changing
$('#SignIn').click(()=>{
    $('.SignInCon').css('display', 'flex')
    $('.logInCon').css('display', 'none')
    $('#SignIn').css('color', '#F5A006')
    $('#LogIn').css('color', '#000')
})
$('#LogIn').click(()=>{
    $('.logInCon').css('display', 'flex')
    $('.SignInCon').css('display', 'none')
    $('#SignIn').css('color', '#000')
    $('#LogIn').css('color', '#F5A006')
})
$('.createAnAccount').click(()=>{
    $('.SignInCon').css('display', 'flex')
    $('.logInCon').css('display', 'none')
    $('#SignIn').css('color', '#F5A006')
    $('#LogIn').css('color', '#000')
})
$('.alreadyHaveAccount').click(()=>{
    $('.logInCon').css('display', 'flex')
    $('.SignInCon').css('display', 'none')
    $('#SignIn').css('color', '#000')
    $('#LogIn').css('color', '#F5A006')
})


$(document).ready(function () {
    $('#signInBtn').click(async function () {
        const username = $('#Sign_name').val();
        const email = $('#Sign_email').val();
        const password = $('#Sign_password').val();
        console.log(username, email, password)
        try {
            const response = await axios.post('/auth/register', { username, password, email });
            // alert(response.data.message);
            $('#Sign_name').val('');
            $('#Sign_email').val('');
            $('#Sign_password').val('');
            $('.logInCon').css('display', 'flex')
            $('.SignInCon').css('display', 'none')
            $('#SignIn').css('color', '#000')
            $('#LogIn').css('color', '#F5A006')
            $('.feedbackMessage').css('display', 'flex')
            $('.feedbackMessage').text('Registration successfull!')
            setTimeout(() => {
                $('.feedbackMessage').css('display', 'none')
            }, 2000);


        } catch (error) {
            alert(error.response.data.message);
        }
    });

    $('#logInBtn').click(async function () {
        const email = $('#logIn_email').val();
        const password = $('#logIn_password').val();
        try {
            const response = await axios.post('/auth/login', { email, password });
            if (response.status === 200) {
                window.location.href = '/';
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    });

    
});
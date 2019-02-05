@extends('template.layout')

@section('header')
    <!-- Header Section for login page -->

@endsection

@section('content')
    <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}">
    <input type="text" name="email" id="email" required>
    <input type="password" name="password" id="password" required>
    <button onclick="login()">Log In</button>
    <div id="content"></div>

    <script type="text/javascript">
        
        function flash_error(data) {
            document.getElementById('content').innerHTML = JSON.stringify(data);
        }

        function login() {
            var email = $('#email').val();
            var password = $('#password').val();

            $.ajax({
                type    : 'POST',
                url     : '/auth/login',
                headers : {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data    : {
                    'email'   : email,
                    'password': password,
                },
                success: function(data) {
                    location.href = '/dashboard';
                },
                error: function(data) {
                    flash_error(data);
                }
            });
        }
    </script>
@endsection

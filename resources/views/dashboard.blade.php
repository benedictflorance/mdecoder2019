@extends('template.layout')

@section('header')
    <!-- Header Section for dashboard page -->

@endsection

@section('content')
    <input type="text" id="answer">
    <input type="number" id="question_id">
    <button onclick="submitAnswer()">Submit</button>
    <br>
    <button onclick="getQuestions()">Get questions</button>
    <button onclick="getPreviousDayQuestions()">Get previous day questions</button>
    <button onclick="updateLevel()">Next Level</button>
    <button onclick="updatePreviousDayLevel()">Previous day next Level</button>
    <button onclick="logout()">Logout</button>
    <div id="content"></div>
    <script type="text/javascript">

        function flash_error(response) {
            document.getElementById('content').innerHTML = JSON.stringify(response);
        }

        function submitAnswer() {
            var answer = $('#answer').val();
            var question_id = $('#question_id').val();
            $.ajax({
                type    : 'POST',
                url     : '/answer',
                headers : {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data    : {
                    'question_id' : question_id,
                    'answer'      : answer,
                },
                success: function(data) {
                    flash_error(data);
                },
                error: function(data) {
                    flash_error(data);
                }
            });
        }

        function getQuestions() {
            $.ajax({
                type    : 'GET',
                url     : '/questions',
                headers : {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(data) {
                    flash_error(data);
                },
                error: function(data) {
                    flash_error(data);
                }
            });
        }

        function getPreviousDayQuestions() {
            $.ajax({
                type    : 'GET',
                url     : '/questions',
                headers : {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data    : {
                    'prev_day_questions_flag' : 1,
                },
                success: function(data) {
                    flash_error(data);
                },
                error: function(data) {
                    flash_error(data);
                }
            });
        }

        function updateLevel() {

            $.ajax({
                type    : 'PUT',
                url     : '/level',
                headers : {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(data) {
                    flash_error(data);
                },
                error: function(data) {
                    flash_error(data);
                }
            });
        }

        function updatePreviousDayLevel() {

            $.ajax({
                type    : 'PUT',
                url     : '/level',
                headers : {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data    : {
                    'prev_day_questions_flag' : 1,
                },
                success: function(data) {
                    flash_error(data);
                },
                error: function(data) {
                    flash_error(data);
                }
            });
        }

        function logout() {

            $.ajax({
                type    : 'POST',
                url     : '/logout',
                headers : {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(data) {
                    flash_error(data);
                },
                error: function(data) {
                    flash_error(data);
                }
            });
        }
    </script>
</body>
</html>
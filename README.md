# Mdecoder 2019
An platform to host math puzzles for an online event in Pragyan 2019.

## Getting Started:

### Prerequisites:
* PHP >= 7.0.0
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* Tokenizer PHP Extension
* XML PHP Extension

### Installing:

1. First, download the Laravel installer using Composer:
```
    composer global require "laravel/installer"
```
2. Clone the project.
```
    git clone https://github.com/benedictflorance/mdecoder2019.git
```
3. Install all npm dependencies.
```
    sudo npm install
```
4. Copy .env.example as .env file.
```
    cp .env.example .env
```
5. Generate application key.
```
    php artisan key:generate
```
6. Fill details in .env file.
7. Install dependencies.
```
    composer install
```
8. Run migrations with seeds.
```
    php artisan migrate:fresh --seed
```
9. Make ReactJS Frontend For Laravel backend.
```
    php artisan preset react
```
10. Check for all npm dependencies
```
    sudo npm install
```
11. compile all of our assets and put bundled javascript file into the public >> js  >>  app.js file
```
    npm run dev
```
12. The project is now ready to be served. It can be done using the command,
```
    php artisan serve
```

## Built With:

* [Laravel](https://laravel.com) - a web framework

## Endpoints:
**Note**: All non-GET requests requires CSRF-token. Add this meta tag in every pages,<br>
`<meta name="csrf-token" content="{{ csrf_token() }}">`<br>
Add the following code in every AJAX Requests,
```
headers : {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
},
```

* `GET /login`
    * Returns a login page
    * File to be stored as `resources/views/base/user_login.blade.php`
* `POST /auth/login`
    * Creates a new user, if authenticated and does not exist in users table
    * Sets session for the user if authenticated
    * **Requires**: `email`, `password`
    * Response formats :
        * `json(['authenticated' => true])` with status `200`.
        * `json(['authenticated' => false, 'message' => 'Your email and password combination is incorrect'])` with status `401`.
* `POST /logout`
    * Unsets session if user is logged in.
* `GET /questions`
    * Returns questions according to the day and question difficulty of the user's status
    * **Requires**: `nil`
    * **Accepts**:  `prev_day_questions_flag`(boolean, use `0` or `1`, PHP typecasts `true` from JS to `"true"` :( )
    * If the parameter is true, previous day questions are returned, else the present day questions are returned.
    * Response formats :
        * `json(['gotQuestions' => true, 'data' => $questions])` with status `200`.
        * `json(['gotQuestions' => false, 'message' => 'Invalid day.'])` with status `404`.
        * `json(['gotQuestions' => false, 'message' => 'Internal server error'])` with status `500`.
* `PUT /level`
    * Update the question difficulty level of the user.
    * **Requires**: `nil`
    * **Accepts** : `prev_day_question_flag`(boolean, use `0` or `1`, PHP typecasts `true` from JS to `"true"` :( )
    * Response formats :
        * `json(['updated' => true, 'message' => 'Level updated.'])` with status `200`.
        * `json(['updated' => false, 'message' => 'User details doesn\'t exists.'])` with status `404`.
        * `json(['updated' => false, 'message' => 'No more levels.'])` with status `406`.
* `POST /answer`
    * Checks the answer submitted by the user.
    * **Requires**: `question_id`, `answer`
    * **Returns**:
        ```
        {
            "correctAnswer" :true/false,
            "message"       : one of the following([
                                'Correct answer.',
                                'Invalid question or user status not updated.',
                                'Internal server error.',
                                'Incorrect answer.',
                                'Already answered the question correctly',
                                'Maximum number of attempts reached.',
                                'Question inaccessible.'
                              ])
        }
        ```

* `GET users/score?page=<page-no>`
    * **Returns** the score of all users in the below mentioned format with status `200`:
        ```
        {
            "gotScores":true,
            "data":{
                "current_page":4,
                "data":[
                    {"user_id":45,"score":6,"username":"Davonte Goldner","email":"demarco78@example.net"},
                    {"user_id":46,"score":5,"username":"Reece Wilderman","email":"durward70@example.com"},
                    {"user_id":48,"score":8,"username":"Dakota Tillman","email":"nlueilwitz@example.net"},
                    {"user_id":49,"score":3,"username":"Ms. Madelynn Douglas","email":"cwolff@example.com"},
                    {"user_id":50,"score":2,"username":"Prof. Chris Kirlin","email":"gonzalo.leuschke@example.org"},
                    {"user_id":51,"score":11.07,"username":"Placeholder Name","email":"benedictflorance.a@gmail.com"}
                ],
                "first_page_url":"http:\/\/localhost:8000\/users\/score?page=1",
                "from":31,
                "last_page":4,
                "last_page_url":"http:\/\/localhost:8000\/users\/score?page=4",
                "next_page_url":null,"path":"http:\/\/localhost:8000\/users\/score",
                "per_page":10,
                "prev_page_url":"http:\/\/localhost:8000\/users\/score?page=3",
                "to":36,
                "total":36
            }
        }
        ```

    * `{'gotScores' => false, 'message' => "Internal server error."}` with status `500`
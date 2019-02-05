<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Attempt;
use App\UserDayStatus;
use App\ScoreLog;
use App\Exceptions\CustomException;
use GuzzleHttp\Client;

class User extends Model
{
    protected $table = 'users';
    protected $fillable = ['name', 'pragyan_id', 'email'];

    /**
     * Each user will make many attempts
     * @return App::Attempt
     */
    public function attempts() {
        return $this->hasMany(Attempt::class);
    }

    /**
     * Each user will have many dayStatuses
     * @return App::UserDayStatus
     */
    public function userDayStatuses() {
        return $this->hasMany(UserDayStatus::class);
    }

    /**
     * Each user will have multiple scoreLogs
     * @return App::ScoreLog
     */
    public function scoreLogs() {
        return $this->hasMany(ScoreLog::class);
    }

    /**
     * Function that sends a POST request to pragyan server for authentication.
     * @param  string $email
     * @param  string $password
     * @return array containing name and pragyan_id of the user.
     * @throws CustomException
     */
    public static function authUserCredentialsFromPragyan($email, $password) {
        // Return default values when the project is in development mode.
        if (env('APP_ENV', 'local') != 'production') {
            return [
                'name'          => 'Placeholder Name',
                'pragyan_id'    => '0'
            ];
        }

        // Create a Guzzle client
        $client = new Client();
        $url = "https://api.pragyan.org/event/login";

        // Send a POST request to the above url with the following params
        $response = $client->post($url, [
            'json' => [
                'user_email'    =>  $email,
                'user_pass'     =>  $password,
                'event_id'      =>  env('EVENT_ID', 0),
                'event_secret'  =>  env('EVENT_SECRET', ''),
            ]
        ]);
        // Decode the response into PHP array
        $response = json_decode($response->getBody(), true);

        // If the response is not successful, throw an Exception
        if ($response['status_code'] != 200) {
            throw new CustomException($response['message'], $response['status_code']);
        }

        // return name and pragyan_id of the authenticated user.
        return [
            'name'          =>  $response['message']['user_fullname'],
            'pragyan_id'    =>  $response['message']['user_id'],
        ];
    }
}

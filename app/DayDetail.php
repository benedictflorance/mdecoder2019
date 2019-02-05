<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Exception;
use Carbon\Carbon;
use App\Exceptions\CustomException;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class DayDetail extends Model
{
    protected $table = 'day_details';
    protected $fillable = ['day', 'contest_duration', 'start_time', 'end_time'];
    protected $primaryKey = 'day';
    
    /**
     * Each day has many questions
     * @return App::Question
     */
    public function questions(){
        return $this->hasMany(Question::class);
    }
    /**
     * Each day has many user day statuses
     * @return App::UserDayStatus
     */
    public function userDayStatuses(){
        return $this->hasMany(UserDayStatus::class);
    }
    /**
     * Returns DayDetail corressponding to the given day
     * @param  integer $day
     * @return App\DayDetail
     */
    public static function getDayDetailByDay ($day) {
        try {
            $dayDetails = DayDetail::findOrFail($day);
            return $dayDetails;
        }
        catch (ModelNotFoundException $e) {
            throw new CustomException("Day doesn't exist.", 404);
        }
        catch (Exception $e) {
            throw new Exception($e->getMessage(), 500);
        }
    }

    /**
     * Utility function to check if the contest is live
     * @return boolean true if the contest is live, else false
     */
    public function isContestLive () {
        $currentTime = Carbon::now()->timestamp;

        return (($currentTime >= strtotime($this->start_time)) and
                ($currentTime <= strtotime($this->end_time))
               );
    }

    /**
     * Function to check if the user's status is live. User's status is live till his contest duration expires.
     * @param  App\UserDayStatus  $userDayStatus
     * @return boolean
     */
    public function isUserContestLive ($userDayStatus) {
        $currentTime = Carbon::now()->timestamp;

        return (($currentTime >= strtotime($userDayStatus->contest_start_time)) and
                ($currentTime <= strtotime($userDayStatus->contest_start_time) + $this->contest_duration)
               );
    }

    /**
     * Function to check whether a contest exist on the day.
     * @param  integer $day
     * @return boolean
     */
    public static function dayExists ($day) {
        $day = DayDetail::find($day);
        if (! $day)
            return false;

        return true;
    }
}

<?php

namespace App;
use App\User;
use App\DayDetail;
use App\QuestionDifficulty;
use App\Exceptions\CustomException;

use Illuminate\Database\Eloquent\Model;

class UserDayStatus extends Model
{
    protected $table = 'user_day_statuses';
    protected $fillable = ['user_id', 'day', 'question_difficulty_id', 'contest_start_time'];
    /**
     * Each userDayStatus belongs to an user
     * @return App::User
     */
    public function user() {
        return $this->belongsTo(User::class);
    }
    /**
     * Each userDayStatus belongs to a day
     * @return App:DayDetail
     */
    public function dayDetail(){
        return $this->belongsTo(DayDetail::class);
    }
    /**
     * Each userDayStatus is associated with a question difficulty 
     * @return App::QuestionDifficulty
     */
    public function questionDifficulty(){
        return $this->belongsTo(QuestionDifficulty::class);
    }
    /**
     * Returns the status of the given user on a given day 
     * @param  integer $id  User ID
     * @param  integer $day Day number
     * @return App::UserDayStatus
     * @throws CustomException
     */
    public static function getUserDayStatusByUserIdAndDay($userId, $day)
    {
        $userDayStatus = UserDayStatus::where(['user_id' => $userId, 'day' => $day])->first();
        if (!$userDayStatus) {
            throw new CustomException("User day status does not exist", 404);
        }

        return $userDayStatus;
    }

}

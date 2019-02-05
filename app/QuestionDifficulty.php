<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Exceptions\CustomException;

class QuestionDifficulty extends Model
{
    protected $table = 'question_difficulties';
    protected $fillable = ['description', 'score', 'level', 'no_of_questions'];
    /**
     * Each difficulty level has many questions
     * @return App::Question
     */
    public function questions()
    {
    	return $this->hasMany(Question::class);
    }
    /**
     * Each difficulty level has many user day statuses.
     * @return App::UserDayStatus
     */
    public function userDayStatuses()
    {
    	return $this->hasMany(UserDayStatus::class);
    }

    /**
     * returns the QuestionDifficulty ID for the next level.
     * @param  integer $currentLevel
     * @return integer returns the id for next level if exists
     * @throws CustomException
     */
    public static function getNextLevelId ($currentLevel) {
        $nextLevel = QuestionDifficulty::where('level', '<', $currentLevel)->orderBy('level', 'desc')->first();
        if(!$nextLevel) {
            throw new CustomException("No more levels.", 406);
        }
        return $nextLevel->id;
    }
}

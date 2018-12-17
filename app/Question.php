<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Question extends Model
{
 	protected $table = 'questions';
    protected $fillable = ['description', 'answer', 'question_difficulty_id', 'day', 'max_number_of_tries'];
    /**
     * Each question will have many attempts
     * @return App::Attempt
     */
    public function attempts() {
        return $this->hasMany(Attempt::class);
    }
	/**
     * Each question will have multiple scoreLogs
     * @return App::ScoreLog
     */
    public function scoreLogs() {
        return $this->hasMany(ScoreLog::class);
    }
    /**
     * Each question is associated with a difficulty
     * @return App::QuestionDifficulty
     */
    public function questionDifficulty(){
    	return $this->belongsTo(QuestionDifficulty::class);
    }
    /**
     * Each question belongs to a day
     * @return App::DayDetail
     */
    public function dayDetail()
    {
    	return $this->belongsTo(DayDetail::class);
    }

    /**
     * Returns all the questions for given day and difficulty
     * @param  integer $day
     * @param  integer $questionDifficultyId
     * @return App\Question[]
     */
    public static function getQuestionsByDayAndDifficulty($day, $questionDifficultyId) {
        $questions =  Question::select('id', 'description', 'question_difficulty_id', 'day', 'max_number_of_tries')
                              ->where([
                                          'day'                       => $day,
                                          'question_difficulty_id'    => $questionDifficultyId,
                                      ])
                              ->get();

        foreach ($questions as $question) {
            $question['question_difficulty'] = $question->questionDifficulty()->first()->description;
            unset($question['question_difficulty_id']);
        }
        return $questions;
    }

    /**
     * This function checks if the question is accessible for the user at this moment.
     * @param  integer      $day
     * @param  User         $user
     * @return boolean      returns true if the question is accessible, otherwise false
     */
    public function isValidQuestionForDayAndUser($day, $user) {

        // Get user's current day status
        $userDayStatus = UserDayStatus::where([
            ['user_id', '=', $user->id],
            ['day', '=', $this->day],
        ])->firstOrFail();
        // If the user is accessing current day's question, the timer hasn't run out and question difficulty matches with user's level, return true
        if ($day->day == $this->day and
            $day->isUserContestLive($userDayStatus) and
            $userDayStatus->question_difficulty_id == $this->question_difficulty_id
           )
            return true;

        // If the user is accessing previous day's question, the contest is live and question difficulty matches with user's level, return true
        if ($day->day == $this->day + 1 and
            $day->isContestLive() and
            $userDayStatus->question_difficulty_id == $this->question_difficulty_id
           )
            return true;

        // Check if the question's difficulty matches with level the user currently is in

        return false;
    }

    /**
     * Function to check if the submitted answer is correct.
     * @param  string   $answer
     * @return boolean  returns true if the answer matches, otherwise false
     */
    public function isAnswerCorrect ($answer) {
        return ($answer == $this->answer);
    }
}

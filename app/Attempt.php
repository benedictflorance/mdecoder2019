<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Attempt extends Model
{
    protected $table = 'attempts';
    protected $fillable = ['user_id', 'question_id', 'answer'];

    /**
     * Each attempt belongs to an user
     * @return App::User
     */
    public function user() {
        return $this->belongsTo(User::class);
    }
    /**
     * Each attempt is associated with a question
     * @return App::Question
     */
    public function question(){
    	return $this->belongsTo(Question::class);
    }

    /**
     * Function to check if the user has reached maximum allowed attempts for the question
     * @param  App\Question $question
     * @param  App\user     $user
     * @return boolean      returns true if max number of attempts is reached, false otherwise
     */
    public static function maxAttemptsReachedForQuestionByUser ($question, $user) {
        $numberOfAttempts = Attempt::numberOfAttemptsForQuestionByUser($question, $user);

        return ($numberOfAttempts >= $question->max_number_of_tries);
    }

    /**
     * Function to add attempts of all user for a question
     * @param  integer $questionId
     * @param  integer $userId
     * @param  string  $answer
     * @return App\Attempt
     */
    public static function addAttemptForQuestionByUser ($questionId, $userId, $answer) {
        $attempt = new Attempt;
        $attempt->question_id = $questionId;
        $attempt->user_id = $userId;
        $attempt->answer = $answer;

        $attempt->save();

        return $attempt;
    }
    public static function numberOfAttemptsForQuestionByUser($question, $user)
    {
        return Attempt::where([
            'question_id'   => $question->id,
            'user_id'       => $user->id,
        ])->count();
    }
}

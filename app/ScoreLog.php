<?php

namespace App;
use App\User;
use App\Question;
use App\Attempt;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ScoreLog extends Model
{
    protected $table = 'scorelogs';
    protected $fillable = ['user_id', 'question_id', 'attempt_id', 'score'];

    /**
     * Each scoreLog belongs to an user
     * @return App::User
     */
    public function user() {
        return $this->belongsTo(User::class);
    }
    /**
     * Each scorelog belongs to a question
     * @return App::Question
     */
    public function question(){
    	return $this->belongsTo(Question::class);
    }
    /**
     * Each scorelog belongs to an attempt
     * @return App::Attempt
     */
    public function attempt(){
    	return $this->belongsTo(Attempt::class);
    }

    /**
     * Function to add scoreLog for correct answer
     * @param App\Question  $question
     * @param App\User      $user
     * @param App\Attempt   $attempt
     * @return ScoreLog 
     */
    public static function addScoreForQuestionByUserForAttempt ($question, $user, $attempt, $day) {
        $scoreLog = new ScoreLog;
        $scoreLog->question_id = $question->id;
        $scoreLog->user_id = $user->id;
        $scoreLog->attempt_id = $attempt->id;
        $maxScore = $question->questionDifficulty()->first()->score;
        $time = (Carbon::now()->timestamp - strtotime($day->start_time))/120;
        if($day->day == $question->day+1)
            $time+=420;
        $scoreLog->score = $maxScore - ($maxScore * $time/($maxScore + $time)); 
        $scoreLog->save();

        return $scoreLog;
    }
}

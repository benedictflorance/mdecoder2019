<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Exceptions\CustomException;
use Exception;

use App\UserDayStatus;
use App\Question;
use App\QuestionDifficulty;
use App\DayDetail;
use App\Attempt;
use App\ScoreLog;
use Carbon\Carbon;

class QuestionsController extends Controller
{

    public function getQuestions(Request $request) {
        try {
            // Validate request parameters 
            if($request->filled('prev_day_questions_flag') and !in_array($request['prev_day_questions_flag'], array(0, 1)))
                throw new CustomException("Invalid parameter format.", 401);

            $user = $request->session()->get('user');

            // Gets the current day of the user.
            $currentDay = $this->getCurrentDay();
            if(!$currentDay) {
                throw new CustomException("Question inaccessible.", 404);
            }

            // if user requests previous day's questions and the day does not exist, throw exception
            if ($request['prev_day_questions_flag'] and !DayDetail::dayExists($currentDay->day - 1))
                throw new CustomException("Invalid day.", 404);

            // If the contest is live, then userDayStatus holds the user's status of
            // previous or current day based on the prev_day_questions_flag is set or not
            if ($currentDay->isContestLive()) {
                // UserDayStatus is created if it doesn't already exist and is stored in $userDayStatus
                $userDayStatus = UserDayStatus::firstOrCreate(
                    [
                        'user_id'   => $user->id,
                        'day'       => ($request['prev_day_questions_flag']) ? $currentDay->day-1 : $currentDay->day,
                    ],
                    [
                        'question_difficulty_id'    => QuestionDifficulty::where('level', QuestionDifficulty::max('level'))->first()->id,
                        'contest_start_time'        => date("Y-m-d H:i:s", Carbon::now()->timestamp),
                    ]
                );
                if (!$request['prev_day_questions_flag'] and !$currentDay->isUserContestLive($userDayStatus)) 
                    throw new CustomException("Question inaccessible", 400);
            }
            // If the contest is not live
            else {
                // Previous day's questions can not be accessed when contest is not live. So, throws exception
                if ($request['prev_day_questions_flag'])
                    throw new CustomException("Question inaccessible", 400);

                // UserDayStatus for current day is returned. NOTE : It cannot be created as the contest is not live.
                $userDayStatus = UserDayStatus::where([
                    ['user_id', '=', $user->id],
                    ['day', '=', $currentDay->day],
                ])->firstOrFail();

                // If the contest time for the user is over, throw exception
                if (!$currentDay->isUserContestLive($userDayStatus)) {
                    throw new CustomException("Question inaccessible", 400);
                }
            }

            $questionDifficultyId = $userDayStatus->question_difficulty_id;
            // Retrieve questions based on the day set in $userDayStatus and question difficulty
            $questions = Question::getQuestionsByDayAndDifficulty($userDayStatus->day, $questionDifficultyId);
            foreach($questions as $question)
            {
                $numberOfAttempts = Attempt::numberOfAttemptsForQuestionByUser($question, $user);
                $question->remaining_attempts = $question->max_number_of_tries - $numberOfAttempts; 
                if(ScoreLog::where(['question_id'   => $question->id, 'user_id' => $user->id])->count() > 0)
                    $question->user_solved = true;
                else
                    $question->user_solved = false;
                $question->number_solved = ScoreLog::where(['question_id'   => $question->id])->count();
            }
            return response()->json(['gotQuestions' => true, 'data' => $questions]);
        }
        catch (ModelNotFoundException $e) {
            return response()->json(['gotQuestions' => false, 'message' => 'Question inaccessible.'], 400);
        }
        catch (CustomException $e) {
            return response()->json(['gotQuestions' => false, 'message' => $e->getMessage()], $e->getCode());
        }
        catch (Exception $e) {
            return response()->json(['gotQuestions' => false, 'message' => 'Internal server error'], 500);
        }
    }
}

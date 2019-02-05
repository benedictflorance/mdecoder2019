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
use App\User;
use DB;
use Illuminate\Http\Response;

class ScoreLogsController extends Controller
{
    /**
     * Function to return scores of all registered users along with their name and email
     * @param  Request  $request
     * @return Response
     */
    public function getUsersScores(Request $request) {
        try {
            $scores = User::leftJoin('scorelogs', 'scorelogs.user_id', '=', 'users.id')
                          ->select('users.id as user_id', DB::raw('SUM(score) as score'), 'users.name as username', 'users.email')
                          ->groupBy('users.id')
                          ->orderBy('score', 'desc')
                          ->orderBy('name');

            $userScore = null;
            // Currently logged in user's score will be added to the end of the list.
            if ($request->session()->has('user')) {
                $user = $request->session()->get('user');
                $userScore['user_id'] = $user->id;
                $userScore['user_rank'] = $scores->pluck('user_id')->search($user->id) + 1;
                $userScore['score'] = $user->scoreLogs()->sum('score');
                $userScore['username'] = $user->name;
                $userScore['email'] = $user->email;
            }
            $scores = $scores->paginate(10);

            return response()->json(['gotScores' => true, 'data' => $scores, 'loggedInUserScore' => $userScore], 200);
        }
        catch (Exception $e) {
            return response()->json(['gotScores' => false, 'message' => (env('APP_ENV', 'local') == 'production') ? "Internal server error." : $e->getMessage()], 500);
        }
    }

    /**
     * Function to check the answer submitted by the user.
     * @param  Request $request
     * @return Response
     */
    public function checkAnswer(Request $request) {
        try {
            // Condition to check if the request is filled with the required parameters
            if (!$request->filled(['question_id', 'answer'])) {
                return response()->json(['correctAnswer' => false, 'message' => 'Missing parameters.'], 400);
            }
            // Validate the request parameters
            $request->validate([
                'question_id'   => 'integer',
            ]);

            $answerData = $request->only(['question_id', 'answer']);
            $user = $request->session()->get('user');
            $currentDay = $this->getCurrentDay();
            if (! $currentDay) {
                throw new CustomException("Invalid day.", 400);
                
            }
            $question = Question::findOrFail($answerData['question_id']);

            // Check if the question is accessible by the current user
            if (! $question->isValidQuestionForDayAndUser($currentDay, $user)) {
                return response()->json(['correctAnswer' => false, 'message' => 'Question inaccessible.'], 403);
            }

            // Check if user has emptied max number of attempts for the question
            if (Attempt::maxAttemptsReachedForQuestionByUser($question, $user)) {
                return response()->json(['correctAnswer' => false, 'message' => 'Maximum number of attempts reached.'], 403);
            }
            // Check if the user has already answered the question correctly
            if (ScoreLog::where(['question_id'   => $question->id, 'user_id' => $user->id])->count() > 0) {
                return response()->json(['correctAnswer' => false, 'message' => 'Already answered the question correctly'], 403);
            }

            // Check if the answer is correct
            if (! $question->isAnswerCorrect($answerData['answer'])) {
                // Add an attempt made by the user
                $attempt = Attempt::addAttemptForQuestionByUser($question->id, $user->id, $answerData['answer']);
                return response()->json(['correctAnswer' => false, 'message' => 'Incorrect answer.'], 200);
            }

            // Define a transaction to make sure both the queries are either executed or rejected.
            // DB::transaction(function () {
                // Add an attempt made by the user
                $attempt = Attempt::addAttemptForQuestionByUser($question->id, $user->id, $answerData['answer']);
                // Add score for the user
                ScoreLog::addScoreForQuestionByUserForAttempt($question, $user, $attempt, $currentDay);
            // });

            return response()->json(['correctAnswer' => true, 'message' => 'Correct answer.'], 200);
        }
        catch (ModelNotFoundException $e) {
            return response()->json(['correctAnswer' => false, 'message' => 'Invalid question or user status not updated.'], 404);
        }
        catch (CustomException $e) {
            return response()->json(['correctAnswer' => false, 'message' => $e->getMessage()], $e->getCode());
        }
        catch (Exception $e) {
            return response()->json(['correctAnswer' => false, 'message' => (env('APP_ENV', 'local') == 'production') ? "Internal server error." : $e->getMessage()], 500);
        }
    }
}

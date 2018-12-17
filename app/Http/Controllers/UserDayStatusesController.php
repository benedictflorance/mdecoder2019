<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Exceptions\CustomException;
use DB;
use Carbon\Carbon;
use Exception;

use App\UserDayStatus;
use App\Question;
use App\QuestionDifficulty;
use App\DayDetail;
use App\Attempt;
use App\ScoreLog;

class UserDayStatusesController extends Controller
{
    /**
     * Function to lower the level of difficulty for an user.
     * @param  Request $request
     * @return Response
     */
    public function updateLevel(Request $request) {

        try {
            // Validate repquest parameters
            if($request->filled('prev_day_questions_flag') and !in_array($request['prev_day_questions_flag'], array(0, 1)))
                    throw new CustomException("Invalid parameter format.", 401);

            $user = $request->session()->get('user');
            $currentDay = $this->getCurrentDay();

            if (!$currentDay) {
                throw new CustomException("Invalid day.", 400);
            }

            // if user request previous day's questions and the day does not exist, throw exception
            if ($request['prev_day_questions_flag'] and !DayDetail::dayExists($currentDay->day - 1))
                throw new CustomException("Invalid day.", 404);

            // If the contest is live, then userDayStatus holds the user's status of
            // previous or current day based on the prev_day_questions_flag is set or not
            if ($currentDay->isContestLive()) {
                // UserDayStatus is created if it doesn't already exist and is stored in $userDayStatus
                $userDayStatus = UserDayStatus::where([
                    ['user_id', '=', $user->id],
                    ['day', '=', ($request['prev_day_questions_flag']) ? $currentDay->day-1 : $currentDay->day],
                ])->firstOrFail();
                if (!$request['prev_day_questions_flag'] and !$currentDay->isUserContestLive($userDayStatus))
                    throw new CustomException("Time up. Level cannot be updated.", 400); 
            }
            // If the contest is not live
            else {
                // Previous day's questions can not be accessed when contest is not live. So, throws exception
                if ($request['prev_day_questions_flag'])
                    throw new CustomException("Time up. Level cannot be updated.", 400);

                // UserDayStatus for current day is returned. NOTE : It cannot be created as the contest is not live.
                $userDayStatus = UserDayStatus::where([
                    ['user_id', '=', $user->id],
                    ['day', '=', $currentDay->day],
                ])->firstOrFail();

                // If the contest time for the user is over, throw exception
                if (!$currentDay->isUserContestLive($userDayStatus)) {
                    throw new CustomException("Time up. Level cannot be updated.", 400);
                }
            }

            // Get current level of the user
            $currentLevel = $userDayStatus->questionDifficulty()->first()->level;
            
            // Get next level's question_difficulty_id if exists, otherwise, it throws exception.
            $nextLevelId = QuestionDifficulty::getNextLevelId($currentLevel);

            // Update and save the question_difficulty_id of the user for that day
            $userDayStatus->question_difficulty_id = $nextLevelId;
            $userDayStatus->save();

            return response()->json(['updated' => true, 'message' => 'Level updated.']);
        }
        // When the user details does not exist in UserDayDetails table.
        catch (ModelNotFoundException $e) {
            return response()->json(['updated' => false, 'message' => 'User details doesn\'t exists.'], 404);
        }
        // When there are no more levels to traverse down.
        catch (CustomException $e) {
            return response()->json(['updated' => false, 'message' => $e->getMessage()], $e->getCode());
        }
        catch (Exception $e) {
            return response()->json(['updated' => false, 'message' => (env('APP_ENV', 'local') == 'production') ? "Internal server error." : $e->getMessage()], 500);
        }
    }

    public function getUserContestRemainingTiming(Request $request) {

        try {
            $day = $this->getCurrentDay();
            if (!$day) {
                throw new CustomException("Contest hasn't started.", 400);
            }

            $user = $request->session()->get('user');
            $userDayStatus = UserDayStatus::getUserDayStatusByUserIdAndDay($user->id, $day->day);

            if (!$day->isUserContestLive($userDayStatus)) {
                return response()->json(['gotRemainingTime' => false, 'message' => 'Time up. Current day\'s contest is over.'], 400);
            }

            $currentTime = Carbon::now()->timestamp;
            $remainingTime = strtotime($userDayStatus->contest_start_time) + $day->contest_duration - $currentTime;
            return response()->json(['gotRemainingTime' => true, 'remainingTime' => $remainingTime], 200);
        }
        catch (CustomException $e) {
            return response()->json(['gotRemainingTime' => false, 'message' => 'User hasn\'t started the contest'], $e->getCode());
        }
        catch (Exception $e) {
            return response()->json(['gotRemainingTime' => false, 'message' => (env('APP_ENV', 'local') == 'production') ? "Internal server error." : $e->getMessage()], 500);
        }
    }
}

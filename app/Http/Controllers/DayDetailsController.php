<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exceptions\CustomException;
use Carbon\Carbon;
use Exception;

use App\DayDetail;

class DayDetailsController extends Controller
{
    public function getContestRemainingTiming(Request $request) {

        try {
            $day = $this->getCurrentDay();
            
            // Condition where the event hasn't started.
            if (!$day) {
                // Get the dayDetails of first day of the event.
                $eventStartDay = DayDetail::getDayDetailByDay(DayDetail::min('day'));
                $currentTime = Carbon::now()->timestamp;
                $remainingTime = strtotime($eventStartDay->start_time) - $currentTime;
                return response()->json(['gotRemainingTime' => true, 'remainingTime' => $remainingTime, 'isContestLive' => false], 200);
            }
            
            // Condition if the contest is live
            if ($day->isContestLive()) {
                $currentTime = Carbon::now()->timestamp;
                $remainingTime = strtotime($day->end_time) - $currentTime;
                return response()->json(['gotRemainingTime' => true, "remainingTime" => $remainingTime, "isContestLive" => true], 200);
            }

            $nextDay = DayDetail::getDayDetailByDay($day->day+1);
            $currentTime = Carbon::now()->timestamp;
            $remainingTime = strtotime($nextDay->start_time) - $currentTime;
            return response()->json(['gotRemainingTime' => true, 'remainingTime' => $remainingTime, 'isContestLive' => false], 200);
        }
        catch (CustomException $e) {
            return response()->json(['gotRemainingTime' => false, 'message' => $e->getMessage()], $e->getCode());
        }
        catch (Exception $e) {
            return response()->json(['gotRemainingTime' => false, 'message' => (env('APP_ENV', 'local') == 'production') ? "Internal server error." : $e->getMessage()], 500);
        }
    }
}

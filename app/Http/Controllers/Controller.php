<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Exceptions\CustomException;
use App\DayDetail;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Funtion to return the day number of the contest.
     * @return DayDetail
     * @throws CustomException
     */
    public function getCurrentDay() {

        $currentTime = date("Y-m-d H:i:s", Carbon::now()->timestamp);
        $day = DayDetail::where('start_time', '<', $currentTime)->orderBy('start_time', 'desc')->first();
        
        return $day;
    }
}

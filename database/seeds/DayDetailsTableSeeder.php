<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;

class DayDetailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $numberOfDays = 3;
        $startTime = Carbon::now()->subDay();

        for($day = 1; $day <= $numberOfDays; $day++) {
            $currentStartTime = $startTime->copy()->addDays($day-1);

            DB::table('day_details')->insert([
                'day'               => $day,
                'start_time'        => $currentStartTime->toDateTimeString(),
                'end_time'          => $currentStartTime->addHours(5),
                'contest_duration'  => 7200,
                'created_at'        => $currentStartTime,
                'updated_at'        => $currentStartTime,
            ]);
        }
    }
}

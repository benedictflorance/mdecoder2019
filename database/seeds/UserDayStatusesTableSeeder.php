<?php

use Illuminate\Database\Seeder;

use App\User;
use App\DayDetail;
use App\UserDayStatus;

class UserDayStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userIds = User::all()->pluck('id')->toArray();
        foreach ($userIds as $userId) {
            $days = DayDetail::all()->pluck('day')->toArray();
            
            foreach ($days as $day) {
                $userDayDetail = factory(UserDayStatus::class)->create([
                    'user_id'   => $userId,
                    'day'       => $day,
                ]);
            }
        }
    }
}

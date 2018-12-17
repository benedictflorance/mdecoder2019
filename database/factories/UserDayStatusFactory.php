<?php

use Faker\Generator as Faker;
use Carbon\Carbon;

use App\User;
use App\DayDetail;
use App\QuestionDifficulty;

$factory->define(App\UserDayStatus::class, function (Faker $faker) {
    $user_array = User::all()->pluck('id')->toArray();
    $day_array = DayDetail::all()->pluck('day')->toArray();
    $question_difficulty_array = QuestionDifficulty::all()->pluck('id')->toArray();
    $date = Carbon::create(2015, 5, 28, 0, 0, 0);
    
    return [
        'user_id' => $faker->randomElement($user_array),
        'day' => $faker->randomElement($day_array),
        'question_difficulty_id' => $faker->randomElement($question_difficulty_array),
        'contest_start_time'  => $date->format('Y-m-d H:i:s')
    ];
});

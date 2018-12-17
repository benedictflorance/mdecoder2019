<?php

use Faker\Generator as Faker;

use App\QuestionDifficulty;
use App\DayDetail;

$factory->define(App\Question::class, function (Faker $faker) {
    $difficulty_ids = QuestionDifficulty::all()->pluck('id')->toArray();
    $difficult_id = $faker->randomElement($difficulty_ids);
    $day_array = DayDetail::all()->pluck('day')->toArray();
    $day = $faker->randomElement($day_array);
    $answer = $faker->sentence($nbWords = 1, $variableNbWords = true);

    return [
        'description' => $faker->sentence($nbWords = 6, $variableNbWords = true)." answer : ".$answer,
        'answer' => $answer,
        'question_difficulty_id' => $difficult_id,
        'day' => $day,
        'max_number_of_tries' => $faker->randomDigitNotNull
    ];
});

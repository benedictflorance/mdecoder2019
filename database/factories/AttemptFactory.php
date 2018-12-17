<?php

use Faker\Generator as Faker;

use App\User;
use App\Question;

$factory->define(App\Attempt::class, function (Faker $faker) {
    $user_array = User::all()->pluck('id')->toArray();
    $question_array = Question::all()->pluck('id')->toArray();
    
    return [
        'user_id' => $faker->randomElement($user_array),
        'question_id' => $faker->randomElement($question_array),
        'answer' => $faker->sentence($nbWords = 6, $variableNbWords = true)
    ];
});

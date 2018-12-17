<?php

use Faker\Generator as Faker;

use App\User;
use App\Question;
use App\Attempt;

$factory->define(App\ScoreLog::class, function (Faker $faker) {
    $attempt_id_array = Attempt::all()->pluck('id')->toArray();
    $attempt_id = $faker->unique()->randomElement($attempt_id_array);
    $attempt = Attempt::find($attempt_id);
    return [
        'user_id' => $attempt->user_id,
        'question_id' => $attempt->question_id,
        'attempt_id' => $attempt_id,
        'score' => $faker->randomDigitNotNull
    ];
});

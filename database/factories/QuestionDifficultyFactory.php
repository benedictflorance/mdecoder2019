<?php

use Faker\Generator as Faker;

$factory->define(App\QuestionDifficulty::class, function (Faker $faker) {
    return [
        'description' => $faker->unique()->word,
        'score' => $faker->randomDigitNotNull,
        'level' => $faker->unique()->numberBetween($min=1, $max=3),
        'no_of_questions' => $faker->randomDigitNotNull
    ];
});

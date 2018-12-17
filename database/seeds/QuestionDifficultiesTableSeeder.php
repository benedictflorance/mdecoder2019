<?php

use Illuminate\Database\Seeder;

class QuestionDifficultiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\QuestionDifficulty::class, 3)->create();
    }
}

<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            DayDetailsTableSeeder::class,
            QuestionDifficultiesTableSeeder::class,
            QuestionsTableSeeder::class,
            AttemptsTableSeeder::class,
            ScorelogsTableSeeder::class,
            UserDayStatusesTableSeeder::class,
        ]);
    }
}

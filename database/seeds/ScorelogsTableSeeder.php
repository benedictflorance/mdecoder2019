<?php

use Illuminate\Database\Seeder;

class ScorelogsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\ScoreLog::class, 50)->create();
    }
}

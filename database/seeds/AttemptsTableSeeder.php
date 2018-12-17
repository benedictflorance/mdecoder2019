<?php

use Illuminate\Database\Seeder;

class AttemptsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Attempt::class, 50)->create();
    }
}

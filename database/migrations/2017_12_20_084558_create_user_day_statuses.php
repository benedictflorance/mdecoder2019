<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserDayStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_day_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('day')->unsigned();
            $table->integer('question_difficulty_id')->unsigned();
            $table->dateTime('contest_start_time');
            $table->timestamps();

            $table->foreign('user_id')
                  ->references('id')->on('users');
            $table->foreign('day')
                  ->references('day')->on('day_details');
            $table->foreign('question_difficulty_id')
                  ->references('id')->on('question_difficulties');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_day_statuses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['day']);
            $table->dropForeign(['question_difficulty_id']);
        });

        Schema::dropIfExists('user_day_statuses');
    }
}

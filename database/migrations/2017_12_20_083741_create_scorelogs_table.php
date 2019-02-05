<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScorelogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scorelogs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('question_id')->unsigned();
            $table->integer('attempt_id')->unsigned();
            $table->double('score', 8, 2);
            $table->timestamps();

            $table->foreign('user_id')
                  ->references('id')->on('users');
            $table->foreign('question_id')
                  ->references('id')->on('questions');
            $table->foreign('attempt_id')
                  ->references('id')->on('attempts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('scorelogs', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['question_id']);
            $table->dropForeign(['attempt_id']);
        });

        Schema::dropIfExists('scorelogs');
    }
}

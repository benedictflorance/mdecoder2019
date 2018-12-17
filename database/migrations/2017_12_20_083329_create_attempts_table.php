<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttemptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attempts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('question_id')->unsigned();
            $table->string('answer');
            $table->timestamps();

            $table->foreign('user_id')
                  ->references('id')->on('users');
            $table->foreign('question_id')
                  ->references('id')->on('questions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('attempts', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['question_id']);
        });

        Schema::dropIfExists('attempts');
    }
}

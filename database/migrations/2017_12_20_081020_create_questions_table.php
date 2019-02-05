<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description', 2000);
            $table->string('answer');
            $table->integer('question_difficulty_id')->unsigned();
            $table->integer('day')->unsigned();
            $table->integer('max_number_of_tries')->unsigned();
            $table->timestamps();

            $table->foreign('question_difficulty_id')
                  ->references('id')->on('question_difficulties');
            $table->foreign('day')
                  ->references('day')->on('day_details');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropForeign(['question_difficulty_id']);
            $table->dropForeign(['day']);
        });

        Schema::dropIfExists('questions');
    }
}

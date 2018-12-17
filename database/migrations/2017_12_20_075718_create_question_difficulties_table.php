<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionDifficultiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_difficulties', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description')->unique();
            $table->double('score', 8, 2);
            $table->integer('level')->unsigned()->unique();
            $table->integer('no_of_questions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('question_difficulties');
    }
}

<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\UserDayStatus;
use App\Question;
use App\QuestionDifficulty;
use App\DayDetail;
use App\Attempt;
use App\ScoreLog;
use App\User;
use DB;
use Auth;
use Illuminate\Http\Response;
class GetScoreTest extends TestCase
{
    /**
     * Make ajax POST request
     */
    protected function ajaxPost ($uri, array $data = []) {
        return $this->post($uri, $data, array('HTTP_X-Requested-With' => 'XMLHttpRequest'));
    }

    /**
     * Make ajax GET request
     */
    protected function ajaxGet ($uri, array $data = []) {
        return $this->get($uri, array('HTTP_X-Requested-With' => 'XMLHttpRequest'));
    }
    public function testGetScoresWithoutLogIn (){
        $response = $this->ajaxGet('users/score')
        				 ->assertStatus(200)
                         ->assertJsonStructure([
                         	'gotScores',
                         	'data' => [
                         		'current_page',
                         		'data'=>[
                         			'*' => [
                         				'user_id',
						                 'score',
						                 'username',
						                 'email'
                         			]
                         		]
                         	]
			             ]);
    }
    public function testGetScoresWithLogIn (){
    	$user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
        				 ->ajaxGet('users/score')
        				 ->assertStatus(200)
                         ->assertJsonStructure([
                         	'gotScores',
                         	'data' => [
                         		'current_page',
                         		'data'=>[
                         			'*' => [
                         				'user_id',
						                 'score',
						                 'username',
						                 'email'
                         			]
                         		]
                         	]
			             ]);
    }
}
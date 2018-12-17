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
use Carbon\Carbon;
use Illuminate\Http\Response;
class CheckAnswerTest extends TestCase
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
    public function testCheckAnswerWithoutLoggedIn(){
    	$response = $this->ajaxPost('answer')
                         ->assertStatus(401)
                         ->assertJson([
                            'Authorized'    => false
                         ]);
    }
    public function testCheckAnswerWithLoggedInWithQuestionIdFieldNotPresent(){
    	$user = factory(User::class)->create();
    	$response = $this->withSession(['user' => $user])
    					 ->withHeaders([
				            'answer'
				        ])
    					 ->ajaxPost('answer')
    					 ->assertStatus(400)
    					 ->assertJson(
    					 	['correctAnswer' => false, 'message' => 'Missing parameters.']
    					 );
    }
    public function testCheckAnswerWithLoggedInWithAnswerFieldNotPresent(){
    	$user = factory(User::class)->create();
    	$response = $this->withSession(['user' => $user])
    					 ->withHeaders([
				            'question_id'
				        ])
    					 ->ajaxPost('answer')
    					 ->assertStatus(400)
    					 ->assertJson(
    					 	['correctAnswer' => false, 'message' => 'Missing parameters.']
    					 );
    }
    public function testCheckAnswerWithUserLoggedInWithQuestionNotAccesibleWrongDay(){
    	$user = factory(User::class)->create();
    	$knownDate = Carbon::create(2018, 1, 21, 12);
        Carbon::setTestNow($knownDate);  
    	$response = $this->withSession(['user' => $user])
    					 ->withHeaders([
				            'question_id','answer'
				        ])
    					 ->ajaxPost('answer')
    					 ->assertStatus(403)
    					 ->assertJson(
    					 	['correctAnswer' => false, 'message' => 'Question inaccessible.']
    					 );
    }
    public function testCheckAnswerWithUserLoggedInWithQuestionNotAccesibleWrongDay2(){
    	$user = factory(User::class)->create();
    	$knownDate = Carbon::create(2018, 3, 5, 12);
        Carbon::setTestNow($knownDate);  
    	$response = $this->withSession(['user' => $user])
    					 ->withHeaders([
				            'question_id','answer'
				        ])
    					 ->ajaxPost('answer')
    					 ->assertStatus(403)
    					 ->assertJson(
    					 	['correctAnswer' => false, 'message' => 'Question inaccessible.']
    					 );
    }
}
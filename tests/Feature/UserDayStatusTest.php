<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Carbon\Carbon;
use App\DayDetail;
use App\User;

class UserDayStatusTest extends TestCase
{
	/**
     * Make ajax POST request
     */
    protected function ajaxPut ($uri, array $data = []) {
        return $this->put($uri, $data, array('HTTP_X-Requested-With' => 'XMLHttpRequest'));
    }

    /**
     * Make ajax GET request
     */
    protected function ajaxGet ($uri, array $data = []) {
        return $this->get($uri, array('HTTP_X-Requested-With' => 'XMLHttpRequest'));
    }
	public function testUpdateLevelWithoutLogIn () {
        $response = $this->ajaxPut('/level')
                         ->assertStatus(401)
                         ->assertJson([
                            'Authorized'    => false
                         ]);
    }
    public function testUpdateLevelWithUserLoggedInOnDay1 () {
    	$date = Carbon::parse(DayDetail::find(1)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $response = $this->ajaxPut('/level')
                         ->assertStatus(200)
                         ->assertJson([
                         	'updated' => true, 'message' => 'Level updated.'
                         ]);
    }
    public function testUpdatePreviousDayLevelWithUserLoggedInOnDay1() {
    	$date = Carbon::parse(DayDetail::find(1)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $response = $this->ajaxPut('/level?prev_day_questions_flag=1')
                         ->assertStatus(404);
    }
    public function testUpdatePreviousLevelWithUserPlayedDay1LoggedInOnDay2() {
    	$date = Carbon::parse(DayDetail::find(1)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addDay();
        Carbon::setTestNow($date); 
        $response = $this->withSession(['user' => $user])
                         ->ajaxPut('/level?prev_day_questions_flag=1')
                         ->assertStatus(200)
                         ->assertJson([
                         	'updated' => true, 'message' => 'Level updated.'
                         ]);
    }

    public function testUpdateMoreThanNoOfLevels(){
    	$date = Carbon::parse(DayDetail::find(1)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $response = $this->ajaxPut('/level');
        $response = $this->ajaxPut('/level');
        $response = $this->ajaxPut('/level')
                         ->assertStatus(406)
                         ->assertJson([
                         	'updated' => false, 
                         	'message' => 'No more levels.'
                         ]);
    }
    public function testUpdateLevelWhenContestNotLive(){
    	$date = Carbon::parse(DayDetail::find(1)->start_time)->addHour(-1);
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $response = $this->ajaxPut('/level')
                         ->assertStatus(400)
                         ->assertJson([
                         	'updated' => false, 
                         	'message' => 'Invalid day.'
                         ]);
    }
    public function testUpdateLevelWhenContestNotLiveAfterDay3(){
    	$date = Carbon::parse(DayDetail::find(3)->start_time)->addHours(1);
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addDay(1);
        $response = $this->ajaxPut('/level')
                         ->assertStatus(400)
                         ->assertJson([
                         	'updated' => false, 
                         	'message' => 'Time up. Level cannot be updated.'
                         ]);
    }
    public function testUpdateLevelAfterUserContesTimeIsOver()
    {
        $date = Carbon::parse(DayDetail::find(2)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addMinutes(121);
        Carbon::setTestNow($date);       
        $response = $this->withSession(['user' => $user])
                         ->ajaxPut('/level')
                         ->assertStatus(400)
                         ->assertJson([
                         	'updated' => false, 
                         	'message' => 'Time up. Level cannot be updated.'
                         ]);
    }
}

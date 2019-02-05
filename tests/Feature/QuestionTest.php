<?php

namespace Tests\Feature;
use App\DayDetail;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Carbon\Carbon;
use App\User;

class QuestionTest extends TestCase
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

    public function testGetQuestionsWithoutLogIn () {
        $response = $this->ajaxGet('/questions')
                         ->assertStatus(401)
                         ->assertJson([
                            'Authorized'    => false
                         ]);
    }
    public function testGetQuestionsWhenContestNotLiveBeforeDay1() {
        $date = Carbon::parse(DayDetail::find(1)->start_time)->addHours(-1);
        Carbon::setTestNow($date);  
        $user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(404);
    }

    public function testGetQuestionsWhenContestNotLiveAfterDay3() {
        $date = Carbon::parse(DayDetail::find(3)->end_time)->addHours(2);
        Carbon::setTestNow($date);  
        $user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(400);
    }

    public function testGetQuestionsWithUserLoggedInOnDay1 () {
        $date = Carbon::parse(DayDetail::find(1)->start_time)->addHour();
        Carbon::setTestNow($date);  
        $user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetPreviousDayQuestionsWithUserLoggedInOnDay1 () {
        $date = Carbon::parse(DayDetail::find(1)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions?prev_day_questions_flag=1')
                         ->assertStatus(404)
                         ->assertJson([
                            'gotQuestions' => false
                         ]);
    }
    public function testGetQuestionsWithUserNotPlayedDay1LoggedInOnDay2() {
        $date = Carbon::parse(DayDetail::find(2)->start_time)->addHour();
        Carbon::setTestNow($date);  
        $user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetPreviousDayQuestionsWithUserNotPlayedDay1LoggedInOnDay2() {
        $date = Carbon::parse(DayDetail::find(2)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions?prev_day_questions_flag=1')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
        public function testGetQuestionsWithUserPlayedDay1LoggedOnDay2 () {
        $date = Carbon::parse(DayDetail::find(1)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addDay();
        Carbon::setTestNow($date);  
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetPreviousDayQuestionsPlayedDay1WithUserOnDay2() {
        $date = Carbon::parse(DayDetail::find(2)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addDay();
        Carbon::setTestNow($date); 
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions?prev_day_questions_flag=1')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetQuestionsWithUserLoggedInOnDay3 () {
        $date = Carbon::parse(DayDetail::find(3)->start_time)->addHour();
        Carbon::setTestNow($date);  
        $user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetPreviousDayQuestionsWithUserLoggedInOnDay3(){
        $date = Carbon::parse(DayDetail::find(3)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions?prev_day_questions_flag=1')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetQuestionsWhenUserLogsInNearContestEndTimeOnDay1()
    {
        $date = Carbon::parse(DayDetail::find(1)->end_time)->addMinutes(-1);
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addMinutes(120);
        Carbon::setTestNow($date);       
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetQuestionsWhenUserLogsInNearContestEndTimeOnDay2()
    {
        $date = Carbon::parse(DayDetail::find(2)->end_time)->addMinutes(-1);
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addMinutes(120);
        Carbon::setTestNow($date);       
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetQuestionsWhenUserLogsInNearContestEndTimeOnDay3()
    {
        $date = Carbon::parse(DayDetail::find(3)->end_time)->addMinutes(-1);
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addMinutes(120);
        Carbon::setTestNow($date);       
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(200)
                         ->assertJsonStructure([
                            'gotQuestions', 'data',
                         ]);
    }
    public function testGetQuestionAfterUserContesTimeIsOver()
    {
        $date = Carbon::parse(DayDetail::find(2)->start_time)->addHour();
        Carbon::setTestNow($date); 
        $user = factory(User::class)->create();
        $this->withSession(['user' => $user])
                         ->ajaxGet('/questions');
        $date = $date->addMinutes(121);
        Carbon::setTestNow($date);       
        $response = $this->withSession(['user' => $user])
                         ->ajaxGet('/questions')
                         ->assertStatus(400);
    }
}

<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Base Routes
 */

Route::get('login', 'BaseController@renderUserLogin');

Route::group(['middleware' => 'auth'], function() {
    Route::put('level', 'UserDayStatusesController@updateLevel');
    Route::get('questions', 'QuestionsController@getQuestions');
    Route::get('dashboard', 'BaseController@renderDashboard');
    Route::post('answer', 'ScoreLogsController@checkAnswer');
    Route::get('user/time','UserDayStatusesController@getUserContestRemainingTiming');
    Route::post('logout', 'AuthController@logout');
});

/**
 * Auth Routes
 */
Route::post('auth/login', 'AuthController@authUser');

Route::get('contest/time','DayDetailsController@getContestRemainingTiming');
Route::get('users/score','ScoreLogsController@getUsersScores');
Route::get('/{wildcard}', 'BaseController@renderIndex')->where('wildcard', '.*')->middleware('checkIfLoggedIn');

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function renderUserLogin() {
        return view('base.user_login');
    }

    public function renderDashboard() {
        return view('dashboard');
    }

    public function renderIndex() {
        return view('index');
    }
}

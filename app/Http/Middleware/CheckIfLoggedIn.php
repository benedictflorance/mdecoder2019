<?php

namespace App\Http\Middleware;

use Closure;

class CheckIfLoggedIn
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response = $response->cookie('isDev', (env('APP_ENV') != 'production') ? 1 : 0, 60, null, null, false, false);
        if(!$request->session()->has('user'))
            return $response->cookie('login', 0, 60, null, null, false, false);

        $user = $request->session()->get('user');
        return $response->cookie('login', 1, 60, null, null, false, false)
                        ->cookie('username', $user->name, 60, null, null, false, false);
    }
}

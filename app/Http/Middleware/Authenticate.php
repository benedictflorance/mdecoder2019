<?php

namespace App\Http\Middleware;

use Closure;

use App\User;

class Authenticate
{
    /**
     * Function to check if any user details are updated after the user logged in.
     */
    private function isStale(User $user) {
        $dbUser = User::findOrFail($user->id);
        return ($dbUser->updated_at != $user->updated_at);
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // If session is not set for the user, return 401
        if (!$request->session()->has('user')) {
            return response()->json(['Authorized' => false], 401);
        }

        if ($this->isStale($request->session()->get('user'))) {
            $request->session()->forget('user');
            return response()->json(['Authorized' => false], 401);
        }

        return $next($request);
    }
}

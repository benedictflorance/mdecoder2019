<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exceptions\CustomException;
use Exception;

use App\User;

class AuthController extends Controller
{
    /**
     * Function to authenticate user. This function adds user to the users table if user doesn't already exist.
     * @param  Request $request
     * @return Response
     */
    public function authUser(Request $request) {

        // Condition to check if the request is filled with the required parameters
        if (!$request->filled(['email', 'password'])) {
            return response()->json(['authenticated' => false, 'message' => 'Missing parameters.'], 401);
        }

        $userData = $request->only(['email', 'password']);
        try {
            // Authenticate user credentials from main pragyan server. Exception is thrown if invalid.
            $userDataFromPragyan = User::authUserCredentialsFromPragyan($userData['email'], $userData['password']);

            // Create new user if the user doesn't already exist. This is to evade registeration process.
            $user = User::firstOrCreate(
                ['email'        => $userData['email']],
                [
                    'name'         => $userDataFromPragyan['name'],
                    'pragyan_id'   => $userDataFromPragyan['pragyan_id'],
                ]
            );

            // Store user details in session.
            $request->session()->put('user', $user);
            return response()->json(['authenticated' => true], 200);
        }
        catch (CustomException $e) {
            return response()->json(['authenticated' => false, 'message' => $e->getMessage()], $e->getCode());
        }
        catch (Exception $e) {
            return response()->json(['authenticated' => false, 'message' => (env('APP_ENV', 'local') == 'production') ? "Internal server error." : $e->getMessage()], 500);
        }
    }

    /**
     * Function to unset session of user for logging out.
     * @param  Request $request
     */
    public function logout(Request $request) {

        // If the session has user, forget it.
        if($request->session()->has('user'))
            $request->session()->forget('user');

        return response()->json(['loggedOut' => true, 'message' => 'Logout successful.'], 200);
    }
}

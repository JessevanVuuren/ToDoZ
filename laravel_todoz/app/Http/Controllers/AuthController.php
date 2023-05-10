<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

class AuthController extends Controller
{
    //
    use HttpResponses;
    
    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::attempt($request->only("email", "password"))) {
            return $this->error("", "Credentials does not exist", 401);
        }

        $user = User::where("email", $request->email)->first();

        return $this->success([
            "user" => $user,
            "token" => $user->createToken("Api Token of " . $user->name)->plainTextToken
        ]);
    }

    public function register(StoreUserRequest $request)
    {   
        $request->validated($request->all());

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        return $this->success([
            "user" => $user,
            "token" => $user->createToken("API Token of " . $user->name)->plainTextToken
        ]);
    }
    
    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success([
            "message" => "You have successfully been logged out"
        ]);
    }

    public function validate_token(Request $request)
    {
        $token = $request->bearerToken();
        $model = Sanctum::$personalAccessTokenModel;
        $user = $model::findToken($token);

        if ($user) {
            return $this->success("", "valid token");
        }
        return $this->success("", "invalid token");
    }
}
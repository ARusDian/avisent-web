<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if(Auth::attempt(['name' => $request->name, 'password' => $request->password])){
            $token = auth()->user()->createToken('client-token')->plainTextToken;
            $access = auth()->user()->type;

            return ['token' => $token, 'access' => $access];
        }
        else{
            return response(['message' => 'Wrong Credentials'], 422);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response(['message' => 'berhasil logout'], 422);
    }
}

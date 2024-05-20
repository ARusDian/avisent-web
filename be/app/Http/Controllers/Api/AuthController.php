<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'password'  => 'required'
          ]);

        if ($validator->fails()) {
        return response()->json($validator->errors());
        }

        $credentials = $request->only('name', 'password');

        if (! Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Wrong credentials'
            ], 401);
        } else {
            $user   = User::where('name', $request->name)->firstOrFail();
            $token  = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login success',
                'token' => $token,
            ]);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response(['message' => 'Logout success'], 200);
    }
}
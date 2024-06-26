<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('id_user')->get();

        return new UserResource(true, 'Users list', $users);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:users',
            'password' => 'required|min:8',
            'type' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => True,
                'message' => $validator->errors()
            ],403);
        }

        $user = User::create([
            'name'     => $request->name,
            'password'     => Hash::make($request->password),
            'type'   => $request->type,
        ]);

        return new UserResource(true, 'User data added successfully', $user);
    }

    public function show($id)
    {
        $user = User::find($id);

        if ($user == null){
            return response()->json([
                'error' => True,
                'message' => 'That user does not exist',
            ],404);
        }

        return new UserResource(true, 'User info', $user);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if ($user == null){
            return response()->json([
                'error' => True,
                'message' => 'That user does not exist',
            ],404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:users,name,' . $user->id_user . ',id_user',
            'type' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => True,
                'message' => $validator->errors()
            ],403);
        }

        $user->update([
            'name'     => $request->name,
            'type'   => $request->type,
        ]);

        return new UserResource(true, 'User data updated successfully', $user);
    }

    public function pass_edit(Request $request, $id)
    {
        $user = User::find($id);

        if ($user == null){
            return response()->json([
                'error' => True,
                'message' => 'That user does not exist',
            ],404);
        }

        $validator = Validator::make($request->all(), [
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => True,
                'message' => $validator->errors()
            ],403);
        }

        $user->update([
            'password'     => Hash::make($request->password),
        ]);

        return new UserResource(true, 'User password updated successfully', $user);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if ($user == null){
            return response()->json([
                'error' => True,
                'message' => 'That user does not exist',
            ],404);
        }

        $user->delete();

        return new UserResource(true, 'User data deleted successfully', $user);
    }
}

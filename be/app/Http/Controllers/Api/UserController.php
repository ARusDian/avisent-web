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
            return response()->json($validator->errors(), 422);
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
        $user = User::findOrFail($id);
        
        return new UserResource(true, 'User data deleted successfully', $user);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:users',
            'password' => 'required|min:8',
            'type' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::findOrFail($id);
        $user->update([
            'name'     => $request->name,
            'password'     => Hash::make($request->password),
            'type'   => $request->type,
        ]);

        return new UserResource(true, 'User data updated successfully', $user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return new UserResource(true, 'User data deleted successfully', $user);
    }
}

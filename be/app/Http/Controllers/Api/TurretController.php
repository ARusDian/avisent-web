<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Turret;
use App\Models\File;
use Illuminate\Http\Request;
use App\Http\Resources\TurretResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class TurretController extends Controller
{
    public function index()
    {
        $turrets = Turret::with('file')->orderBy('id_turret')->get();

        $formattedturrets = $turrets->map(function($turret) {
            return [
                'id_turret' => $turret->id_turret,
                'turret_image' => asset('storage/turrets/' . $turret->file->path),
                'description' => $turret->description,
                'server_url' => $turret->server_url,
                'turret_url' => $turret->turret_url,
                'location' => $turret->location,
            ];
        });

        return new TurretResource(true, 'Turret list', $formattedturrets);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'path' => 'required|image',
            'description' => 'required',
            'server_url' => 'required',
            'turret_url' => 'required',
            'location' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => True,
                'message' => $validator->errors()
            ],403);
        }

        $image = $request->file('path');
        $img_extension = $request->file('path')->getClientOriginalExtension();
        $image->storeAs('public/turrets/', $image->hashName());

        $file = File::create([
            'path' => $image->hashName(),
            'type' => $img_extension,
        ]);

        $turret = Turret::create([
            'image_id'     => $file->id_file,
            'description'     => $request->description,
            'server_url'   => $request->server_url,
            'turret_url'   => $request->turret_url,
            'location'   => $request->location,
        ]);

        return new TurretResource(true, 'Turret data added successfully', $turret);
    }

    public function show($id)
    {
        $turret = Turret::with('file')->find($id);

        if ($turret == null){
            return response()->json([
                'error' => True,
                'message' => 'That turret does not exist',
            ],404);
        }

        $formattedturret =  [
                'id_turret' => $turret->id_turret,
                'turret_image' => asset('storage/turrets/' . $turret->file->path),
                'description' => $turret->description,
                'server_url' => $turret->server_url,
                'turret_url' => $turret->turret_url,
                'location' => $turret->location,
            ];

        return new TurretResource(true, 'Turret info', $formattedturret);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'path' => 'image',
            'description' => 'required',
            'server_url' => 'required',
            'turret_url' => 'required',
            'location' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => True,
                'message' => $validator->errors()
            ],403);
        }

        $turret = Turret::find($id);

        if ($turret == null){
            return response()->json([
                'error' => True,
                'message' => 'That turret does not exist',
            ],404);
        }

        $file = File::find($turret->file->id_file);

        if ($request->hasFile('path')) {
            $image = $request->file('path');
            $img_extension = $request->file('path')->getClientOriginalExtension();
            $image->storeAs('public/turrets/', $image->hashName());

            Storage::delete('public/turrets/' . basename($turret->file->path));

            $file->update([
                'path' => $image->hashName(),
                'type' => $img_extension,
            ]);

            $turret->update([
                'image_id'     => $file->id_file,
                'description'     => $request->description,
                'server_url'   => $request->server_url,
                'turret_url'   => $request->turret_url,
                'location'   => $request->location,
            ]);
        } else {
            $turret->update([
                'description'     => $request->description,
                'server_url'   => $request->server_url,
                'turret_url'   => $request->turret_url,
                'location'   => $request->location,
            ]);
        }

        return new TurretResource(true, 'Turret data updated successfully', $turret);
    }

    public function destroy($id)
    {
        $turret = Turret::find($id);

        if ($turret == null){
            return response()->json([
                'error' => True,
                'message' => 'That turret does not exist',
            ],404);
        }

        $file = File::findOrFail($turret->file->id_file);

        Storage::delete('public/turrets/' . basename($turret->file->path));

        $turret->delete();
        $file->delete();

        return new TurretResource(true, 'Turret data deleted successfully', $turret);
    }
}

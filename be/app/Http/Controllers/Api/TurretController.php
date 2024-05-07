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
        $turrets = Turret::latest()->paginate(5);

        return new TurretResource(true, 'List Data Users', $turrets);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'path' => 'required|image',
            'description' => 'required',
            'secret_key' => 'required',
            'location' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
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
            'secret_key'   => $request->secret_key,
            'location'   => $request->location,
        ]);

        return new TurretResource(true, 'Data Berhasil Di tambah', $turret);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'path' => 'image',
            'description' => 'required',
            'secret_key' => 'required',
            'location' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $turret = Turret::findOrFail($id);
        $file = File::findOrFail($turret->file->id_file);

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
                'secret_key'   => $request->secret_key,
                'location'   => $request->location,
            ]);
        } else {
            $turret->update([
                'description'     => $request->description,
                'secret_key'   => $request->secret_key,
                'location'   => $request->location,
            ]);
        }

        return new TurretResource(true, 'Data berhasil di update.', $turret);
    }

    public function destroy($id)
    {
        $turret = Turret::findOrFail($id);
        $file = File::findOrFail($turret->file->id_file);

        Storage::delete('public/turrets/' . basename($turret->file->path));

        $turret->delete();
        $file->delete();

        return new TurretResource(true, 'Data berhasil di hapus.', $turret);
    }
}

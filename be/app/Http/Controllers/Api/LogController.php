<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\File;
use Illuminate\Http\Request;
use App\Http\Resources\LogResource;
use Illuminate\Support\Facades\Validator;

class LogController extends Controller
{
    public function index()
    {
        $log = Log::orderBy('id_log')->get();

        return new LogResource(true, 'Log list', $log);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'path' => 'required|image',
            'turret_id' => 'required|numeric',
            'location' => 'required|string',
            'object_type' => 'required|string',
            'shot_date' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $image = $request->file('path');
        $img_extension = $request->file('path')->getClientOriginalExtension();
        $image->storeAs('public/logs/', $image->hashName());

        $file = File::create([
            'path' => $image->hashName(),
            'type' => $img_extension,
        ]);

        $log = Log::create([
            'turret_id'     => $request->turret_id,
            'image_id'     => $file->id_file,
            'location'   => $request->location,
            'object_type'   => $request->object_type,
            'shot_date'   => $request->shot_date,
        ]);

        return new LogResource(true, 'Log data added successfully', $log);
    }

}
